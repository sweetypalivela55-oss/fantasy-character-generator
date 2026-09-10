import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Swords, 
  Scroll, 
  Copy, 
  Check, 
  Zap,
  Heart,
  Bookmark,
  BookmarkCheck,
  Layers,
  Dices,
  Shield,
  Star
} from 'lucide-react';
import { FantasyCharacter, CharacterClassName } from '../types';
import { CLASSES_DATA } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';
import { CharacterPortrait } from './CharacterPortrait';

interface CharacterCardProps {
  key?: string | number;
  character: FantasyCharacter;
  isGeneratingPortrait?: boolean;
  onGeneratePortrait?: () => void;
  onRegeneratePortrait?: () => void;
  portraitError?: string | null;
  isGeneratingBackstory?: boolean;
  onGenerateBackstory?: () => void;
  // Save to Deck props
  isSavedInDeck?: boolean;
  onToggleSaveToDeck?: () => void;
  deckCount?: number;
  onOpenDeck?: () => void;
  // Roll actions
  onRollNew?: () => void;
  isRolling?: boolean;
  selectedClassFilter?: 'ALL' | CharacterClassName;
  onSelectClassFilter?: (c: 'ALL' | CharacterClassName) => void;
}

const CLASS_FILTER_ITEMS: { label: string; value: 'ALL' | CharacterClassName }[] = [
  { label: 'Random', value: 'ALL' },
  { label: 'Warrior', value: 'Warrior' },
  { label: 'Mage', value: 'Mage' },
  { label: 'Paladin', value: 'Paladin' },
  { label: 'Rogue', value: 'Rogue' },
  { label: 'Cleric', value: 'Cleric' },
  { label: 'Ranger', value: 'Ranger' },
  { label: 'Warlock', value: 'Warlock' },
  { label: 'Druid', value: 'Druid' },
  { label: 'Monk', value: 'Monk' },
  { label: 'Bard', value: 'Bard' },
];

