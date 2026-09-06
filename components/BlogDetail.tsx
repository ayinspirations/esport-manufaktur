
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getBlogPost } from './blogPosts';
import type { BlogBlock } from './blogPosts';
import { ExpandingCTA } from './ui/expanding-cta';

interface BlogDetailProps {
  slug: string;
  onBack: () => void;
  onOpenBooking?: () => void;
  onOpenContact?: (subject?: string) => void;
}

/**
 * Ein Baustein im Artikeltext.
 *
 * Bis eben kannte der Artikel nur den Absatz. Ein Text, der aufzaehlt --
 * welche Mechaniken es gibt, welche Schritte eine Journey hat --, wurde
 * dadurch zu einem Absatz voller Kommas, in dem die einzelnen Punkte
 * verschwinden. Vier Formen reichen: Absatz, Merksatz, Aufzaehlung, Folge.
 */
const Block: React.FC<{ block: BlogBlock }> = ({ block }) => {
  switch (block.type) {
    case 'lead':
      // Eine Zeile, die allein steht. Kein eigener Kasten, nur Gewicht und
      // Luft -- sie ist Teil des Textes, nicht ein Einschub daneben.
      return (
        <p className="my-7 text-lg md:text-xl font-black text-[#0b0f2a] leading-snug tracking-tight">
          {block.text}
        </p>
      );
    case 'quote':
      return (
        <p className="my-5 pl-5 border-l-2 border-[#0e958e]/50 text-[#0b0f2a] font-bold italic">
          {block.text}
        </p>
      );
    case 'list':
      return (
        <ul className="mb-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0e958e]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'steps':
      return (
        <ol className="mb-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5">
              <span className="mt-0.5 shrink-0 text-[#0a6f6a] font-black text-sm tabular-nums w-5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    default:
      return <p className="mb-4">{block.text}</p>;
  }
};

export const BlogDetail: React.FC<BlogDetailProps> = ({ slug, onBack, onOpenBooking, onOpenContact }) => {
  const post = getBlogPost(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (!post) return;

    const previousTitle = document.title;
    // metaTitle, wo er gepflegt ist: die Ueberschrift im Artikel darf laenger
    // und freier sein als die Zeile, die in einer Trefferliste steht.
    document.title = `${post.metaTitle ?? post.title} | GG Manufaktur`;

    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content') ?? '';
    metaDescription?.setAttribute('content', post.metaDescription);

    // Ein Artikel, der unter zwei Adressen erreichbar ist, braucht eine, die
    // als die richtige gilt -- sonst teilen sich beide seine Sichtbarkeit.
    const canonical = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute('href') ?? '';
    canonical?.setAttribute('href', `https://esport-manufaktur.de/blog/${post.slug}`);

    return () => {
      document.title = previousTitle;
      metaDescription?.setAttribute('content', previousDescription);
      canonical?.setAttribute('href', previousCanonical);
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
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
            <img src={post.image} alt={post.imageAlt} decoding="async" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" />
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
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}
          </div>

          {post.cta && (
            <div className="mt-16 md:mt-20 rounded-shell tile-gradient text-white p-8 sm:p-10 md:p-14">
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight mb-5 text-balance">
                {post.cta.heading}
              </h2>
              {post.cta.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-white/60 text-base md:text-lg font-medium leading-relaxed mb-4 max-w-2xl">
                  {paragraph}
                </p>
              ))}
              <div className="mt-8">
                <ExpandingCTA
                  label={post.cta.label}
                  onBooking={() => onOpenBooking?.()}
                  onContact={() => onOpenContact?.(post.cta!.subject)}
                />
              </div>
            </div>
          )}

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
