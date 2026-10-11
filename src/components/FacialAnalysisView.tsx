import React from 'react';
import { HairAnalysisResult } from '../types';
import { UserCheck, Sparkles, AlertTriangle, Ruler, Scissors } from 'lucide-react';

interface FacialAnalysisViewProps {
  analysis: HairAnalysisResult;
  userImage?: string | null;
}

export const FacialAnalysisView: React.FC<FacialAnalysisViewProps> = ({ analysis, userImage }) => {
  const { faceShape, faceShapeConfidence, faceCharacteristics, hairCharacteristics, avoidStyles, expertTip } = analysis;

  return (
    <div className="w-full space-y-4 sm:space-y-6 max-w-full">
      {/* Top Banner: Face Shape & Hair Texture At-A-Glance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {/* User image & geometry badge */}
        <div className="relative rounded-2xl bg-[#11141c] border border-slate-800 p-4 flex flex-col sm:flex-row md:flex-col items-center gap-3.5 sm:gap-4 shadow-lg overflow-hidden min-w-0">
          {userImage ? (
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-amber-500/40 flex-shrink-0 bg-black">
              <img
                src={userImage}
                alt="Client Facial Structure"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-amber-400/30 rounded-xl pointer-events-none" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500">
              <UserCheck className="w-10 h-10" />
            </div>
          )}

          <div className="flex flex-col items-center sm:items-start md:items-center text-center sm:text-left md:text-center min-w-0">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Facial Architecture
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-white font-display truncate">
                {faceShape} Face
              </span>
            </div>
            <span className="mt-1 text-xs text-amber-400 font-mono">
              {faceShapeConfidence}% Anatomical Confidence
            </span>
          </div>
        </div>

        {/* Jawline & Proportions Metric */}
        <div className="rounded-2xl bg-[#11141c] border border-slate-800 p-4 sm:p-5 flex flex-col justify-between shadow-lg min-w-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Ruler className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Skeletal Proportions</span>
            </div>
            <div className="mt-3 space-y-2">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Mandibular Jawline:</span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {faceCharacteristics.jawline}
                </p>
              </div>
              <div className="pt-1">
                <span className="text-[11px] text-slate-400 block font-medium">Forehead & Cheekbone Ratio:</span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {faceCharacteristics.proportions}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 truncate">
            <span>Cheekbones: {faceCharacteristics.cheekbones}</span>
          </div>
        </div>

        {/* Hair Texture & Growth Metric */}
        <div className="rounded-2xl bg-[#11141c] border border-slate-800 p-4 sm:p-5 flex flex-col justify-between shadow-lg min-w-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Scissors className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Hair Follicle Analysis</span>
            </div>
            <div className="mt-3 space-y-2">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Texture Classification:</span>
                <p className="text-xs text-amber-300 font-semibold leading-relaxed">
                  {hairCharacteristics.texture} ({hairCharacteristics.density})
                </p>
              </div>
              <div className="pt-1">
                <span className="text-[11px] text-slate-400 block font-medium">Hairline & Crown Direction:</span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {hairCharacteristics.hairline}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 truncate">
            <span>Current Length: {hairCharacteristics.currentLength}</span>
          </div>
        </div>
      </div>

      {/* Pro Barber Advice & Styles to Avoid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Pro Tip */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#141923] to-[#11141c] border border-amber-500/30 p-4 sm:p-5 shadow-lg min-w-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span>Master Barber Geometric Strategy</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {expertTip}
          </p>
        </div>

        {/* Styles to Avoid */}
        <div className="rounded-2xl bg-gradient-to-br from-rose-500/10 via-[#16141a] to-[#11141c] border border-rose-500/30 p-4 sm:p-5 shadow-lg min-w-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>Haircuts to Avoid for this Face Shape</span>
          </div>
          <div className="space-y-2.5">
            {avoidStyles.map((item, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-bold text-rose-200 block">✕ {item.styleName}</span>
                <span className="text-slate-300 text-[11px] leading-relaxed block mt-0.5">
                  {item.reason}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
