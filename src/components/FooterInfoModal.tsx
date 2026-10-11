import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, HelpCircle, Phone, Mail } from 'lucide-react';

export type ModalType = 'standards' | 'privacy' | 'terms' | 'faq' | null;

interface FooterInfoModalProps {
  modalType: ModalType;
  onClose: () => void;
}

export const FooterInfoModal: React.FC<FooterInfoModalProps> = ({ modalType, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!modalType) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0e1118] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[88vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-[#121622] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            {modalType === 'standards' && <ShieldCheck className="w-5 h-5 text-amber-400" />}
            {modalType === 'privacy' && <ShieldCheck className="w-5 h-5 text-amber-400" />}
            {modalType === 'terms' && <FileText className="w-5 h-5 text-amber-400" />}
            {modalType === 'faq' && <HelpCircle className="w-5 h-5 text-amber-400" />}
            <h3 className="text-base sm:text-lg font-bold text-white capitalize">
              {modalType === 'standards' && 'Barber Consultation Standards'}
              {modalType === 'privacy' && 'Privacy & Biometric Protection'}
              {modalType === 'terms' && 'Terms of Grooming Service'}
              {modalType === 'faq' && 'Frequently Asked Questions'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed flex-1">
          {modalType === 'standards' && (
            <>
              <p>
                Fadecraft AI pairs geometric facial analysis with real-world master barbering techniques. We evaluate cranial proportions, mandibular jaw angles, and follicle texture groups (Type 1 to Type 4).
              </p>
              <h4 className="font-bold text-white text-sm pt-2">Our Consultation Principles:</h4>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                <li><strong className="text-amber-300">Skeletal Harmony:</strong> Every haircut recommendation is geometrically designed to counterbalance extreme dimensions.</li>
                <li><strong className="text-amber-300">Follicle Physics:</strong> We never recommend cuts requiring hair texture you don't possess without explicit texturizing instructions.</li>
                <li><strong className="text-amber-300">Barber Translation:</strong> All specifications include exact clipper guards and shear directions to eliminate miscommunication in the chair.</li>
              </ul>
            </>
          )}

          {modalType === 'privacy' && (
            <>
              <p>
                Your privacy is paramount. Camera snapshots are processed securely for immediate facial feature analysis and are not sold to third-party advertisers.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">Data Protection Commitments:</h4>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                <li>Temporary memory processing: Snapshots are analyzed in-session.</li>
                <li>Zero facial recognition tracking or commercial identity profiling.</li>
                <li>Client-side camera control: You can stop camera feeds at any instant.</li>
              </ul>
            </>
          )}

          {modalType === 'terms' && (
            <>
              <p>
                Fadecraft AI provides men's grooming recommendations for educational and styling guidance.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">Barber Communication Note:</h4>
              <p>
                Individual scalp conditions, cowlick directions, and hairline variations may require personal barber adjustments. We encourage sharing the Barber Chair Mode card directly with your licensed barber for optimal results.
              </p>
            </>
          )}

          {modalType === 'faq' && (
            <div className="space-y-4">
              <div>
                <h5 className="font-bold text-white">How does Fadecraft AI know my face shape?</h5>
                <p className="text-slate-400 mt-1">
                  We measure the proportional ratios between your forehead width, cheekbone breadth, and mandibular jaw angle to classify into one of the 6 fundamental male facial geometries.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-white">What is the 60:40 product ratio?</h5>
                <p className="text-slate-400 mt-1">
                  Every product card is strictly presented with 60% dedicated to visual inspection (formula texture, packaging, hold/shine bars) and 40% dedicated to technical specifications and application steps.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-white">How do I show this to my barber?</h5>
                <p className="text-slate-400 mt-1">
                  Tap the "Show Barber" button on any recommended cut. It switches to Barber Chair Mode with exact clipper guards and a verbatim script you can read or show on your phone.
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <a href="tel:+18005553233" className="hover:text-amber-300 font-mono">
                +1 (800) 555-FADE
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <a href="mailto:support@fadecraft.ai" className="hover:text-amber-300">
                support@fadecraft.ai
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#0a0c10] border-t border-slate-800 flex justify-end flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
