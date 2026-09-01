import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { HubSpotForm } from './HubSpotForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Shown under the title, so the popup can name what is being asked about. */
  subject?: string;
}

/**
 * The homepage contact form, as a popup.
 *
 * The subpages used to send anyone who wanted to get in touch back to the
 * homepage and then scroll them to the form at the bottom of it -- a route
 * change and a long scroll away from the thing they had just been reading, and
 * on a service page it meant losing the service they were asking about. The
 * form comes to them instead.
 *
 * It is the same <HubSpotForm> the homepage section renders, not a copy: one
 * form, one HubSpot integration, one set of styles. That matters more than it
 * looks -- the `.hs-form` rules in index.css are written for a dark ground
 * (white labels, translucent white inputs), so the panel here is the site's own
 * `tile-gradient` rather than the white BookingModal uses. On a white panel the
 * form would render white-on-white.
 *
 * The shell otherwise mirrors BookingModal deliberately: same overlay, same
 * entrance, same header and close affordance, so the two popups on the site
 * behave identically.
 */
export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, subject }) => {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Projekt anfragen"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[800px] rounded-shell shadow-2xl overflow-hidden flex flex-col h-[92vh] md:h-[90vh] tile-gradient"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-6 border-b border-white/10 shrink-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-300">
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-white leading-none">
                    Projekt anfragen
                  </h3>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-white/40 mt-1">
                    {subject ?? 'Wir melden uns zurück'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Schließen"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain px-6 md:px-10 py-8 md:py-10">
              <HubSpotForm />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
