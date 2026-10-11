import React from 'react';
import { Scissors, Home, BookOpen, ShoppingBag, ArrowLeft } from 'lucide-react';

interface NotFoundViewProps {
  onGoHome: () => void;
  onGoGuide: () => void;
  onGoProducts: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  onGoHome,
  onGoGuide,
  onGoProducts,
}) => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12 animate-in fade-in-50">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-2xl shadow-amber-500/10">
          <Scissors className="w-12 h-12 rotate-45" />
        </div>
        <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-mono font-black border-2 border-[#0b0d13]">
          404
        </span>
      </div>

      <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2">
        Error 404 · Consultation Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight max-w-lg mb-3">
        Lost Your Lineup?
      </h1>

      <p className="text-sm text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
        The haircut profile or page you're looking for might have grown out, been trimmed away, or never existed in this barber chair.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={onGoHome}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Haircut Stylist</span>
        </button>

        <button
          type="button"
          onClick={onGoGuide}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700 flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Face Shape Guide</span>
        </button>

        <button
          type="button"
          onClick={onGoProducts}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>Products (60:40)</span>
        </button>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
        Need quick advice? Call our barber hotline at{' '}
        <a href="tel:+18005553233" className="text-amber-400 hover:underline font-mono">
          +1 (800) 555-FADE
        </a>
      </div>
    </div>
  );
};
