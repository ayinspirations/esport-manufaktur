
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { blogPosts, BlogPost } from './blogPosts';
import { SECTION_PADDING } from './spacing';
import { Reveal, RevealText } from './Reveal';
import { DUR } from './motion';

interface BlogSectionProps {
  onOpenPost: (slug: string) => void;
}

const BlogCard: React.FC<{ post: BlogPost; onOpenPost: (slug: string) => void; className?: string }> = ({ post, onOpenPost, className = '' }) => (
  <button
    onClick={() => onOpenPost(post.slug)}
    className={`group text-left flex flex-col rounded-surface overflow-hidden bg-white/[0.03] border border-white/10 hover:border-emerald-400/40 transition-colors duration-500 ${className}`}
  >
    <div className="relative aspect-[4/3] overflow-hidden shrink-0">
      <img
        src={post.image}
        alt={post.imageAlt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
    </div>

    <div className="flex flex-col flex-1 p-6">
      <div className="flex items-center gap-2.5 text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">
        <span>{post.date}</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>{post.readTime}</span>
      </div>
      <h3 className="text-white text-lg font-black tracking-tight leading-snug mb-2.5 group-hover:text-emerald-300 transition-colors">
        {post.title}
      </h3>
      <p className="text-white/50 text-sm font-medium leading-snug line-clamp-2 mb-5">
        {post.excerpt}
      </p>
      <div className="mt-auto flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest">
        Weiterlesen
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </div>
  </button>
);

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenPost }) => {
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
    <div className={`w-full flex items-center justify-center px-4 sm:px-6 md:px-14 ${SECTION_PADDING}`} id="blog">
      {/* Same treatment as the Purpose panel: the dark shell fades in as its
          own tile, then its contents build on top of it. */}
      <Reveal
        as="section"
        y={28}
        duration={DUR.slow}
        data-nav-ground="dark"
        className="relative w-full max-w-[1440px] mx-auto rounded-shell md:rounded-shell overflow-hidden shadow-2xl bg-[#020617] border border-white/10"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#020617]" />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 20% 16%, rgba(0,129,141,0.42) 0%, rgba(0,129,141,0.20) 26%, rgba(0,129,141,0.06) 46%, transparent 64%)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#061226]/40 to-[#020617]" />
          <div
            className="absolute top-0 right-0 w-[75%] h-full opacity-60"
            style={{
              backgroundImage: `repeating-linear-gradient(115deg, transparent, transparent 38px, rgba(20, 184, 166, 0.6) 38px, rgba(20, 184, 166, 0.6) 40px)`,
              maskImage: 'linear-gradient(to bottom, transparent 0%, white 22%, white 72%, transparent 100%), linear-gradient(to left, white 0%, white 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 22%, white 72%, transparent 100%), linear-gradient(to left, white 0%, white 60%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }}
          />
        </div>

        <div className="relative z-10 py-20 md:py-28 px-6 md:px-14 lg:px-20">
          <div className="mb-16 md:mb-20">
            <Reveal delay={0.12} className="text-emerald-400 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6">
              Insights
            </Reveal>
            <h2 className="text-[clamp(38px,6.5vw,90px)] font-black text-white leading-[0.9] tracking-tighter uppercase">
              <RevealText as="span" by="word" text="Blog" delay={0.18} />
              <RevealText as="span" by="word" text="& Wissen." delay={0.3} className="text-[#0e958e] italic" />
            </h2>
            <Reveal delay={0.42} as="p" className="text-white/60 font-bold text-base md:text-lg mt-6 max-w-xl leading-tight tracking-tight">
              Praxiswissen zu Gaming, eSport-Events und digitaler Markenaktivierung.
            </Reveal>
          </div>

          {/* Desktop / tablet: multi-column grid, unchanged */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <BlogCard post={post} onOpenPost={onOpenPost} className="w-full h-full" />
              </motion.div>
            ))}
          </div>

          {/* Mobile: centered horizontal swipe carousel, with a toggle to show
              every post stacked in a single column instead. */}
          <div className="sm:hidden">
            {!showAllMobile ? (
              <>
                <style>{`.blog-carousel-track::-webkit-scrollbar{display:none}`}</style>
                <div
                  className="blog-carousel-track flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-6 px-[10%]"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {blogPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} onOpenPost={onOpenPost} className="shrink-0 snap-center w-[80%]" />
                  ))}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {blogPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} onOpenPost={onOpenPost} />
                ))}
              </div>
            )}

            <button
              onClick={() => setShowAllMobile((v) => !v)}
              className="mt-8 w-full flex items-center justify-center gap-2 rounded-full border border-white/20 py-3.5 text-white text-xs font-black uppercase tracking-widest transition-colors duration-300 hover:bg-emerald-400 hover:border-emerald-400 hover:text-slate-950"
            >
              {showAllMobile ? (
                <>Weniger anzeigen <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Alle Artikel anzeigen <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
