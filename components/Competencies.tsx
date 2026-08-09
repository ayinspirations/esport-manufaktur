
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  video?: string;
  page: string;
  onNavigate?: (page: any) => void;
}

const titleFontSize = "text-[clamp(20px,5vw,28px)] lg:text-[clamp(17px,1.4vw,22px)]";

const ServiceCard: React.FC<CardProps> = ({ title, description, image, imageAlt, video, page, onNavigate }) => {
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => onNavigate?.(page)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onNavigate?.(page)}
      className="group relative w-full h-full select-none rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer"
    >
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={image}
          aria-label={imageAlt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/25 to-transparent" />

      <div className="absolute bottom-8 left-7 right-20 lg:bottom-10 lg:left-8 lg:right-24">
        <h3 className={`${titleFontSize} font-black text-white tracking-tight uppercase leading-[1.1] mb-2.5`}>
          {title}
        </h3>
        <p className="text-white/70 text-sm lg:text-[15px] font-medium leading-snug max-w-[38ch]">
          {description}
        </p>
      </div>

      {/* Hover arrow -- bottom right, animates on hover and leads to the service subpage */}
      <div className="absolute bottom-7 right-7 lg:bottom-9 lg:right-8 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:scale-110">
        <ArrowUpRight className="w-5 h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-950" />
      </div>
    </div>
  );
};

const data: (Omit<CardProps, 'onNavigate'>)[] = [
  {
    title: "Strategie & Konzeption",
    image: "/Strategie.jpg",
    imageAlt: "Strategie-Workshop für eSport Marketing bei eSport Manufaktur",
    description: "Von der Zielgruppenanalyse bis zur kreativen Idee — maßgeschneiderte eSport- und Gaming-Strategien für eure Marke.",
    page: "strategie-konzeption"
  },
  {
    title: "Content & Streaming",
    video: "/videos/BestCase4.mov",
    image: "https://images.unsplash.com/photo-1598550874175-4d0fe4a2c90b?auto=format&fit=crop&q=80&w=800",
    imageAlt: "Professionelle Streaming-Produktion für Gaming-Content bei eSport Manufaktur",
    description: "Professionelle Live-Produktionen und Streaming-Formate, die eure Marke authentisch im Gaming-Umfeld positionieren.",
    page: "content-streaming"
  },
  {
    title: "Messen & Events",
    video: "/videos/Eventtechnik.mov",
    image: "/images/competencies/eventtechnik.jpg",
    imageAlt: "Eventtechnik-Setup für Gaming-Messen und Live-Events bei eSport Manufaktur",
    description: "Gaming-Aktivierungen auf Messen und Events — von der Standkonzeption bis zur Umsetzung vor Ort.",
    page: "messen-events"
  },
  {
    title: "Digitale Lösungen",
    video: "/videos/Gamification.MOV",
    image: "/Gamification.jpg",
    imageAlt: "Gamification-Plattform für digitale Markenaktivierung bei eSport Manufaktur",
    description: "Individuelle digitale Tools und Gamification-Lösungen für nachhaltige Zielgruppenbindung.",
    page: "digitale-loesungen"
  }
];

interface CompetenciesProps {
  onNavigate?: (page: any) => void;
}

export const Competencies: React.FC<CompetenciesProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex items-center justify-center" id="competencies">
      <section className="w-full py-16 md:py-24 lg:py-28 bg-transparent relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-24 lg:mb-32"
          >
            <div className="max-w-3xl">
              <h2 className="text-[clamp(40px,7vw,100px)] font-black text-slate-900 leading-[0.85] tracking-tighter uppercase">
                Unsere <br /> <span className="text-slate-900/40 italic">Services.</span>
              </h2>
              <p className="text-slate-600 font-bold text-base md:text-lg mt-6 max-w-xl leading-tight tracking-tight">
                Wir realisieren Erlebnisse. Strategie, Technik, Software und Content greifen nahtlos ineinander.
              </p>
            </div>
          </motion.div>

          {/* 2x2 grid on desktop, single stacked column on mobile/tablet */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 xl:gap-10">
            {data.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:min-h-[420px]"
              >
                <ServiceCard {...item} onNavigate={onNavigate} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
