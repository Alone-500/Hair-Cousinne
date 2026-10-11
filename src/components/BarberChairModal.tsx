import React, { useState, useEffect } from 'react';
import { HaircutRecommendation } from '../types';
import { X, Copy, Check, Scissors, Volume2 } from 'lucide-react';

interface BarberChairModalProps {
  haircut: HaircutRecommendation | null;
  onClose: () => void;
  onNotify?: (title: string, message?: string) => void;
}

export const BarberChairModal: React.FC<BarberChairModalProps> = ({ haircut, onClose, onNotify }) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!haircut) return null;

  const { name, barberInstructions, topLength, sidesAndBack, fadeType, imageUrl } = haircut;

  const handleCopy = () => {
    const textToCopy = `Haircut Request: ${name}
- Fade/Sides: ${sidesAndBack} (${barberInstructions.clipperGuards})
- Top: ${topLength} (${barberInstructions.scissorWork})
- Neckline/Temples: ${barberInstructions.templeAndNape}
- Specific Request: "${barberInstructions.scriptForBarber}"`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      if (onNotify) {
        onNotify('Barber Instructions Copied', 'Paste or show these exact clipper & shear specs to your barber.');
      }
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      setCopied(true);
      if (onNotify) {
        onNotify('Specs Ready', 'You can take a screenshot or read out loud to your barber.');
      }
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Barber Consultation Card"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0e1118] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-transparent border-b border-amber-500/30 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Scissors className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block truncate">
                Barber Consultation Card
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-white truncate">
                {name}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-2 flex-shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          {/* Reference Image & Overview */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-center bg-[#141822] p-3.5 sm:p-4 rounded-xl border border-slate-800">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 bg-black">
              <img
                src={haircut.imageUrl}
                alt={name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1 text-center sm:text-left min-w-0">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                Target Silhouette
              </span>
              <h4 className="text-base font-bold text-white break-words">{name}</h4>
              <p className="text-xs text-slate-300">
                Fade Profile: <span className="text-amber-300 font-semibold">{fadeType}</span>
              </p>
            </div>
          </div>

          {/* Say This to Your Barber (Exact Verbatim Script) */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              <Volume2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Read This to Your Barber (or Hand Him Your Phone)</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-amber-100 italic leading-relaxed bg-black/50 p-3 sm:p-3.5 rounded-lg border border-amber-500/20">
              "{barberInstructions.scriptForBarber}"
            </p>
          </div>

          {/* Technical Specs for the Barber */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Exact Technical Specifications
            </h4>

            {/* Clipper Guards */}
            <div className="p-3 rounded-xl bg-[#131722] border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                1
              </span>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-200 block">Sides & Back / Clipper Guards</span>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {barberInstructions.clipperGuards}
                </p>
              </div>
            </div>

            {/* Scissor Work on Top */}
            <div className="p-3 rounded-xl bg-[#131722] border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                2
              </span>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-200 block">Crown, Top & Fringe Scissor Work</span>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {barberInstructions.scissorWork} ({topLength})
                </p>
              </div>
            </div>

            {/* Neckline & Edges */}
            <div className="p-3 rounded-xl bg-[#131722] border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                3
              </span>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-200 block">Temple Lineup & Neckline Finish</span>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {barberInstructions.templeAndNape}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-[#0a0c10] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <span className="text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">
            Show this screen directly while sitting in the barber chair.
          </span>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700 active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Barber Specs</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors active:scale-[0.98]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
