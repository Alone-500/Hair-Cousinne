import React, { useState } from 'react';
import { StylingProduct } from '../types';
import { Check, Sparkles, Droplets, ShieldCheck, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: StylingProduct;
  layout?: 'horizontal' | 'vertical' | 'responsive';
  highlight?: boolean;
  onNotify?: (title: string, message?: string) => void;
}

/**
 * ProductCard6040
 * USER REQUIREMENT: "Always apply a 60 to 40 ratio for the image and info on each product"
 * 
 * - In horizontal split: strictly 60% width for image showcase, 40% width for specifications & info.
 * - In vertical stack: strictly 60% height for image showcase, 40% height for specifications & info.
 * - Mobile optimized with zero horizontal overflow and touch-friendly interactive controls.
 */
export const ProductCard6040: React.FC<ProductCardProps> = ({
  product,
  layout = 'horizontal',
  highlight = false,
  onNotify,
}) => {
  const [added, setAdded] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    if (onNotify) {
      onNotify('Added to Grooming Kit', `${product.name} was added to your personalized routine.`);
    }
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-[#11141c] transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-black/60 max-w-full ${
        highlight
          ? 'border-amber-500/60 ring-1 ring-amber-500/40 shadow-amber-500/10'
          : 'border-slate-800'
      }`}
    >
      {/* 60:40 Ratio Proportional Badge */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-lg bg-black/80 px-2.5 py-1 text-[10px] font-mono tracking-wider text-amber-300 backdrop-blur-md border border-white/10 shadow-sm pointer-events-none">
        <span className="font-bold">60% Visual</span>
        <span className="text-slate-500">:</span>
        <span className="text-slate-300">40% Specs</span>
      </div>

      {layout === 'horizontal' || layout === 'responsive' ? (
        /* HORIZONTAL 60:40 RATIO SPLIT */
        <div className="flex flex-col md:flex-row h-full min-h-[380px] max-w-full">
          {/* 60% IMAGE CONTAINER */}
          <div className="relative w-full md:w-[60%] md:min-w-[60%] md:max-w-[60%] flex-shrink-0 bg-gradient-to-br from-slate-900 via-[#141923] to-[#0c0e14] overflow-hidden flex flex-col justify-between p-3.5 sm:p-4">
            {/* Product Image with compressed loading */}
            <div className="relative w-full h-64 sm:h-72 md:h-full min-h-[220px] rounded-xl overflow-hidden border border-white/5 bg-black/40">
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Bottom overlay inside 60% image displaying hold & shine */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 backdrop-blur-md bg-black/75 rounded-lg p-2.5 border border-white/10 shadow-sm">
                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <Droplets className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="font-semibold text-[11px] text-slate-200 truncate">Hold: {product.holdLevel}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0 truncate ml-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="font-semibold text-[11px] text-slate-200 truncate">Shine: {product.shineLevel}</span>
                </div>
              </div>
            </div>

            {/* Brand & Volume Strip within 60% Visual Area */}
            <div className="mt-2.5 flex items-center justify-between px-1 text-[11px] text-slate-400">
              <span className="uppercase tracking-widest text-slate-300 font-bold">{product.brand}</span>
              {product.volume && (
                <span className="font-mono text-amber-300/90 font-medium">{product.volume}</span>
              )}
            </div>
          </div>

          {/* 40% PRODUCT INFO CONTAINER */}
          <div className="w-full md:w-[40%] md:min-w-[40%] md:max-w-[40%] flex flex-col justify-between p-4 sm:p-5 md:p-6 bg-[#0f131a] border-t md:border-t-0 md:border-l border-slate-800/80 min-w-0">
            <div className="min-w-0">
              {/* Category & Price */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase truncate">
                  {product.category}
                </span>
                <span className="text-base font-extrabold text-white font-mono flex-shrink-0">
                  {product.price}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                {product.name}
              </h4>

              {/* Purpose */}
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {product.purpose}
              </p>

              {/* How to Apply Guide */}
              <div className="mt-3.5 rounded-xl bg-black/50 border border-slate-800 p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Application Technique</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {product.howToApply}
                </p>
              </div>

              {/* Ingredients Toggle */}
              {product.keyIngredients && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => setShowIngredients(!showIngredients)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-amber-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400/80" />
                    <span>{showIngredients ? 'Hide Formulation' : 'View Key Ingredients'}</span>
                  </button>
                  {showIngredients && (
                    <p className="mt-2 text-[11px] text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 leading-relaxed animate-in fade-in-50">
                      {product.keyIngredients}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-5 pt-3.5 border-t border-slate-800/80">
              <button
                type="button"
                onClick={handleAdd}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md active:scale-[0.98] ${
                  added
                    ? 'bg-emerald-600 text-white shadow-emerald-900/30'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Saved to Routine</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-slate-950" />
                    <span>Add to Barber Kit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* VERTICAL STACK (60% Height Image / 40% Height Info) */
        <div className="flex flex-col h-[520px] max-w-full">
          {/* 60% HEIGHT IMAGE CONTAINER */}
          <div className="relative h-[60%] max-h-[60%] w-full bg-slate-900 overflow-hidden p-3.5 flex flex-col justify-between">
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5 bg-black/40">
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-slate-200 backdrop-blur-md bg-black/75 rounded-lg px-2.5 py-1.5 border border-white/10">
                <span className="font-semibold text-amber-300">Hold: {product.holdLevel}</span>
                <span className="font-semibold text-slate-300">Shine: {product.shineLevel}</span>
              </div>
            </div>
          </div>

          {/* 40% HEIGHT INFO CONTAINER */}
          <div className="h-[40%] max-h-[40%] w-full p-4 flex flex-col justify-between bg-[#0f131a] border-t border-slate-800 overflow-y-auto min-w-0">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase truncate">
                  {product.category}
                </span>
                <span className="text-sm font-extrabold text-white font-mono flex-shrink-0">{product.price}</span>
              </div>
              <h4 className="mt-1 text-sm font-bold text-white leading-tight truncate">
                {product.name}
              </h4>
              <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {product.purpose}
              </p>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`w-full mt-2.5 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
            >
              {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
              <span>{added ? 'Saved to Routine' : 'Add to Kit'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
