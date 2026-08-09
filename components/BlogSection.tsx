
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { blogPosts } from './blogPosts';

interface BlogSectionProps {
  onOpenPost: (slug: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenPost }) => {
  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-14 py-16 md:py-24" id="blog">
      <section className="relative w-full max-w-[1440px] mx-auto rounded-[3rem] md:rounded-[3.2rem] overflow-hidden shadow-2xl bg-[#020617] border border-white/10">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-20"
          >
            <div className="text-emerald-400 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6">
              Insights
            </div>
            <h2 className="text-[clamp(38px,6.5vw,90px)] font-black text-white leading-[0.9] tracking-tighter uppercase">
              Blog <br /> <span className="text-white/40 italic">&amp; Wissen.</span>
            </h2>
            <p className="text-white/60 font-bold text-base md:text-lg mt-6 max-w-xl leading-tight tracking-tight">
              Praxiswissen zu Gaming, eSport-Events und digitaler Markenaktivierung.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.slug}
                onClick={() => onOpenPost(post.slug)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group text-left flex flex-col rounded-[2rem] overflow-hidden bg-white/[0.03] border border-white/10 hover:border-emerald-400/40 transition-colors duration-500"
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
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
