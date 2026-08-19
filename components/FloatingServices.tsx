import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Zap, Target, Users } from 'lucide-react';

const ServiceCard = ({ title, content, icon: Icon, delay }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay } }}
      className="glass rounded-shell p-10 border border-[#badeda] flex flex-col justify-between aspect-[1/1.4] relative group cursor-pointer bg-white/95 shadow-lg overflow-hidden shrink-0"
    >
      <div style={{ transform: "translateZ(30px)" }} className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-36 h-36 text-emerald-500" />
      </div>
      <div style={{ transform: "translateZ(20px)" }}>
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-emerald-500/20">
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-[clamp(18px,2.4vw,32px)] font-black mb-6 tracking-tighter text-[#0b0f2a] leading-tight">{title}</h3>
        <p className="text-slate-500 leading-snug text-[clamp(12px,1.2vw,18px)] font-medium tracking-tight">{content}</p>
      </div>
      <div style={{ transform: "translateZ(25px)" }}>
        <div className="flex items-center justify-between text-emerald-600 font-bold tracking-tighter text-sm">
          <span>Anfrage senden</span>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface FloatingServicesProps {
  onNavigate: (page: 'home' | 'services') => void;
}

export const FloatingServices: React.FC<FloatingServicesProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <section className="w-full py-24 lg:py-40 glass rounded-shell border border-[#badeda] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden bg-white/40 relative">
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <div className="flex flex-row items-end justify-between mb-20 gap-10">
            <div className="max-w-3xl">
              <div className="text-emerald-600 font-black tracking-[0.4em] uppercase text-[clamp(9px,1vw,12px)] mb-4">Exzellenz</div>
              <h2 className="text-[clamp(28px,6vw,96px)] font-black leading-none tracking-tighter text-[#0b0f2a]">Services.</h2>
            </div>
            <a onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-base cursor-pointer shrink-0">Alle Leistungen</a>
          </div>
          <div className="flex lg:grid lg:grid-cols-3 gap-10 overflow-x-auto lg:overflow-visible pb-10 lg:pb-0 no-scrollbar">
            <ServiceCard title="Recruiting" content="Interaktive Formate für spielerisches Recruiting." icon={Target} delay={0} />
            <ServiceCard title="Community" content="Plattformen für maximale Kundenloyalität." icon={Users} delay={0.2} />
            <ServiceCard title="Activation" content="Marken erlebbar machen und Leads generieren." icon={Zap} delay={0.4} />
          </div>
        </div>
      </section>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};
