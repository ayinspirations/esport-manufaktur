
import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface ScrollToCasesCTAProps {
  onScroll?: (id: string) => void;
}

export const ScrollToCasesCTA: React.FC<ScrollToCasesCTAProps> = ({ onScroll }) => {
  return (
    <div className="w-full px-6 md:px-14 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <motion.button
          onClick={() => onScroll?.('best-cases')}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center gap-4 bg-white border border-black/5 pl-5 pr-3.5 py-3 md:pl-6 md:pr-4 md:py-3.5 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.2)] transition-all duration-700"
        >
          <div className="flex flex-col items-start">
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.35em] text-emerald-600 mb-1">Showreel</span>
            <span className="text-sm md:text-base font-black text-[#0f172a] tracking-tighter leading-none uppercase">
              Best Cases ansehen
            </span>
          </div>

          <div className="w-8 h-8 md:w-9 md:h-9 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:bg-slate-950 transition-colors duration-500 shrink-0">
            <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};
