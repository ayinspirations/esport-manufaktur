import React from 'react';
import { Reveal, RevealText } from './Reveal';
import { HeroGround } from './HeroGround';

interface PageHeroProps {
  /** First half of the headline, set in white. */
  title: string;
  /** Second half, set in the teal italic accent. Optional. */
  accent?: string;
  /** One line under the headline. */
  subline?: string;
  /** Small label above the headline. */
  eyebrow?: string;
  /** Photograph behind the ground. Omitted where none exists. */
  image?: string;
  imageAlt?: string;
}

/**
 * The header every subpage now opens with.
 *
 * Until now each route invented its own: the services page and the legal pages
 * started with ink type on the flat canvas, "Über uns" had a short band of the
 * hero ground with the headline underneath it, and none of them looked like
 * the homepage a visitor had just come from. This is that homepage hero at
 * page-header height -- the same dark ground, the same gradient accent, the
 * same white type -- so arriving on any route reads as the same site.
 *
 * `image` layers a photograph over the ground, dimmed enough that the headline
 * keeps its contrast. Without one the ground stands on its own, exactly as it
 * does on the homepage.
 */
export const PageHero: React.FC<PageHeroProps> = ({ title, accent, subline, eyebrow, image, imageAlt }) => (
  <section
    data-nav-ground="dark"
    className="relative w-full overflow-hidden bg-[#020617] flex items-end min-h-[52vh] md:min-h-[62vh] pt-32 md:pt-40 pb-14 md:pb-20"
  >
    <HeroGround />

    {image && (
      <>
        <img
          src={image}
          alt={imageAlt ?? ''}
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        {/* Two passes, not one flat scrim: the vertical gradient keeps the
            bottom -- where the type sits -- dark enough to read on, the flat
            layer holds the rest of the photograph back from competing with it. */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-[#020617]/30" />
      </>
    )}

    <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-14">
      {eyebrow && (
        <Reveal duration={0.6} className="text-[#2dd4bf] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-5 md:mb-7">
          {eyebrow}
        </Reveal>
      )}

      <h1 className="text-[clamp(40px,7vw,100px)] font-black leading-[0.88] tracking-tighter uppercase text-white">
        <RevealText as="span" by="word" text={title} delay={0.05} />
        {accent && <RevealText as="span" by="word" text={accent} delay={0.18} className="text-[#2dd4bf] italic" />}
      </h1>

      {subline && (
        <Reveal as="p" duration={0.75} delay={0.3} className="mt-5 md:mt-7 text-white/70 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl tracking-tight">
          {subline}
        </Reveal>
      )}
    </div>
  </section>
);
