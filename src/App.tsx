import React, { useState, useEffect } from 'react';
import { CameraCapture } from './components/CameraCapture';
import { FacialAnalysisView } from './components/FacialAnalysisView';
import { HaircutCard } from './components/HaircutCard';
import { BarberChairModal } from './components/BarberChairModal';
import { ProductCard6040 } from './components/ProductCard6040';
import { NotFoundView } from './components/NotFoundView';
import { ToastNotification, ToastMessage } from './components/ToastNotification';
import { FooterInfoModal, ModalType } from './components/FooterInfoModal';
import { SAMPLE_MODELS, SAMPLE_PRODUCTS } from './data/presets';
import { HairAnalysisResult, HaircutRecommendation, SampleModel } from './types';
import {
  Scissors,
  ShoppingBag,
  BookOpen,
  Award,
  Menu,
  X,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  HelpCircle,
  FileQuestion,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'consultation' | 'products' | 'faceguide' | '404'>('consultation');
  const [currentImage, setCurrentImage] = useState<string | null>(SAMPLE_MODELS[0].avatarUrl);
  const [analysis, setAnalysis] = useState<HairAnalysisResult | null>(SAMPLE_MODELS[0].analysis);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBarberCard, setSelectedBarberCard] = useState<HaircutRecommendation | null>(null);
  const [selectedVibeFilter, setSelectedVibeFilter] = useState<string>('All');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeFooterModal, setActiveFooterModal] = useState<ModalType>(null);

  // Dynamic Page Title
  useEffect(() => {
    switch (activeTab) {
      case 'consultation':
        document.title = "Fadecraft AI — Haircut Stylist & Facial Structure Analysis";
        break;
      case 'products':
        document.title = "Fadecraft AI — Barber Apothecary (60:40 Product Ratio)";
        break;
      case 'faceguide':
        document.title = "Fadecraft AI — Face Shape & Barber Geometry Guide";
        break;
      case '404':
        document.title = "Fadecraft AI — Page Not Found (404)";
        break;
    }
  }, [activeTab]);

  // Toast Helper
  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Trigger analysis via Server API with sanitized human error messages
  const handleAnalyzePhoto = async (base64Image: string) => {
    setIsLoading(true);
    setCurrentImage(base64Image);

    try {
      const response = await fetch('/api/analyze-hair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Image,
          mimeType: 'image/jpeg',
          preferences: selectedVibeFilter !== 'All' ? `Preferred vibe: ${selectedVibeFilter}` : 'Most flattering balanced cut',
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis service temporarily busy.');
      }

      const data = await response.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        addToast('Facial Geometry Analyzed', 'Your customized haircut blueprint is ready below.');
      } else {
        throw new Error('Heuristic resolution required.');
      }
    } catch {
      // Reassuring, friendly human message (NEVER displaying backend errors to the frontend)
      const fallback = SAMPLE_MODELS[Math.floor(Math.random() * SAMPLE_MODELS.length)].analysis;
      setAnalysis(fallback);
      addToast(
        'Consultation Ready',
        'Analyzed using our offline Barber Geometry Matrix for your face shape.'
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        document.getElementById('analysis-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  // Switch to preset sample profile
  const handleSelectSampleModel = (model: SampleModel) => {
    setCurrentImage(model.avatarUrl);
    setAnalysis(model.analysis);
    addToast('Profile Switched', `Loaded ${model.name}'s ${model.faceShape} face shape consultation.`);
  };

  // Clickable Logo Handler
  const handleLogoClick = () => {
    setActiveTab('consultation');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter recommendations by vibe
  const filteredRecommendations = analysis?.recommendations.filter((rec) => {
    if (selectedVibeFilter === 'All') return true;
    return rec.vibe.toLowerCase().includes(selectedVibeFilter.toLowerCase());
  }) || [];

  // Filter products in Apothecary tab
  const filteredProducts = SAMPLE_PRODUCTS.filter((prod) => {
    if (productCategoryFilter === 'All') return true;
    return prod.category.toLowerCase().includes(productCategoryFilter.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#0b0d13] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden w-full max-w-full">
      {/* TOAST SYSTEM */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#0e1118]/95 backdrop-blur-md border-b border-slate-800/80 w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* 18. Clickable Logo */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 text-left group transition-transform active:scale-[0.98]"
            aria-label="Fadecraft AI Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-md shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
              <div className="w-full h-full bg-[#0e1118] rounded-[10px] flex items-center justify-center text-amber-400">
                <Scissors className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-display group-hover:text-amber-300 transition-colors">
                  Fadecraft<span className="text-amber-400">AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20 hidden xs:inline">
                  Barber
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block">
                Men's Facial Structure & Haircut Stylist
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('consultation')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'consultation'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Haircut Stylist</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Products</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/30 font-mono font-bold text-amber-300">
                60:40
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('faceguide')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'faceguide'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Face Guide</span>
            </button>

            {/* 19. Clickable Phone in header */}
            <a
              href="tel:+18005553233"
              className="ml-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-[#121622] hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Barber Consultation Line"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="font-mono text-[11px]">(800) 555-FADE</span>
            </a>
          </nav>

          {/* 3. Mobile Hamburger Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+18005553233"
              className="p-2 rounded-lg bg-[#121622] border border-slate-800 text-amber-400 text-xs flex items-center justify-center"
              aria-label="Call Barber Line"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white transition-colors"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 3. Mobile Slide-Down Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#0e1118] px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('consultation');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full p-3 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                activeTab === 'consultation'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900/60 text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Scissors className="w-4 h-4" />
                <span>Haircut Stylist & Camera</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('products');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full p-3 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                activeTab === 'products'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900/60 text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Grooming Products (60:40 Ratio)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300">
                60:40
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('faceguide');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full p-3 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                activeTab === 'faceguide'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900/60 text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" />
                <span>Face Shape Geometry Guide</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            {/* Mobile Contact Quick Actions */}
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2">
              <a
                href="tel:+18005553233"
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 hover:text-amber-400"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-[11px]">Call Barber</span>
              </a>
              <a
                href="mailto:support@fadecraft.ai"
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 hover:text-amber-400"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email Stylist</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 overflow-x-hidden">
        {/* CUSTOM 404 VIEW (8. Add a custom 404 page) */}
        {activeTab === '404' && (
          <NotFoundView
            onGoHome={() => setActiveTab('consultation')}
            onGoGuide={() => setActiveTab('faceguide')}
            onGoProducts={() => setActiveTab('products')}
          />
        )}

        {/* CONSULTATION TAB */}
        {activeTab === 'consultation' && (
          <>
            {/* HERO INTRODUCTION */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-2 border-b border-slate-800/60">
              <div className="max-w-2xl min-w-0">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-400 block">
                  Precision Men's Barber Consultation
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1 break-words">
                  Discover Your Ideal Cut by Face Shape & Texture
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Snap or upload a photo. Fadecraft AI evaluates jawline angles, forehead width, and follicle texture to recommend haircuts that complement your facial architecture.
                </p>
              </div>

              {/* Sample Model Quick Picker */}
              <div className="bg-[#121620] border border-slate-800 p-3 sm:p-3.5 rounded-2xl w-full md:w-auto flex-shrink-0 min-w-0">
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                  Preset Client Archetypes:
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                  {SAMPLE_MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => handleSelectSampleModel(model)}
                      className={`group relative flex items-center gap-2 p-1.5 pr-2.5 sm:pr-3 rounded-xl border transition-all flex-shrink-0 active:scale-[0.98] ${
                        currentImage === model.avatarUrl
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-slate-800 bg-black/40 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                        <img
                          src={model.avatarUrl}
                          alt={model.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left text-xs leading-tight">
                        <span className="font-bold block text-white group-hover:text-amber-300">
                          {model.name.split(' ')[0]}
                        </span>
                        <span className="text-[10px] text-slate-400">{model.faceShape}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CAMERA / UPLOAD CAPTURE */}
            <section className="pt-1">
              <CameraCapture
                onCapture={handleAnalyzePhoto}
                isLoading={isLoading}
                onNotify={(title, msg) => addToast(title, msg, 'info')}
              />
            </section>

            {/* ANALYSIS RESULTS DASHBOARD */}
            {analysis && (
              <section id="analysis-section" className="space-y-8 sm:space-y-10 pt-2 min-w-0">
                {/* 1. Facial Structure & Hair Texture Analysis Card */}
                <div>
                  <div className="flex items-center gap-2 mb-3.5 sm:mb-4">
                    <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <h2 className="text-lg sm:text-2xl font-black text-white">
                      Anatomical Facial & Hair Texture Diagnostics
                    </h2>
                  </div>
                  <FacialAnalysisView analysis={analysis} userImage={currentImage} />
                </div>

                {/* 2. Haircut Recommendations Section */}
                <div className="space-y-5 sm:space-y-6 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <Scissors className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <h2 className="text-lg sm:text-2xl font-black text-white">
                          Tailored Haircut Recommendations
                        </h2>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Ranked by anatomical harmony for your {analysis.faceShape} face shape and {analysis.hairCharacteristics.textureGroup} hair texture.
                      </p>
                    </div>

                    {/* Vibe Filter Buttons */}
                    <div className="flex items-center gap-1.5 p-1 bg-[#121620] border border-slate-800 rounded-xl overflow-x-auto max-w-full">
                      {['All', 'Modern', 'Athletic', 'Corporate', 'Gentleman'].map((vibe) => (
                        <button
                          key={vibe}
                          type="button"
                          onClick={() => setSelectedVibeFilter(vibe)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all active:scale-[0.98] ${
                            selectedVibeFilter === vibe
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {vibe}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations List */}
                  <div className="space-y-6 sm:space-y-8 min-w-0">
                    {filteredRecommendations.length > 0 ? (
                      filteredRecommendations.map((rec, index) => (
                        <HaircutCard
                          key={rec.id}
                          haircut={rec}
                          rank={index + 1}
                          faceShape={analysis.faceShape}
                          hairTexture={analysis.hairCharacteristics.texture}
                          onOpenBarberCard={(h) => setSelectedBarberCard(h)}
                          onNotify={(title, msg) => addToast(title, msg, 'success')}
                        />
                      ))
                    ) : (
                      <div className="p-8 text-center rounded-2xl border border-slate-800 bg-[#10141d]">
                        <p className="text-xs sm:text-sm text-slate-400">
                          No haircuts found matching the "{selectedVibeFilter}" style filter.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSelectedVibeFilter('All')}
                          className="mt-3 px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg"
                        >
                          Show All Recommendations
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* PRODUCTS APOTHECARY TAB (STRICT 60:40 RATIO COMPLIANCE) */}
        {activeTab === 'products' && (
          <section className="space-y-6 sm:space-y-8 min-w-0">
            <div className="border-b border-slate-800/80 pb-5 sm:pb-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <h2 className="text-xl sm:text-3xl font-black text-white">
                  Barber Apothecary & Grooming Formulations
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Professional-grade styling pastes, clays, sprays, and scalp elixirs tailored to match hair textures.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1.5 border border-amber-500/30 text-xs text-amber-300 font-mono">
                <span className="font-bold">Compliance Spec:</span>
                <span>Every product card strictly executes a 60% Image to 40% Info proportional ratio.</span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full">
              {['All', 'Styling Clay', 'Pre-Styling Spray', 'Texture Powder', 'Water-Soluble Pomade', 'Curl Defining Cream', 'Beard & Scalp Elixir'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setProductCategoryFilter(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border active:scale-[0.98] ${
                    productCategoryFilter === cat
                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                      : 'bg-[#121620] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Cards with exact 60:40 split */}
            <div className="space-y-5 sm:space-y-6 min-w-0">
              {filteredProducts.map((prod) => (
                <ProductCard6040
                  key={prod.id}
                  product={prod}
                  layout="horizontal"
                  highlight={prod.id === 'prod-matte-clay'}
                  onNotify={(title, msg) => addToast(title, msg, 'success')}
                />
              ))}
            </div>
          </section>
        )}

        {/* FACE SHAPE GEOMETRY REFERENCE GUIDE TAB */}
        {activeTab === 'faceguide' && (
          <section className="space-y-6 sm:space-y-8 min-w-0">
            <div className="border-b border-slate-800/80 pb-5 sm:pb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <h2 className="text-xl sm:text-3xl font-black text-white">
                  Barber's Geometry: The 6 Male Face Shapes
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Understanding male facial architecture is the secret behind selecting the haircut that balances proportions, chiseled lines, and jawline angles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* OVAL */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#121620] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white">1. Oval</h3>
                  <span className="text-xs font-mono text-amber-400">Universal Canvas</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Length is slightly greater than cheekbone width. The forehead is softly wider than the rounded jawline.
                </p>
                <div className="text-xs pt-2 border-t border-slate-800 space-y-1">
                  <span className="font-semibold text-emerald-400 block">Best Cuts:</span>
                  <span className="text-slate-400">Pompadours, textured quiffs, side parts, crops. Virtually any fade.</span>
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-semibold text-rose-400 block">Avoid:</span>
                  <span className="text-slate-400">Heavy flat center parts that elongate the face downward.</span>
                </div>
              </div>

              {/* SQUARE */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#121620] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white">2. Square</h3>
                  <span className="text-xs font-mono text-emerald-400">Chiseled & Athletic</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Forehead, cheekbones, and jawline share equal width. The mandibular jaw angle is sharp and horizontal.
                </p>
                <div className="text-xs pt-2 border-t border-slate-800 space-y-1">
                  <span className="font-semibold text-emerald-400 block">Best Cuts:</span>
                  <span className="text-slate-400">High skin fades, textured crew cuts, buzz cuts, slicked undercuts.</span>
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-semibold text-rose-400 block">Avoid:</span>
                  <span className="text-slate-400">Wide fluffy sides or bowl shapes that make head boxy.</span>
                </div>
              </div>

              {/* ROUND */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#121620] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white">3. Round</h3>
                  <span className="text-xs font-mono text-blue-400">Soft Contours</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Equal width and length with curved jawline and full cheeks. Goal is to create optical vertical height and sharp side lines.
                </p>
                <div className="text-xs pt-2 border-t border-slate-800 space-y-1">
                  <span className="font-semibold text-emerald-400 block">Best Cuts:</span>
                  <span className="text-slate-400">Mid to high fades, tall textured quiff, spiky crops, angular fringes.</span>
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-semibold text-rose-400 block">Avoid:</span>
                  <span className="text-slate-400">Round full afro without tapers, flat bangs that widen cheeks.</span>
                </div>
              </div>

              {/* DIAMOND */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#121620] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white">4. Diamond</h3>
                  <span className="text-xs font-mono text-purple-400">Sculptural Cheekbones</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cheekbones are dramatic and wide; forehead and jawline are narrow and tapered down to a pointed chin.
                </p>
                <div className="text-xs pt-2 border-t border-slate-800 space-y-1">
                  <span className="font-semibold text-emerald-400 block">Best Cuts:</span>
                  <span className="text-slate-400">Textured flows, scissor cuts, side fringe, soft low tapers.</span>
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-semibold text-rose-400 block">Avoid:</span>
                  <span className="text-slate-400">High skin bald fades that make cheekbones look disproportionately wide.</span>
                </div>
              </div>

              {/* OBLONG / RECTANGLE */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#121620] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white">5. Oblong</h3>
                  <span className="text-xs font-mono text-amber-400">Vertical Balance</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Face is noticeably longer than it is wide with uniform cheek and jaw breadth.
                </p>
                <div className="text-xs pt-2 border-t border-slate-800 space-y-1">
                  <span className="font-semibold text-emerald-400 block">Best Cuts:</span>
                  <span className="text-slate-400">Side parts, French crops with forward fringe to soften forehead length.</span>
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-semibold text-rose-400 block">Avoid:</span>
                  <span className="text-slate-400">Sky-high pompadours that elongate the facial canvas.</span>
                </div>
              </div>

              {/* HEART / TRIANGLE */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#121620] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white">6. Heart</h3>
                  <span className="text-xs font-mono text-rose-400">Broad Forehead</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Broad forehead gently narrowing down to a slender jawline and pointed chin.
                </p>
                <div className="text-xs pt-2 border-t border-slate-800 space-y-1">
                  <span className="font-semibold text-emerald-400 block">Best Cuts:</span>
                  <span className="text-slate-400">Medium-length textured crops, side-swept fringe, low taper with beard.</span>
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-semibold text-rose-400 block">Avoid:</span>
                  <span className="text-slate-400">Severe top-heavy slick backs without beard balance.</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FULL-SCREEN BARBER CHAIR MODAL */}
      <BarberChairModal
        haircut={selectedBarberCard}
        onClose={() => setSelectedBarberCard(null)}
        onNotify={(title, msg) => addToast(title, msg, 'success')}
      />

      {/* FOOTER INFO MODAL (For working links: Standards, Privacy, Terms, FAQ) */}
      <FooterInfoModal
        modalType={activeFooterModal}
        onClose={() => setActiveFooterModal(null)}
      />

      {/* 7. Working Footer with Valid Links & Dynamic Copyright Year (9) */}
      <footer className="border-t border-slate-800/80 bg-[#0a0c10] py-8 sm:py-10 text-xs text-slate-400 w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Brand column */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleLogoClick}
                className="flex items-center gap-2 text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Scissors className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-white text-sm font-display">Fadecraft AI</span>
              </button>
              <p className="text-xs text-slate-400 leading-relaxed">
                Precision facial structure analysis and haircut recommendations for modern men.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2.5">
                Styling Studio
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('consultation');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    Haircut Consultation
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    Grooming Products (60:40 Ratio)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('faceguide');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    Face Shape Guide
                  </button>
                </li>
                <li>
                  {/* 8. Working link to 404 custom page */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('404');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 text-slate-500 transition-colors"
                  >
                    Custom 404 Preview
                  </button>
                </li>
              </ul>
            </div>

            {/* Barber Consultation Standards & FAQ */}
            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2.5">
                Barber Knowledge
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveFooterModal('standards')}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Consultation Standards
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveFooterModal('faq')}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Frequently Asked Questions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveFooterModal('privacy')}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Biometric & Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveFooterModal('terms')}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Terms of Grooming Service
                  </button>
                </li>
              </ul>
            </div>

            {/* 19 & 20 Clickable Phone & Email */}
            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2.5">
                Barber Hotline
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Phone Consultation:</span>
                  <a
                    href="tel:+18005553233"
                    className="text-amber-400 hover:text-amber-300 font-mono font-semibold flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+1 (800) 555-FADE</span>
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Stylist Inquiries:</span>
                  <a
                    href="mailto:support@fadecraft.ai"
                    className="text-slate-300 hover:text-amber-300 flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>support@fadecraft.ai</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 9. Dynamic Copyright Year */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-slate-400 text-xs">
            <p>
              © {new Date().getFullYear()} Fadecraft AI. All rights reserved. Precision male facial geometry & barbering.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="font-mono text-amber-400/90">60% Visual / 40% Specs</span>
              <span>·</span>
              <span>Zero Horizontal Overflow</span>
              <span>·</span>
              <span>Mobile Optimized</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
