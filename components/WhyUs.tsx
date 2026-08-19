
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyUs: React.FC = () => {
  return (
    <section className="w-full flex items-center justify-center py-24 md:py-32 lg:py-40">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-14">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Label */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-12"
          >
            Unser Versprechen
          </motion.div>
          
          {/* Main Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[clamp(36px,6vw,90px)] font-black text-[#0b0f2a] tracking-tighter leading-[0.95] mb-20 md:mb-32 max-w-5xl"
          >
            Strategisches Agenturdenken trifft konsequente Umsetzung.
          </motion.h2>
          
          {/* Content Layout - Apple Style Column Grid */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-16 lg:gap-24 text-left w-full">
            {[
              { 
                content: "Wir entwickeln keine Konzepte für Präsentationen, sondern realisieren Erlebnisse. Strategie, Technik, Software und Content greifen nahtlos ineinander.",
                delay: 0.3,
                title: true
              },
              { 
                content: "Unsere Erfahrung reicht von Marken- und Unternehmenskommunikation über Events und Aktivierungen bis hin zu digitalen Formaten. Ein tiefes Zielgruppenverständnis sorgt für Relevanz.",
                delay: 0.4
              },
              { 
                content: "Unsere Lösungen sind skalierbar – vom kompakten Aktivierungsformat bis zur groß angelegten Inszenierung. Entscheidungen basieren auf Daten, nicht auf Bauchgefühl.",
                delay: 0.5
              }
            ].map((col, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: col.delay }}
                className="flex flex-col gap-6"
              >
                <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                <p className={`${col.title ? 'text-xl md:text-2xl font-bold text-slate-900' : 'text-lg md:text-xl text-slate-600 font-medium'} leading-relaxed tracking-tight`}>
                  {col.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
