
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const BestCases: React.FC<{ onScroll?: (id: string) => void; onNavigate?: (page: any) => void }> = ({ onScroll, onNavigate }) => {
  return (
    <section id="best-cases" className="w-full bg-[#d1dbd2] px-6 md:px-14 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1440px] mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(40px,7vw,100px)] font-black text-slate-900 leading-[0.85] tracking-tighter uppercase">
              Best <br /> <span className="text-slate-900/40 italic">Cases.</span>
            </h2>
            <p className="text-slate-600 font-bold text-base md:text-lg mt-6 max-w-xl leading-tight tracking-tight">
              Bewegtbilder für echte Erlebnisse. Ausgewählte Projekte in voller Dynamik.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Row 1 - T-Systems and Hagebau (Side by Side) */}
          <div className="col-span-1 lg:col-span-6 h-[400px] lg:h-[500px]">
            <motion.div 
              className="h-full w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative group overflow-hidden rounded-[2.5rem] bg-slate-900 h-full w-full">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                >
                  <source src="/videos/copy_F69586CF-8AA3-4705-94FD-D75DC73A64F7.mov" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      Employer Branding
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white text-[clamp(24px,3.2vw,38px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      T-Systems
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-span-1 lg:col-span-6 h-[400px] lg:h-[500px]">
            <motion.div 
              className="h-full w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative group overflow-hidden rounded-[2.5rem] bg-slate-900 h-full w-full">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                >
                  <source src="/videos/copy_5444A7DC-9BDF-4DF7-927D-C5A1C8DC7E39.mov" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      Recruiting
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white text-[clamp(24px,3.2vw,38px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      Hagebau Bolay
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2 - Full Width Gaming Arena */}
          <div className="col-span-1 lg:col-span-12 h-[400px] md:h-[600px] lg:h-[500px]">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative group overflow-hidden rounded-[2.5rem] bg-slate-900 h-full w-full"
            >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                >
                  <source src="/videos/copy_C23D97A5-2B74-44A6-A5E0-66CEB8290725.mov" type="video/mp4" />
                </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    Event Production
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-[clamp(32px,5vw,64px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                    GAMING IN BAYERN
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 3 - Bayern Zockt and CTA */}
          <div className="col-span-1 lg:col-span-8 h-[400px] lg:h-[500px]">
            <motion.div 
              className="h-full w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative group overflow-hidden rounded-[2.5rem] bg-slate-900 h-full w-full">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                >
                  <source src="/videos/copy_41103C48-CF53-4B8E-A316-5051B2CA42CD.mov" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      eSport Projekt
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white text-[clamp(24px,3.2vw,38px)] font-black leading-[0.9] tracking-tighter uppercase mb-4 drop-shadow-2xl">
                      Bayern Zockt
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-span-1 lg:col-span-4 h-[400px] lg:h-[500px]">
            <motion.button
              onClick={() => onScroll?.('contact-section')}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative group overflow-hidden rounded-[2.5rem] bg-[#020617] cursor-pointer flex flex-col justify-center items-center p-8 md:p-12 shadow-2xl text-center h-full w-full border border-white/5"
            >
              <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, #1e40af 0%, transparent 70%)',
                }}
              />
              
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-white text-[clamp(28px,3.5vw,44px)] font-black leading-[1.1] tracking-tighter uppercase">
                  TAKE YOUR <br />
                  PROJECT <br />
                  TO THE <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                    NEXT LEVEL.
                  </span>
                </h3>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-6 py-3 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-2 group-hover:bg-emerald-400 transition-colors duration-300"
                >
                  Get Started
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
