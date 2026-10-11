import React, { useState } from 'react';
import { HaircutRecommendation } from '../types';
import { ProductCard6040 } from './ProductCard6040';
import { Scissors, Sparkles, CheckCircle2, Clock, ChevronDown, ChevronUp, Droplets } from 'lucide-react';

interface HaircutCardProps {
  haircut: HaircutRecommendation;
  rank: number;
  faceShape: string;
  hairTexture: string;
  onOpenBarberCard: (haircut: HaircutRecommendation) => void;
  onNotify?: (title: string, message?: string) => void;
}

export const HaircutCard: React.FC<HaircutCardProps> = ({
  haircut,
  rank,
  faceShape,
  hairTexture,
  onOpenBarberCard,
  onNotify,
}) => {
  const [expandedRoutine, setExpandedRoutine] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#10141d] overflow-hidden shadow-xl transition-all duration-300 hover:border-slate-700 max-w-full">
      {/* Top Header: Rank, Match Score, Title */}
      <div className="p-4 sm:p-5 md:p-6 border-b border-slate-800/80 bg-gradient-to-r from-[#141924] to-[#10141d] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono font-bold text-sm flex items-center justify-center">
            0{rank}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                {haircut.vibe}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400 font-medium truncate">{haircut.fadeType}</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mt-0.5 break-words">
              {haircut.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold shadow-inner">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{haircut.matchScore}% Match</span>
          </div>
          <button
            type="button"
            onClick={() => onOpenBarberCard(haircut)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 active:scale-[0.98]"
          >
            <Scissors className="w-3.5 h-3.5 text-slate-950 flex-shrink-0" />
            <span>Show Barber</span>
          </button>
        </div>
      </div>

      {/* Main Content: Haircut Visual & Anatomical Balance */}
      <div className="p-4 sm:p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Haircut Reference Image */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-slate-700/80 bg-black shadow-lg group">
            <img
              src={haircut.imageUrl}
              alt={haircut.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            {/* Quick summary over image */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs space-y-1">
              <div className="flex justify-between text-slate-300 gap-2">
                <span className="text-slate-400 flex-shrink-0">Top Length:</span>
                <span className="font-semibold text-white truncate text-right">{haircut.topLength}</span>
              </div>
              <div className="flex justify-between text-slate-300 gap-2">
                <span className="text-slate-400 flex-shrink-0">Sides & Taper:</span>
                <span className="font-semibold text-white truncate text-right">{haircut.sidesAndBack}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Anatomical Harmony Details & Barber Notes */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5 min-w-0">
          {/* Why it works with Face Shape & Texture */}
          <div className="rounded-xl bg-[#141824] border border-slate-800 p-3.5 sm:p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span>Facial Harmony ({faceShape} Face + {hairTexture})</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {haircut.whyItWorks}
            </p>
          </div>

          {/* Key Specs Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800 min-w-0">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold block truncate">
                Styling Time
              </span>
              <span className="text-xs font-bold text-white mt-1 block truncate">
                {haircut.stylingDifficulty}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800 min-w-0">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold block truncate">
                Maintenance
              </span>
              <span className="text-xs font-bold text-white mt-1 block truncate">
                {haircut.maintenanceWeeks}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800 col-span-2 sm:col-span-1 min-w-0">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold block truncate">
                Fade Silhouette
              </span>
              <span className="text-xs font-bold text-amber-300 mt-1 block truncate">
                {haircut.fadeType}
              </span>
            </div>
          </div>

          {/* Daily Routine Accordion */}
          <div className="rounded-xl border border-slate-800 bg-[#0d1017]">
            <button
              type="button"
              onClick={() => setExpandedRoutine(!expandedRoutine)}
              className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="truncate">Daily 3-Step Styling Routine</span>
              </div>
              {expandedRoutine ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
            </button>
            {expandedRoutine && (
              <div className="p-3.5 sm:p-4 pt-1 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed animate-in fade-in-50">
                {haircut.dailyRoutine}
              </div>
            )}
          </div>

          {/* Quick Script Preview */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Quick Barber Request:
            </span>
            <p className="text-slate-300 italic text-xs leading-relaxed">
              "{haircut.barberInstructions.scriptForBarber}"
            </p>
          </div>
        </div>
      </div>

      {/* CURATED STYLING PRODUCTS FOR THIS HAIRCUT
          ENFORCING STRICT 60:40 RATIO PER USER INSTRUCTION */}
      {haircut.recommendedProducts && haircut.recommendedProducts.length > 0 && (
        <div className="p-4 sm:p-5 md:p-6 border-t border-slate-800/80 bg-[#0c0f16]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  Prescribed Styling Products for This Cut
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Formulated to lock in this specific texture & finish (Strict 60:40 Image to Info presentation).
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-amber-400/90 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 self-start sm:self-auto">
              <span>Ratio: 60% Image / 40% Info</span>
            </div>
          </div>

          {/* Product Cards with exact 60:40 split */}
          <div className="space-y-4">
            {haircut.recommendedProducts.map((prod) => (
              <ProductCard6040
                key={prod.id}
                product={prod}
                layout="horizontal"
                highlight={false}
                onNotify={onNotify}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
