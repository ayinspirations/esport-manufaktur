
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface BeautifulAppearProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const BeautifulAppear: React.FC<BeautifulAppearProps> = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block mr-[0.25em]">
      <motion.span style={{ opacity }} className="text-slate-900">
        {children}
      </motion.span>
    </span>
  );
};

export const ScrollTextSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.2"]
  });

  const { scrollXProgress } = useScroll({
    container: scrollContainerRef
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const headline = "Wir entwickeln Markenaktivierungen für Unternehmen, die mehr wollen als bloße Aufmerksamkeit.";
  const words = headline.split(" ");

  return (
    <div className="w-full flex items-center justify-center p-0 md:p-4">
      <section 
        ref={sectionRef}
        className="w-full min-h-[140vh] md:min-h-[160vh] bg-white rounded-none md:rounded-[3.2rem] border-y md:border border-[#d1dbd2] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden relative flex flex-col py-12 md:py-20 lg:py-24 px-0 md:px-16 lg:px-24"
      >
        
        {/* Top Content: Apple-style centered focus */}
        <div className="flex flex-col items-center text-center w-full mb-12 md:mb-20 lg:mb-24 px-6 md:px-0">
          
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[clamp(32px,5vw,84px)] font-black leading-[1.05] tracking-tighter mb-12 flex flex-wrap justify-center">
              {words.map((word, i) => {
                const start = i / words.length * 0.5;
                const end = (i + 1) / words.length * 0.5;
                return (
                  <Word key={i} progress={smoothProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </h2>
            
            <BeautifulAppear delay={0.4}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mt-8">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-1">Marken</span>
                  <span className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight">Erlebbar machen</span>
                </div>
                <div className="hidden md:block w-px h-10 bg-slate-200" />
                <div className="flex flex-col items-center">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-1">Zielgruppen</span>
                  <span className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight">Aktivieren</span>
                </div>
                <div className="hidden md:block w-px h-10 bg-slate-200" />
                <div className="flex flex-col items-center">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-1">Ergebnisse</span>
                  <span className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight">Messbar gestalten</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-400 font-medium mt-12 tracking-wide uppercase">
                Durch Gamification, Technik und Software.
              </p>
            </BeautifulAppear>
          </div>
        </div>

        {/* Bottom Cards: High-impact bento-style layout */}
        <div className="w-full px-0 md:px-0 mt-auto relative overflow-visible">
          <div 
            ref={scrollContainerRef}
            className="flex lg:grid lg:grid-cols-3 gap-6 md:gap-10 items-stretch overflow-x-auto lg:overflow-x-hidden pb-12 md:pb-0 no-scrollbar snap-x snap-mandatory px-6 md:px-0 touch-auto overscroll-x-contain"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory'
            }}
          >
            {[
              { color: 'bg-slate-950', text: 'white', title: 'Strategie.', sub: 'Design', height: 'min-h-[450px] lg:h-[600px]', content: 'Markenidentität klar definiert.', img: '/Strategie.jpg' },
              { color: 'bg-slate-900', text: 'white', title: 'Wachstum.', sub: 'Growth', height: 'min-h-[450px] lg:h-[600px]', video: '/videos/SPOBIS Messe_LOOP_VIDEO_03 2.mov', img: '/Wachstum.jpg' },
              { color: 'bg-slate-100', text: 'white', title: 'Event.', sub: 'Live', height: 'min-h-[450px] lg:h-[600px]', img: '/images/status-quo/rewe-event.jpg' },
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex-shrink-0 w-[85vw] md:w-[400px] lg:w-full ${card.height} ${card.color} rounded-[3rem] p-10 md:p-12 flex flex-col justify-between relative overflow-hidden border border-black/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group snap-center`}
              >
                {card.video ? (
                  <video
                    src={card.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover brightness-75 transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : card.img && (
                  <img 
                    src={card.img} 
                    className="absolute inset-0 w-full h-full object-cover brightness-75 transition-transform duration-1000 group-hover:scale-105" 
                  />
                )}
                {(card.img || card.video) && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />}
                
                <div className="relative z-10">
                  <div className={`px-3 py-1.5 w-fit rounded-full border border-black/5 bg-white/10 backdrop-blur-md text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-${card.text}/70`}>{card.sub}</div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mb-4 shadow-lg shadow-emerald-500/50" />
                  <h3 className={`text-${card.text} text-[clamp(22px,2.8vh,32px)] font-black tracking-tighter mb-2 md:mb-4 leading-[1]`}>{card.title}</h3>
                  {card.content && <p className={`text-${card.text}/50 text-[10px] md:text-sm font-medium tracking-tight line-clamp-2`}>{card.content}</p>}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Horizontal Scroll Indicator for Mobile */}
          <div className="lg:hidden flex justify-center mt-8 mb-4 px-10">
            <div className="h-[2px] w-32 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500 w-1/3"
                style={{ 
                  scaleX: useTransform(scrollXProgress, [0, 1], [1, 3]), 
                  transformOrigin: "0% 50%" 
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};
