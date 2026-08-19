
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Rocket, Globe, GraduationCap, Building2, Users2, ShoppingBag, Radio, Trophy } from 'lucide-react';

const cases = [
  { name: "Recruiting", icon: Search },
  { name: "Branding", icon: Rocket },
  { name: "Event", icon: Globe },
  { name: "Sponsoring", icon: Trophy },
  { name: "Community", icon: Users2 },
  { name: "POS", icon: ShoppingBag },
  { name: "Education", icon: GraduationCap },
  { name: "Verbände", icon: Building2 },
  { name: "Sport", icon: Radio },
];

export const UseCases: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center px-0 md:px-4">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6" id="use-cases">
          <div className="text-left mb-6 md:mb-8 px-2 md:px-0">
            <div className="text-emerald-700 font-black tracking-[0.4em] uppercase text-[10px] mb-2.5">
              Vielseitige Expertise
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[54px] font-black mb-3.5 tracking-tighter text-[#0b0f2a] leading-[1.05]">
              Branchen & Use Cases.
            </h2>
            <p className="text-slate-600 font-bold max-w-2xl text-base md:text-lg tracking-tight leading-snug">
              Wir aktivieren Zielgruppen überall dort, <br className="hidden md:block" /> 
              wo Interaktion den Unterschied macht.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-3 md:gap-5 justify-center justify-items-center">
            {cases.map((item, i) => (
              <motion.div
                key={i} 
                whileHover={{ y: -6, backgroundColor: "#fff", boxShadow: "0 15px 30px -10px rgba(0,0,0,0.05)" }}
                className="w-full max-w-[160px] md:max-w-none bg-white/40 backdrop-blur-sm p-3.5 sm:p-5 rounded-card md:rounded-surface flex flex-col items-center justify-center text-center gap-2.5 md:gap-3 border border-white/20 transition-all cursor-default group shadow-sm"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <item.icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-500 group-hover:text-slate-900 transition-colors">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
      </section>
    </div>
  );
};