export function CharacterCard({ 
  character,
  isGeneratingPortrait = false,
  onGeneratePortrait,
  onRegeneratePortrait,
  portraitError = null,
  isGeneratingBackstory = false,
  onGenerateBackstory,
  isSavedInDeck = false,
  onToggleSaveToDeck,
  deckCount = 0,
  onOpenDeck,
  onRollNew,
  isRolling = false,
  selectedClassFilter = 'ALL',
  onSelectClassFilter,
}: CharacterCardProps) {
  const [copied, setCopied] = useState(false);
  const classDetails = CLASSES_DATA[character.characterClass];

  const handleCopy = async () => {
    const text = `Fantasy Player Card:
Name: ${character.name}
Class: ${character.characterClass} (${classDetails.role})
Level: ${character.level} | Race: ${character.race} | Alignment: ${character.alignment}
Primary Stats:
  ❤️ Health: ${character.health} HP
  🔷 Mana: ${character.mana} MP
  ⚔️ Strength: ${character.strength} STR
Armament: ${character.weapon}
Signature Arcana: ${character.specialAbility}
Crucible Attributes: STR ${character.stats.strength} | DEX ${character.stats.dexterity} | CON ${character.stats.constitution} | INT ${character.stats.intelligence} | WIS ${character.stats.wisdom} | CHA ${character.stats.charisma}
Origin Story: "${character.backstory || character.lore}"`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const statItems = [
    { label: 'STR', name: 'Strength', val: character.stats.strength },
    { label: 'DEX', name: 'Dexterity', val: character.stats.dexterity },
    { label: 'CON', name: 'Constitution', val: character.stats.constitution },
    { label: 'INT', name: 'Intelligence', val: character.stats.intelligence },
    { label: 'WIS', name: 'Wisdom', val: character.stats.wisdom },
    { label: 'CHA', name: 'Charisma', val: character.stats.charisma },
  ];

  // Stat percentages for progress bars
  const healthPercent = Math.min(100, Math.round((character.health / 250) * 100));
  const manaPercent = Math.min(100, Math.round((character.mana / 350) * 100));
  const strengthPercent = Math.min(100, Math.round((character.strength / 100) * 100));

  return (
    <motion.div
      key={character.id}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      id="fantasy-player-card"
      className="relative w-full max-w-3xl bg-[#120d09] player-card-frame rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 overflow-hidden text-amber-100/90"
    >
      {/* Outer Card Metallic Bevel & Inset Borders */}
      <div className="relative w-full h-full rounded-[14px] sm:rounded-[20px] bg-grimoire-slab border border-[#8f642e]/90 overflow-hidden">
        
        {/* Ornate Brass Rivets on the 4 Outer Card Corners */}
        <div className="absolute top-2.5 left-2.5 z-30 pointer-events-none">
          <div className="brass-rivet" />
        </div>
        <div className="absolute top-2.5 right-2.5 z-30 pointer-events-none">
          <div className="brass-rivet" />
        </div>
        <div className="absolute bottom-2.5 left-2.5 z-30 pointer-events-none">
          <div className="brass-rivet" />
        </div>
        <div className="absolute bottom-2.5 right-2.5 z-30 pointer-events-none">
          <div className="brass-rivet" />
        </div>

        {/* Faint Card Watermark Seal */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 opacity-[0.05] pointer-events-none text-amber-300">
          <svg viewBox="0 0 200 200" className="w-full h-full stroke-current" fill="none" strokeWidth="1.2">
            <circle cx="100" cy="100" r="92" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="76" />
            <polygon points="100,12 180,148 20,148" />
            <polygon points="100,188 180,52 20,52" />
            <circle cx="100" cy="100" r="32" />
          </svg>
        </div>

        {/* Dynamic Class Ambient Background Glow */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${classDetails.bgGlow} pointer-events-none opacity-40`} 
        />

        {/* Top Gold Foil Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#785324] via-[#f59e0b] to-[#785324] opacity-90 shadow-sm" />

        {/* CARD CONTENT BODY */}
        <div className="p-4 sm:p-7 relative z-10">

          {/* CARD HEADER BAR: LEVEL BADGE, SAVE TO DECK, MY DECK, TRANSCRIBE */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-brass/40">
            {/* Left: Card Tier & Level Crest */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-[#2a1a10] to-[#1a1109] border border-amber-500/50 text-amber-300 shadow-md">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
                <span className="text-xs font-fantasy font-bold tracking-wider">
                  LVL {character.level}
                </span>
                <span className="text-amber-500/50">•</span>
                <span className="text-xs font-semibold text-amber-200">
                  {character.race}
                </span>
              </div>

              <span className="hidden sm:inline-block text-xs text-amber-300/60 font-serif italic">
                {character.alignment}
              </span>
            </div>

            {/* Right: "Save to Deck" & "My Deck" Action Controls */}
            <div className="flex items-center gap-2">
              {/* SAVE TO DECK BUTTON */}
              {onToggleSaveToDeck && (
                <button
                  type="button"
                  id="save-to-deck-button"
                  onClick={onToggleSaveToDeck}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-fantasy font-bold transition-all cursor-pointer shadow-md ${
                    isSavedInDeck
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-400/80 shadow-emerald-950/60'
                      : 'bg-[#22170e] hover:bg-[#2e1f13] text-amber-200 border border-amber-500/60 hover:border-amber-400'
                  }`}
                  title={isSavedInDeck ? 'Remove from My Deck' : 'Save character to My Deck'}
                >
                  {isSavedInDeck ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-emerald-200" />
                      <span>In Deck ★</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                      <span>Save to Deck</span>
                    </>
                  )}
                </button>
              )}

              {/* MY DECK LAUNCHER BUTTON */}
              {onOpenDeck && (
                <button
                  type="button"
                  id="open-deck-button"
                  onClick={onOpenDeck}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[#241910] hover:bg-[#322316] border border-brass-light hover:border-amber-400 text-amber-200 font-fantasy transition-all cursor-pointer shadow-md"
                  title="View your saved champion deck"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>My Deck</span>
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                    {deckCount}
                  </span>
                </button>
              )}

              {/* TRANSCRIBE / COPY BUTTON */}
              <button
                type="button"
                onClick={handleCopy}
                id="copy-character-button"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-[#1e140d] hover:bg-[#281c12] border border-brass/60 text-amber-300/80 hover:text-amber-100 transition-colors cursor-pointer"
                title="Transcribe Card to Codex"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CARD TITLE: NAME & CLASS BADGE */}
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-500/70 text-sm select-none">✦</span>
              <h2 
                id="player-card-character-name"
                className="font-alchemist text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-gold-gilded select-all"
              >
                {character.name}
              </h2>
              <span className="text-amber-500/70 text-sm select-none">✦</span>
            </div>

            <div 
              id="character-class-badge"
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border ${classDetails.badgeColor} shadow-inner self-start sm:self-auto`}
            >
              <ClassIcon characterClass={character.characterClass} className="w-3.5 h-3.5" />
              <span>{character.characterClass}</span>
              <span className="text-amber-500/60">•</span>
              <span className="font-medium opacity-90">{classDetails.role}</span>
            </div>
          </div>

          {/* HERO SECTION: FRAMED PORTRAIT + PRIMARY VITAL STATS (HEALTH, MANA, STRENGTH) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start mb-6">
            {/* PORTRAIT ART FRAME (5 COLS ON DESKTOP) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <CharacterPortrait
                character={character}
                isGenerating={isGeneratingPortrait}
                onGenerate={onGeneratePortrait || (() => {})}
                onRegenerate={onRegeneratePortrait || (() => {})}
                error={portraitError}
              />
            </div>

            {/* STATS & COMBAT PANELS (7 COLS ON DESKTOP) */}
            <div className="md:col-span-7 flex flex-col gap-3.5 w-full">
              
              {/* PRIMARY PLAYER CARD VITAL STATS: HEALTH, MANA, AND STRENGTH */}
              <div 
                id="player-card-vital-stats"
                className="p-3.5 rounded-xl bg-[#170f0a]/95 border-2 border-brass/70 shadow-inner"
              >
                <div className="flex items-center justify-between mb-2.5 pb-1 border-b border-brass/30">
                  <span className="text-[11px] font-fantasy font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Vital Combat Statistics</span>
                  </span>
                  <span className="text-[10px] text-amber-400/60 font-mono">
                    CARD SPECIFICATION
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* HEALTH STAT MODULE */}
                  <div 
                    id="player-stat-health"
                    className="p-2.5 rounded-lg bg-gradient-to-b from-rose-950/70 via-[#1f0d0b] to-[#150908] border border-rose-600/60 shadow-md flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-rose-300 mb-1">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/50" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Health</span>
                      </div>
                    </div>

                    <div className="my-0.5">
                      <span className="text-xl sm:text-2xl font-extrabold text-rose-100 font-mono tracking-tight block">
                        {character.health}
                      </span>
                      <span className="text-[10px] text-rose-300/70 font-mono block -mt-1">
                        HP POOL
                      </span>
                    </div>

                    {/* Animated Health Meter Bar */}
                    <div className="w-full bg-[#351212] h-1.5 rounded-full mt-1 overflow-hidden border border-rose-900/60">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-rose-600 to-red-400 shadow-[0_0_8px_#f43f5e]" 
                        style={{ width: `${healthPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* MANA STAT MODULE */}
                  <div 
                    id="player-stat-mana"
                    className="p-2.5 rounded-lg bg-gradient-to-b from-blue-950/70 via-[#0d1624] to-[#090f19] border border-blue-500/60 shadow-md flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-blue-300 mb-1">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-500/50" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Mana</span>
                      </div>
                    </div>

                    <div className="my-0.5">
                      <span className="text-xl sm:text-2xl font-extrabold text-blue-100 font-mono tracking-tight block">
                        {character.mana}
                      </span>
                      <span className="text-[10px] text-blue-300/70 font-mono block -mt-1">
                        MP POOL
                      </span>
                    </div>

                    {/* Animated Mana Meter Bar */}
                    <div className="w-full bg-[#0d1d36] h-1.5 rounded-full mt-1 overflow-hidden border border-blue-900/60">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_8px_#38bdf8]" 
                        style={{ width: `${manaPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* STRENGTH STAT MODULE */}
                  <div 
                    id="player-stat-strength"
                    className="p-2.5 rounded-lg bg-gradient-to-b from-amber-950/70 via-[#201509] to-[#140d06] border border-amber-500/60 shadow-md flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-amber-300 mb-1">
                      <div className="flex items-center gap-1">
                        <Swords className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Strength</span>
                      </div>
                    </div>

                    <div className="my-0.5">
                      <span className="text-xl sm:text-2xl font-extrabold text-amber-100 font-mono tracking-tight block">
                        {character.strength}
                      </span>
                      <span className="text-[10px] text-amber-300/70 font-mono block -mt-1">
                        STR POWER
                      </span>
                    </div>

                    {/* Animated Strength Meter Bar */}
                    <div className="w-full bg-[#2d1c0b] h-1.5 rounded-full mt-1 overflow-hidden border border-amber-900/60">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_8px_#fbbf24]" 
                        style={{ width: `${strengthPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ARMAMENT & SIGNATURE ARCANA DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-[#140e0a]/90 border border-brass/50 shadow-inner">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400/80 uppercase tracking-wider mb-1">
                    <Swords className="w-3 h-3 text-amber-400" />
                    <span>Armament</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-amber-100 truncate">
                    {character.weapon}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#140e0a]/90 border border-brass/50 shadow-inner">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400/80 uppercase tracking-wider mb-1">
                    <Zap className="w-3 h-3 text-amber-300" />
                    <span>Signature Arcana</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-amber-100 truncate">
                    {character.specialAbility}
                  </p>
                </div>
              </div>

              {/* CRUCIBLE ATTRIBUTES (ABILITY SCORES) */}
              <div className="p-3 rounded-xl bg-[#150f0a]/90 border border-brass/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Attribute Modifiers</span>
                  </span>
                  <span className="text-[10px] text-amber-300/60 font-mono">
                    Primary: <span className="text-amber-200 font-bold">{classDetails.primaryStat}</span>
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-1.5">
                  {statItems.map((st) => {
                    const isPrimary = st.name === classDetails.primaryStat;
                    const mod = Math.floor((st.val - 10) / 2);
                    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;

                    return (
                      <div
                        key={st.label}
                        className={`p-1.5 rounded-lg text-center border ${
                          isPrimary
                            ? 'bg-amber-950/60 border-amber-500/80 text-amber-100 shadow-sm'
                            : 'bg-[#100b07] border-brass/30 text-amber-200/80'
                        }`}
                      >
                        <span className={`text-[9px] font-bold block ${isPrimary ? 'text-amber-300' : 'text-amber-400/60'}`}>
                          {st.label}
                        </span>
                        <span className="text-sm font-bold block leading-tight font-mono">
                          {st.val}
                        </span>
                        <span className="text-[9px] text-amber-400/70 font-mono block">
                          {modStr}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* CARD FLAVOR TEXT: ORIGIN STORY & LORE */}
          <div 
            id="player-card-backstory"
            className="p-4 rounded-xl bg-[#150e09]/95 border border-brass/60 shadow-inner mb-5"
          >
            <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-brass/30">
              <div className="flex items-center gap-2">
                <Scroll className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-fantasy font-bold uppercase tracking-wider text-amber-300">
                  Origin Story & Inscribed Lore
                </span>
                {character.backstory && (
                  <span className="px-2 py-0.2 text-[9px] rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase tracking-wider">
                    Custom Lore
                  </span>
                )}
              </div>

              {onGenerateBackstory && (
                <button
                  type="button"
                  id="card-generate-backstory-btn"
                  onClick={onGenerateBackstory}
                  disabled={isGeneratingBackstory}
                  className="text-xs px-3 py-1 rounded-lg bg-[#241911] hover:bg-[#322316] border border-brass hover:border-amber-400 text-amber-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-60 font-fantasy"
                  title="Generate a unique origin story for this champion"
                >
                  <Scroll className={`w-3.5 h-3.5 text-amber-400 ${isGeneratingBackstory ? 'animate-pulse' : ''}`} />
                  <span>{isGeneratingBackstory ? 'Inscribing Lore...' : 'Inscribe Backstory'}</span>
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed italic font-serif pl-2.5 border-l-2 border-amber-500/50">
              "{character.backstory || character.lore}"
            </p>
          </div>

          {/* CARD FOOTER CONTROL DECK: ROLL NEW CARD, CLASS FILTER & SAVE */}
          <div className="pt-3 border-t-2 border-brass/50 flex flex-col gap-3">
            {/* Quick Roll & Class Selection */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* PRIMARY ROLL / TRANSMUTE BUTTON */}
              {onRollNew && (
                <motion.button
                  id="card-roll-new-hero-btn"
                  type="button"
                  onClick={onRollNew}
                  disabled={isRolling}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-fantasy text-sm font-bold tracking-wider text-[#120a04] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 shadow-xl shadow-amber-950/80 border border-amber-300 cursor-pointer transition-all flex items-center justify-center gap-2.5 disabled:opacity-70"
                >
                  <motion.div
                    animate={isRolling ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.35, ease: "linear" }}
                  >
                    <Dices className="w-5 h-5 text-[#120a04] stroke-[2.2]" />
                  </motion.div>
                  <span>{isRolling ? 'Forging Champion...' : 'Draw New Card'}</span>
                  <Sparkles className="w-4 h-4 text-amber-950" />
                </motion.button>
              )}

              {/* SAVE TO DECK SECONDARY BUTTON IN FOOTER */}
              {onToggleSaveToDeck && (
                <button
                  type="button"
                  onClick={onToggleSaveToDeck}
                  className={`w-full sm:w-auto px-5 py-3 rounded-xl font-fantasy text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    isSavedInDeck
                      ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-500 hover:bg-emerald-900/80'
                      : 'bg-[#22170f] hover:bg-[#2c1d13] text-amber-200 border border-brass-light hover:border-amber-400'
                  }`}
                >
                  {isSavedInDeck ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                      <span>Saved to My Deck ★</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-amber-400" />
                      <span>Save to Deck</span>
                    </>
                  )}
                </button>
              )}

              {/* OPEN MY DECK BUTTON */}
              {onOpenDeck && (
                <button
                  type="button"
                  onClick={onOpenDeck}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl font-fantasy text-xs font-bold tracking-wider bg-[#1c130d] hover:bg-[#271b12] border border-brass hover:border-amber-400 text-amber-200 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>View My Deck ({deckCount})</span>
                </button>
              )}
            </div>

            {/* CLASS ESSENCE FILTER CHIPS */}
            {onSelectClassFilter && (
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs no-scrollbar">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/70 whitespace-nowrap mr-1 font-serif">
                  Class:
                </span>
                {CLASS_FILTER_ITEMS.map((item) => {
                  const isActive = selectedClassFilter === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => onSelectClassFilter(item.value)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold shadow-sm'
                          : 'bg-[#1c130d] hover:bg-[#281b12] text-amber-200/70 hover:text-amber-100 border border-brass/40'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* CARD SERIAL / BOTTOM EDITION STAMP */}
          <div className="mt-4 pt-2 border-t border-brass/30 flex items-center justify-between text-[10px] font-mono text-amber-400/50">
            <span>ID: {character.id}</span>
            <span>CARD NO. 001 • ARCANUM COLLECTOR</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
