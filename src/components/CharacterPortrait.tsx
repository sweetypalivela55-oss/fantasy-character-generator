import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  RotateCw, 
  Maximize2, 
  Download, 
  X, 
  Wand2, 
  Shield, 
  AlertCircle 
} from 'lucide-react';
import { FantasyCharacter } from '../types';
import { CLASSES_DATA } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';

interface CharacterPortraitProps {
  character: FantasyCharacter;
  isGenerating: boolean;
  onGenerate: () => void;
  onRegenerate: () => void;
  error?: string | null;
}

const LOADING_MESSAGES = [
  "Conjuring cartoon portrait...",
  "Drafting video game outlines...",
  "Applying fantasy cel-shading...",
  "Forging weapon & armor details...",
  "Infusing heroic aura..."
];

export function CharacterPortrait({
  character,
  isGenerating,
  onGenerate,
  onRegenerate,
  error
}: CharacterPortraitProps) {
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const classDetails = CLASSES_DATA[character.characterClass];

  // Rotate loading message while generating
  useEffect(() => {
    if (!isGenerating) return;
    const timer = setInterval(() => {
      setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [isGenerating]);

  const handleDownload = () => {
    if (!character.portraitUrl) return;
    const link = document.createElement('a');
    link.href = character.portraitUrl;
    link.download = `${character.name.toLowerCase().replace(/\s+/g, '_')}_portrait.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div 
        id="character-portrait-container"
        className="flex flex-col items-center w-full"
      >
        {/* Ornate Alchemical Portrait Frame / Scrying Lens */}
        <div className="relative group w-44 h-44 sm:w-52 sm:h-52 rounded-2xl p-1.5 bg-gradient-to-b from-[#b48539]/80 via-[#261c14] to-[#785324]/90 border border-brass/80 shadow-2xl shadow-black/90">
          {/* Brass Rivets on Corner Bevels */}
          <div className="absolute top-1 left-1 z-20 pointer-events-none">
            <div className="brass-rivet" />
          </div>
          <div className="absolute top-1 right-1 z-20 pointer-events-none">
            <div className="brass-rivet" />
          </div>
          <div className="absolute bottom-1 left-1 z-20 pointer-events-none">
            <div className="brass-rivet" />
          </div>
          <div className="absolute bottom-1 right-1 z-20 pointer-events-none">
            <div className="brass-rivet" />
          </div>

          {/* Inner Glowing Frame */}
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0d0906] flex items-center justify-center border border-[#52391b]/90 shadow-inner">
            {/* Ambient Class Hue Glow */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${classDetails.bgGlow} opacity-30 pointer-events-none`} 
            />

            {/* Content: Image vs Placeholder vs Loading */}
            <AnimatePresence mode="wait">
              {isGenerating ? (
                /* Arcane Loading State */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center p-4 text-center z-10 w-full h-full bg-[#0e0906]/95 backdrop-blur-sm"
                >
                  <div className="relative w-12 h-12 mb-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-amber-500/20 border-t-amber-400"
                    />
                    <motion.div
                      animate={{ scale: [0.8, 1.1, 0.8] }}
                      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                      className="absolute inset-2 flex items-center justify-center text-amber-400"
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <motion.p
                    key={loadingMsgIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs font-semibold text-amber-200 tracking-wide font-fantasy"
                  >
                    {LOADING_MESSAGES[loadingMsgIdx]}
                  </motion.p>
                  <span className="text-[10px] text-amber-400/60 mt-1 font-mono">
                    Transmuting Likeness...
                  </span>
                </motion.div>
              ) : character.portraitUrl ? (
                /* Displayed Portrait */
                <motion.div
                  key="portrait"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full group/image"
                >
                  <img
                    id="character-portrait-img"
                    src={character.portraitUrl}
                    alt={`${character.name} cartoon video game portrait`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Corner Accent Brackets */}
                  <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-300 pointer-events-none" />
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-300 pointer-events-none" />
                  <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-300 pointer-events-none" />
                  <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-300 pointer-events-none" />

                  {/* Hover Overlay Controls (Zoom & Download) */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-2.5 p-2 backdrop-blur-[2px]">
                    <button
                      type="button"
                      onClick={() => setIsZoomOpen(true)}
                      className="p-2 rounded-lg bg-[#22170f]/90 hover:bg-[#322316] text-amber-300 border border-brass transition-transform hover:scale-105 cursor-pointer shadow-lg"
                      title="Enlarge Portrait"
                      aria-label="Enlarge portrait"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="p-2 rounded-lg bg-[#22170f]/90 hover:bg-[#322316] text-amber-300 border border-brass transition-transform hover:scale-105 cursor-pointer shadow-lg"
                      title="Download Portrait"
                      aria-label="Download portrait"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Unforged / Placeholder Portrait State */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center p-3 text-center w-full h-full"
                >
                  <div className="p-3 rounded-full bg-[#18110a] border border-brass/50 mb-2 text-amber-500/60 group-hover:text-amber-400 group-hover:border-amber-400 transition-colors shadow-inner">
                    <ClassIcon characterClass={character.characterClass} className="w-8 h-8 opacity-75" />
                  </div>
                  <span className="text-xs font-semibold text-amber-200/90 font-fantasy">
                    Scrying Lens Inactive
                  </span>
                  <span className="text-[10px] text-amber-400/60 mt-0.5">
                    Transmute Cartoon Likeness
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Style Tag Badge */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#1c140d] border border-brass-light text-[10px] font-bold text-amber-300 tracking-wider uppercase whitespace-nowrap shadow-lg flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            <span>Scrying Lens</span>
          </div>
        </div>

        {/* Buttons: Generate vs Regenerate */}
        <div className="w-full mt-3 flex flex-col items-center gap-2">
          {character.portraitUrl ? (
            /* REGENERATE PORTRAIT BUTTON */
            <motion.button
              id="regenerate-portrait-btn"
              type="button"
              onClick={onRegenerate}
              disabled={isGenerating}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2 px-3.5 rounded-xl font-fantasy text-xs font-bold tracking-wider text-amber-200 bg-[#221811] hover:bg-[#2c2017] border border-brass-light/80 hover:border-amber-400 shadow-md shadow-black/60 cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <RotateCw className={`w-3.5 h-3.5 text-amber-400 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Transmuting...' : 'Re-Scry Portrait'}</span>
            </motion.button>
          ) : (
            /* GENERATE PORTRAIT BUTTON */
            <motion.button
              id="generate-portrait-btn"
              type="button"
              onClick={onGenerate}
              disabled={isGenerating}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2 px-3.5 rounded-xl font-fantasy text-xs font-bold tracking-wider text-[#120a04] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 shadow-md shadow-amber-950/60 border border-amber-300 cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Wand2 className={`w-3.5 h-3.5 text-[#120a04] ${isGenerating ? 'animate-pulse' : ''}`} />
              <span>{isGenerating ? 'Transmuting Art...' : 'Scry Portrait'}</span>
            </motion.button>
          )}

          {error && (
            <div className="flex items-center gap-1.5 text-[11px] text-rose-400 bg-rose-950/50 border border-rose-900/60 rounded-lg px-2.5 py-1 w-full text-center justify-center">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span className="truncate">{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && character.portraitUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-slate-900 border border-amber-500/40 rounded-2xl p-4 shadow-2xl flex flex-col items-center cursor-default"
            >
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="absolute -top-3 -right-3 p-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                aria-label="Close zoomed portrait"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-950 mb-3 shadow-inner">
                <img
                  src={character.portraitUrl}
                  alt={`${character.name} portrait`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full flex items-center justify-between text-xs px-1">
                <div>
                  <h4 className="font-fantasy font-bold text-amber-200 text-sm">
                    {character.name}
                  </h4>
                  <p className="text-slate-400 text-[11px]">
                    {character.race} {character.characterClass} • Cartoon / Video Game Art
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
