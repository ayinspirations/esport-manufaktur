import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Listen for message from HubSpot iframe to detect successful booking
      const handleMessage = (event: MessageEvent) => {
        // HubSpot postMessage events often contain form submission data
        try {
          if (event.data.meetingBooked || (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted')) {
            setIsSuccess(true);
          }
        } catch (e) {
          // Ignore errors from other messages
        }
      };
      window.addEventListener('message', handleMessage);
      
      // Load HubSpot script
      const script = document.createElement('script');
      script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('message', handleMessage);
        if (script.parentNode) {
          document.body.removeChild(script);
        }
      };
    } else {
      setIsSuccess(false);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6">
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
            className="relative w-full max-w-[800px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[92vh] md:h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-6 border-b border-slate-100 shrink-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-slate-900 leading-none">Termin buchen</h3>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Kostenloses Kennenlernen</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto relative bg-slate-50 min-h-0 overscroll-contain">
              {!isSuccess ? (
                <div className="w-full min-h-full flex flex-col p-2 md:p-0">
                  <div 
                    className="meetings-iframe-container w-full h-[1200px] md:h-full" 
                    data-src="https://esport-manufaktur.com/meetings/gianluca-crepaldi/kennenlernen?embed=true"
                  ></div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px]"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-8 shadow-xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-950 mb-4">
                    Vielen Dank!
                  </h2>
                  <p className="text-slate-600 text-lg max-w-md mx-auto mb-10 font-medium">
                    Deine Terminanfrage war erfolgreich. Wir haben dir eine Bestätigung per E-Mail gesendet und freuen uns auf unser Gespräch!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-10 py-5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-[0.25em] rounded-full transition-all shadow-lg"
                  >
                    Schließen
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
