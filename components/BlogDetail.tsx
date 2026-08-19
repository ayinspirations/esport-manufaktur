
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getBlogPost } from './blogPosts';

interface BlogDetailProps {
  slug: string;
  onBack: () => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ slug, onBack }) => {
  const post = getBlogPost(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (!post) return;

    const previousTitle = document.title;
    document.title = `${post.title} | eSport Manufaktur`;

    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content') ?? '';
    metaDescription?.setAttribute('content', post.metaDescription);

    return () => {
      document.title = previousTitle;
      metaDescription?.setAttribute('content', previousDescription);
    };
  }, [post]);

  if (!post) {
    return (
      <div className="pt-32 md:pt-48 pb-24 md:pb-40 px-6 md:px-14 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#0b0f2a] tracking-tighter mb-8">Artikel nicht gefunden.</h1>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-emerald-700 font-black uppercase tracking-widest text-sm hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-48 pb-24 md:pb-40 px-6 md:px-14">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-emerald-700 font-black uppercase tracking-widest text-[11px] mb-10 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Zurück zum Blog
          </button>

          <div className="flex items-center gap-2.5 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>{post.readTime} Lesezeit</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95] text-[#0b0f2a]">
            {post.title}
          </h1>

          <p className="text-slate-600 text-xl md:text-2xl font-bold leading-tight tracking-tight mb-12 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="relative w-full aspect-[16/9] rounded-shell overflow-hidden shadow-2xl mb-16">
            <img src={post.image} alt={post.imageAlt} className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div className="space-y-14 text-slate-700 font-medium leading-relaxed text-base md:text-lg">
            <p className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
              {post.intro}
            </p>

            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl md:text-2xl font-black text-[#0b0f2a] tracking-tight mb-5">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-slate-200">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-emerald-700 font-black uppercase tracking-widest text-sm hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Zurück zum Blog
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
