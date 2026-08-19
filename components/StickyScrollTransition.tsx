import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WhyUs } from './WhyUs';
import { UseCases } from './UseCases';

interface StickyScrollTransitionProps {
  onNavigate?: (page: 'home' | 'services') => void;
}

export const StickyScrollTransition: React.FC<StickyScrollTransitionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Wir erhöhen die Scroll-Distanz auf 300vh, um den Sektionen mehr "Sitzfleisch" zu geben
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Timeline-Mapping für WhyUs:
  // Startet sofort bei 1 (kein Fade-In mehr), bleibt bis 0.45 voll sichtbar, blendet dann aus.
  const whyUsOpacity = useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 1, 0]);
  const whyUsScale = useTransform(scrollYProgress, [0.45, 0.55], [1, 0.95]);
  const whyUsY = useTransform(scrollYProgress, [0.45, 0.55], [0, -50]);

  // Timeline-Mapping für UseCases:
  const useCasesOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.9, 1], [0, 1, 1, 0]);
  const useCasesY = useTransform(scrollYProgress, [0.45, 0.6], [50, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-[#badeda]">
      {/* Der Sticky-Container füllt den gesamten Viewport aus */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-14">
        
        {/* WhyUs Section */}
        <motion.div 
          style={{ opacity: whyUsOpacity, scale: whyUsScale, y: whyUsY }}
          className="absolute inset-0 flex items-center justify-center w-full h-full"
        >
          <div className="w-full max-w-7xl">
            <WhyUs />
          </div>
        </motion.div>

        {/* UseCases Section */}
        <motion.div 
          style={{ opacity: useCasesOpacity, y: useCasesY }}
          className="absolute inset-0 flex items-center justify-center w-full h-full"
        >
          <div className="w-full max-w-7xl">
            <UseCases />
          </div>
        </motion.div>

      </div>
    </div>
  );
};