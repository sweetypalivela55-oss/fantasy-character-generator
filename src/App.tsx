/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dices, 
  Sparkles, 
  Layers, 
  BookmarkCheck,
  CheckCircle,
  FlaskConical,
  RotateCw,
  ChevronRight,
  Shield,
  Eye
} from 'lucide-react';
import { CharacterClassName, FantasyCharacter } from './types';
import { generateRandomCharacter, generateProceduralBackstory, CLASSES_DATA } from './data/fantasyData';
import { CharacterCard } from './components/CharacterCard';
import { MyDeckModal } from './components/MyDeckModal';
import { AlchemistWorkbenchDecor } from './components/AlchemistWorkbenchDecor';

export default function App() {
  const [selectedClassFilter, setSelectedClassFilter] = useState<'ALL' | CharacterClassName>('ALL');
  
  // Active Character Displayed on the Player Card
  const [currentCharacter, setCurrentCharacter] = useState<FantasyCharacter>(() => generateRandomCharacter());
  const [history, setHistory] = useState<FantasyCharacter[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [rollCount, setRollCount] = useState(1);

  // My Deck Collection State (persisted to localStorage)
  const [deck, setDeck] = useState<FantasyCharacter[]>(() => {
    try {
      const stored = localStorage.getItem('fantasy_card_deck');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to load deck from localStorage:", e);
    }
    return [];
  });

  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Portrait generation state
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [portraitError, setPortraitError] = useState<string | null>(null);
  const [variations, setVariations] = useState<Record<string, number>>({});

  // Backstory generation state
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [backstoryError, setBackstoryError] = useState<string | null>(null);

  // Helper to trigger toast notification
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  }, []);

  // Check if active character is currently saved in deck
  const isCurrentCardSaved = deck.some((c) => c.id === currentCharacter.id);

  // Toggle Save to Deck
  const handleToggleSaveToDeck = useCallback(() => {
    setDeck((prevDeck) => {
      const exists = prevDeck.some((c) => c.id === currentCharacter.id);
      let updated: FantasyCharacter[];
      if (exists) {
        updated = prevDeck.filter((c) => c.id !== currentCharacter.id);
        showToast(`Removed "${currentCharacter.name}" from My Deck`);
      } else {
        updated = [currentCharacter, ...prevDeck];
        showToast(`Saved "${currentCharacter.name}" to My Deck! ★`);
      }
      try {
        localStorage.setItem('fantasy_card_deck', JSON.stringify(updated));
      } catch (e) {
        console.warn("Storage warning:", e);
      }
      return updated;
    });
  }, [currentCharacter, showToast]);

  // Remove specific character from deck
  const handleRemoveFromDeck = useCallback((id: string) => {
    setDeck((prevDeck) => {
      const updated = prevDeck.filter((c) => c.id !== id);
      try {
        localStorage.setItem('fantasy_card_deck', JSON.stringify(updated));
      } catch (e) {
        console.warn("Storage warning:", e);
      }
      return updated;
    });
    showToast("Removed champion from My Deck");
  }, [showToast]);

  // Clear all cards in deck
  const handleClearDeck = useCallback(() => {
    setDeck([]);
    try {
      localStorage.removeItem('fantasy_card_deck');
    } catch (e) {}
    showToast("My Deck has been cleared");
  }, [showToast]);

  // Select a character from deck to load onto the player card
  const handleSelectFromDeck = useCallback((char: FantasyCharacter) => {
    setCurrentCharacter(char);
    setPortraitError(null);
    setBackstoryError(null);
    showToast(`Loaded "${char.name}" to Player Card`);
  }, [showToast]);

  // Roll new character card
  const handleGenerate = useCallback(() => {
    setIsRolling(true);
    setPortraitError(null);
    setBackstoryError(null);
    
    // Brief tactile animation delay
    setTimeout(() => {
      const chosenClass = selectedClassFilter === 'ALL' ? undefined : selectedClassFilter;
      const newCharacter = generateRandomCharacter(chosenClass);

      setHistory((prev) => [currentCharacter, ...prev.filter(c => c.id !== currentCharacter.id)].slice(0, 6));
      setCurrentCharacter(newCharacter);
      setRollCount((prev) => prev + 1);
      setIsRolling(false);
    }, 180);
  }, [selectedClassFilter, currentCharacter]);

  // Select a past character from history
  const selectPastCharacter = (char: FantasyCharacter) => {
    if (char.id === currentCharacter.id) return;
    setPortraitError(null);
    setBackstoryError(null);
    setHistory((prev) => [currentCharacter, ...prev.filter(c => c.id !== char.id)].slice(0, 6));
    setCurrentCharacter(char);
  };

  // Portrait API call
  const fetchPortrait = async (char: FantasyCharacter, isRegen = false) => {
    setIsGeneratingPortrait(true);
    setPortraitError(null);

    const nextVariation = (variations[char.id] || 0) + (isRegen ? 1 : 0);
    setVariations((prev) => ({ ...prev, [char.id]: nextVariation }));

    try {
      const res = await fetch("/api/generate-portrait", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character: char,
          variationSeed: nextVariation,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to generate portrait: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.imageUrl) {
        const updatedChar: FantasyCharacter = {
          ...char,
          portraitUrl: data.imageUrl,
          portraitSource: data.source,
        };

        setCurrentCharacter((prev) => (prev.id === char.id ? updatedChar : prev));
        setHistory((prev) =>
          prev.map((item) => (item.id === char.id ? updatedChar : item))
        );
        // Also update in deck if saved
        setDeck((prevDeck) => {
          const updated = prevDeck.map((c) => (c.id === char.id ? updatedChar : c));
          try {
            localStorage.setItem('fantasy_card_deck', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
      } else {
        throw new Error("No image data returned by server");
      }
    } catch (err: any) {
      console.error("Portrait generation error:", err);
      setPortraitError(err?.message || "Could not conjure portrait. Please try again.");
    } finally {
      setIsGeneratingPortrait(false);
    }
  };

  const handleGeneratePortrait = () => {
    fetchPortrait(currentCharacter, false);
  };

  const handleRegeneratePortrait = () => {
    fetchPortrait(currentCharacter, true);
  };

  // Backstory API call
  const handleGenerateBackstory = useCallback(async () => {
    setIsGeneratingBackstory(true);
    setBackstoryError(null);

    try {
      const res = await fetch("/api/generate-backstory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character: currentCharacter }),
      });

      let newBackstory = "";
      if (res.ok) {
        const data = await res.json();
        newBackstory = data.backstory;
      }

      if (!newBackstory) {
        newBackstory = generateProceduralBackstory(currentCharacter);
      }

      const updatedChar: FantasyCharacter = {
        ...currentCharacter,
        backstory: newBackstory,
        lore: newBackstory,
      };

      setCurrentCharacter(updatedChar);
      setHistory((prev) =>
        prev.map((item) => (item.id === currentCharacter.id ? updatedChar : item))
      );
      // Also update in deck if saved
      setDeck((prevDeck) => {
        const updated = prevDeck.map((c) => (c.id === currentCharacter.id ? updatedChar : c));
        try {
          localStorage.setItem('fantasy_card_deck', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    } catch (err: any) {
      console.warn("Backstory generation network/server error, using procedural fallback:", err);
      const fallbackStory = generateProceduralBackstory(currentCharacter);
      const updatedChar: FantasyCharacter = {
        ...currentCharacter,
        backstory: fallbackStory,
        lore: fallbackStory,
      };
      setCurrentCharacter(updatedChar);
      setHistory((prev) =>
        prev.map((item) => (item.id === currentCharacter.id ? updatedChar : item))
      );
      setDeck((prevDeck) => {
        const updated = prevDeck.map((c) => (c.id === currentCharacter.id ? updatedChar : c));
        try {
          localStorage.setItem('fantasy_card_deck', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    } finally {
      setIsGeneratingBackstory(false);
    }
  }, [currentCharacter]);

  return (
    <div className="min-h-screen bg-workbench text-amber-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200 relative overflow-x-hidden">
      {/* Alchemist Workbench Atmosphere & Transmutation Circle */}
      <AlchemistWorkbenchDecor />

      {/* Main Player Card Canvas */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10 flex flex-col items-center">
        
        {/* Compact App Header & Quick Navigation Bar */}
        <header className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1a110a] border border-brass text-amber-400 shadow-md">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
                  PLAYER CARD EDITION
                </span>
                <span className="text-amber-600/60">•</span>
                <span className="text-[10px] text-amber-300/70 font-serif italic">
                  Health • Mana • Strength
                </span>
              </div>
              <h1 
                id="app-title"
                className="font-fantasy-decor text-xl sm:text-2xl font-bold tracking-wide text-gold-gilded drop-shadow-md"
              >
                Fantasy Character Generator
              </h1>
            </div>
          </div>

          {/* Quick Header Action Controls: Draw New Card & Open My Deck */}
          <div className="flex items-center gap-2.5">
            <motion.button
              id="header-draw-button"
              type="button"
              onClick={handleGenerate}
              disabled={isRolling}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-xl text-xs font-fantasy font-bold tracking-wider text-[#120a04] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 border border-amber-300 shadow-md shadow-amber-950/70 flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{isRolling ? 'Drawing...' : 'Draw Card'}</span>
            </motion.button>

            <button
              type="button"
              id="header-open-deck-button"
              onClick={() => setIsDeckOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-fantasy font-bold tracking-wider text-amber-200 bg-[#1c130d] hover:bg-[#281b12] border border-brass-light hover:border-amber-400 shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>My Deck</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono">
                {deck.length}
              </span>
            </button>
          </div>
        </header>

        {/* THE CENTERPIECE: BORDERED PLAYER CARD */}
        <div className="w-full flex justify-center mb-8">
          <AnimatePresence mode="wait">
            <CharacterCard 
              key={currentCharacter.id} 
              character={currentCharacter}
              isGeneratingPortrait={isGeneratingPortrait}
              onGeneratePortrait={handleGeneratePortrait}
              onRegeneratePortrait={handleRegeneratePortrait}
              portraitError={portraitError}
              isGeneratingBackstory={isGeneratingBackstory}
              onGenerateBackstory={handleGenerateBackstory}
              isSavedInDeck={isCurrentCardSaved}
              onToggleSaveToDeck={handleToggleSaveToDeck}
              deckCount={deck.length}
              onOpenDeck={() => setIsDeckOpen(true)}
              onRollNew={handleGenerate}
              isRolling={isRolling}
              selectedClassFilter={selectedClassFilter}
              onSelectClassFilter={setSelectedClassFilter}
            />
          </AnimatePresence>
        </div>

        {/* RECENTLY DRAWN CARDS STRIP */}
        {history.length > 0 && (
          <section id="recent-draws-chronicle" className="w-full max-w-3xl bg-[#140e0a]/90 border border-brass/60 rounded-xl p-3.5 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2.5 text-xs text-amber-300/80">
              <span className="flex items-center gap-1.5 font-fantasy font-bold uppercase tracking-wider text-amber-300">
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Recent Card Rolls ({history.length})</span>
              </span>
              <span className="text-[11px] text-amber-400/60 font-serif italic">
                Session total: {rollCount}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {history.map((char) => {
                const isSaved = deck.some((c) => c.id === char.id);
                return (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => selectPastCharacter(char)}
                    className="relative p-2 rounded-lg bg-[#1a120b] hover:bg-[#251910] border border-brass/40 hover:border-amber-400 transition-all text-left cursor-pointer group shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-amber-400 font-mono">
                        LVL {char.level}
                      </span>
                      {isSaved && (
                        <BookmarkCheck className="w-3 h-3 text-emerald-400" />
                      )}
                    </div>

                    <div className="text-xs font-semibold text-amber-100 group-hover:text-amber-300 transition-colors truncate font-serif">
                      {char.name}
                    </div>

                    <div className="text-[10px] text-amber-400/60 truncate mt-0.5">
                      {char.characterClass}
                    </div>

                    {/* Miniature stats preview */}
                    <div className="mt-1.5 pt-1 border-t border-brass/20 flex items-center justify-between text-[9px] font-mono text-amber-300/70">
                      <span className="text-rose-400">{char.health}H</span>
                      <span className="text-blue-400">{char.mana}M</span>
                      <span className="text-amber-400">{char.strength}S</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#1a110a] border border-amber-500/80 text-amber-200 text-xs font-fantasy font-bold shadow-2xl shadow-black flex items-center gap-2 pointer-events-none"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* My Deck Modal Drawer */}
      <MyDeckModal
        isOpen={isDeckOpen}
        onClose={() => setIsDeckOpen(false)}
        deck={deck}
        activeCharacterId={currentCharacter.id}
        onSelectCharacter={handleSelectFromDeck}
        onRemoveFromDeck={handleRemoveFromDeck}
        onClearDeck={handleClearDeck}
      />

      {/* Footer */}
      <footer className="w-full border-t border-brass/30 py-4 text-center text-xs text-amber-400/60 relative z-10 bg-black/40 backdrop-blur-xs font-serif">
        <p>Fantasy Character Generator • Deluxe Bordered Player Card & Deck Codex</p>
      </footer>
    </div>
  );
}
