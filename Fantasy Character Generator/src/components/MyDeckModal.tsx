import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  Sparkles, 
  Heart, 
  Zap, 
  Swords, 
  Eye, 
  Layers,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { FantasyCharacter } from '../types';
import { CLASSES_DATA } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';

interface MyDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: FantasyCharacter[];
  activeCharacterId: string;
  onSelectCharacter: (character: FantasyCharacter) => void;
  onRemoveFromDeck: (characterId: string) => void;
  onClearDeck: () => void;
}

export function MyDeckModal({
  isOpen,
  onClose,
  deck,
  activeCharacterId,
  onSelectCharacter,
  onRemoveFromDeck,
  onClearDeck,
}: MyDeckModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container with Bordered Card Grimoire aesthetic */}
        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#120c08] border-2 border-brass/90 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden text-amber-100 z-10"
        >
          {/* Corner Brass Rivets */}
          <div className="absolute top-2 left-2 z-20 pointer-events-none">
            <div className="brass-rivet" />
          </div>
          <div className="absolute top-2 right-2 z-20 pointer-events-none">
            <div className="brass-rivet" />
          </div>
          <div className="absolute bottom-2 left-2 z-20 pointer-events-none">
            <div className="brass-rivet" />
          </div>
          <div className="absolute bottom-2 right-2 z-20 pointer-events-none">
            <div className="brass-rivet" />
          </div>

          {/* Gold Accent Header Strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#785324] via-[#f59e0b] to-[#785324] opacity-90" />

          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-brass/40 flex items-center justify-between bg-[#18100a]/90">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-inner">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-fantasy-decor text-lg sm:text-xl font-bold tracking-wide text-gold-gilded">
                    My Deck Collection
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono">
                    {deck.length} {deck.length === 1 ? 'Hero' : 'Heroes'}
                  </span>
                </div>
                <p className="text-xs text-amber-200/70 font-serif italic">
                  Saved champions ready for battle, codex transcribing, and inspection
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {deck.length > 0 && (
                <button
                  type="button"
                  onClick={onClearDeck}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 rounded-lg transition-colors cursor-pointer"
                  title="Clear entire deck"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Deck</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-[#22160f] hover:bg-[#302015] border border-brass/60 text-amber-300 hover:text-amber-100 transition-colors cursor-pointer"
                aria-label="Close My Deck"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Deck List Body */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] space-y-3">
            {deck.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/60 mb-3">
                  <Layers className="w-8 h-8" />
                </div>
                <h4 className="font-fantasy text-base font-bold text-amber-200 mb-1">
                  Your Deck is Empty
                </h4>
                <p className="text-xs sm:text-sm text-amber-200/60 max-w-sm mb-4 font-serif italic">
                  Save your favorite generated characters to build a personalized roster of champions.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-fantasy font-bold text-xs hover:from-amber-400 hover:to-yellow-400 transition-all cursor-pointer shadow-md shadow-amber-950/60"
                >
                  Return to Card Generator
                </button>
              </div>
            ) : (
              deck.map((char) => {
                const classData = CLASSES_DATA[char.characterClass];
                const isActive = char.id === activeCharacterId;

                return (
                  <div
                    key={char.id}
                    className={`group relative p-3 sm:p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-[#221811] border-amber-400 shadow-lg shadow-amber-950/60 ring-1 ring-amber-400/40'
                        : 'bg-[#18110b]/90 border-brass/50 hover:border-amber-400/70 hover:bg-[#20160f]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      {/* Left: Portrait/Icon + Identity info */}
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Avatar / Portrait thumbnail */}
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-brass-light bg-[#0b0805] shrink-0">
                          {char.portraitUrl ? (
                            <img
                              src={char.portraitUrl}
                              alt={char.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-amber-400/70">
                              <ClassIcon characterClass={char.characterClass} className="w-6 h-6" />
                            </div>
                          )}
                          <div className="absolute bottom-0 inset-x-0 bg-black/75 text-[9px] text-center font-bold text-amber-300 font-mono py-0.5">
                            LVL {char.level}
                          </div>
                        </div>

                        {/* Character Details */}
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <h4 className="font-fantasy font-bold text-sm sm:text-base text-amber-100 group-hover:text-amber-300 transition-colors truncate">
                              {char.name}
                            </h4>
                            {isActive && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/50 text-[10px] font-bold uppercase tracking-wider">
                                Active Card
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-amber-300/80">
                            <span className="font-medium">{char.characterClass}</span>
                            <span className="text-amber-600 mx-1">•</span>
                            <span className="text-amber-200/60">{char.race}</span>
                            <span className="text-amber-600 mx-1">•</span>
                            <span className="italic text-amber-300/60">{char.alignment}</span>
                          </p>
                          <p className="text-[11px] text-amber-400/60 truncate max-w-xs mt-0.5">
                            ⚔️ {char.weapon}
                          </p>
                        </div>
                      </div>

                      {/* Right: The 3 Core Stats Badges + Action Buttons */}
                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-brass/30">
                        {/* Stats Badges: Health, Mana, Strength */}
                        <div className="flex items-center gap-1.5 text-xs font-mono">
                          {/* Health Stat */}
                          <div 
                            className="flex items-center gap-1 px-2 py-1 rounded-md bg-rose-950/50 border border-rose-600/40 text-rose-200"
                            title="Health Points"
                          >
                            <Heart className="w-3 h-3 text-rose-400 fill-rose-500/40" />
                            <span className="font-bold">{char.health}</span>
                            <span className="text-[9px] text-rose-300/70">HP</span>
                          </div>

                          {/* Mana Stat */}
                          <div 
                            className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-950/50 border border-blue-600/40 text-blue-200"
                            title="Mana Points"
                          >
                            <Zap className="w-3 h-3 text-blue-400 fill-blue-500/40" />
                            <span className="font-bold">{char.mana}</span>
                            <span className="text-[9px] text-blue-300/70">MP</span>
                          </div>

                          {/* Strength Stat */}
                          <div 
                            className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-950/50 border border-amber-600/40 text-amber-200"
                            title="Combat Strength"
                          >
                            <Swords className="w-3 h-3 text-amber-400" />
                            <span className="font-bold">{char.strength}</span>
                            <span className="text-[9px] text-amber-300/70">STR</span>
                          </div>
                        </div>

                        {/* Action buttons: Inspect / Load Card + Remove */}
                        <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectCharacter(char);
                              onClose();
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold flex items-center gap-1 cursor-pointer transition-all ${
                              isActive
                                ? 'bg-[#2a1e14] text-amber-300 border border-brass'
                                : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400 shadow-sm'
                            }`}
                            title="Display this player card on the board"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isActive ? 'Viewing' : 'Inspect'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onRemoveFromDeck(char.id)}
                            className="p-1.5 rounded-lg text-rose-400/80 hover:text-rose-200 bg-rose-950/30 hover:bg-rose-900/60 border border-rose-900/40 hover:border-rose-600 transition-colors cursor-pointer"
                            title="Remove from Deck"
                            aria-label={`Remove ${char.name} from deck`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer bar */}
          <div className="p-4 bg-[#150e09] border-t border-brass/40 flex items-center justify-between text-xs text-amber-300/70 font-serif">
            <span>Collectible Deck Codex</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#22160f] hover:bg-[#2c1d14] border border-brass text-amber-200 text-xs font-fantasy cursor-pointer"
            >
              Close Codex
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
