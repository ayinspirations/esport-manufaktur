import React from 'react';
import { Reveal, RevealText } from './Reveal';
import { HeroGround } from './HeroGround';

interface PageHeroProps {
  /** First half of the headline. */
  title: string;
  /** Second half, set in the teal italic accent. Optional. */
  accent?: string;
  /** One line under the headline. */
  subline?: string;
  /** Small label above the headline. */
  eyebrow?: string;
  /** A photograph to open the page with. Omitted where none exists. */
  image?: string;
  imageAlt?: string;
}

/** The canvas the page continues on, and what the photograph fades out into. */
const CANVAS = '#badeda';
const CONTAINER = 'w-full max-w-[1200px] mx-auto px-6 md:px-14';

/**
 * The header every subpage opens with.
 *
 * Until now each route invented its own: the services page and the legal pages
 * started with ink type on the flat canvas, "Über uns" had a short band of the
 * hero ground with the headline underneath it, and none of them looked like
 * the homepage a visitor had just come from.
 *
 * Two variants, one shape -- a full-width band, then headline and subline:
 *
 * - Without a photograph, the band is the homepage hero's own ground and the
 *   type sits on it in white, so the page opens the way the homepage does.
 * - With one, the photograph *is* the band and nothing is laid over it. It ran
 *   at 45% behind the hero ground first, which put the ground's teal glow and
 *   diagonal grid over a photograph of actual people -- a veil, and the wrong
 *   answer twice over: the picture was unreadable and the mood was borrowed.
 *   The picture is now full strength and unobstructed for its whole height,
 *   dissolving into the canvas along its bottom edge, and the type sits in
 *   that dissolve in ink rather than on top of the image in white.
 */
export const PageHero: React.FC<PageHeroProps> = ({ title, accent, subline, eyebrow, image, imageAlt }) => {
  if (image) {
    return (
      <section className="relative w-full bg-[#badeda]">
        {/*
          Two different jobs at two widths, so two different measurements.

          On a phone the band is sized by the photograph's own proportions
          rather than by the viewport. A fixed 62vh on a 390px-wide screen is
          a portrait box holding a landscape picture, and `object-cover`
          answers that by throwing away half the width -- which is where the
          people are. At 4:3 the box is only slightly narrower than the 3:2
          frame, so the crop takes a little off each side and everyone in the
          picture stays in it.

          From md the viewport is wider than the picture is tall, the crop
          runs the other way, and a viewport-relative height is right again:
          it keeps the header in proportion to the screen instead of growing
          to 900px on a wide monitor.
        */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:h-[74vh] md:min-h-[420px] md:max-h-[860px] overflow-hidden">
          <img
            src={image}
            alt={imageAlt ?? ''}
            // Vertically this only bites from md, where the box is shorter
            // than the frame: heads sit in the upper half, and a centred crop
            // takes them off. Below md the full height is shown and the
            // position is ignored.
            className="absolute inset-0 w-full h-full object-cover object-[center_38%]"
          />

          {/* Only where it is needed: a short scrim under the navigation, so
              white chrome has something to sit on wherever the top of the
              photograph happens to be bright. It is over the bar's own height
              and gone well before the picture proper. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 md:h-40 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.22) 55%, rgba(2,6,23,0) 100%)` }}
          />

          {/* The handover to the page. The canvas colour itself, faded in over
              the bottom third, so the photograph dissolves into the section
              below instead of ending on a ruled line. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[42%] pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, rgba(186,222,218,0) 0%, rgba(186,222,218,0.55) 42%, rgba(186,222,218,0.92) 76%, ${CANVAS} 100%)`
            }}
          />
        </div>

        {/* Pulled up into the dissolve, where the ground is already canvas --
            the type reads as sitting on the page rather than over the photo. */}
        <div className={`${CONTAINER} relative z-10 -mt-[9vh] md:-mt-[11vh]`}>
          {eyebrow && (
            <Reveal duration={0.6} className="text-[#0a6f6a] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6">
              {eyebrow}
            </Reveal>
          )}

          <h1 className="text-[clamp(40px,7vw,100px)] font-black leading-[0.88] tracking-tighter uppercase text-[#0b0f2a]">
            <RevealText as="span" by="word" text={title} delay={0.05} />
            {accent && <RevealText as="span" by="word" text={accent} delay={0.18} className="text-[#0e958e] italic" />}
          </h1>

          {subline && (
            <Reveal as="p" duration={0.75} delay={0.3} className="mt-5 md:mt-7 text-[#0b0f2a]/70 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl tracking-tight text-balance">
              {subline}
            </Reveal>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      data-nav-ground="dark"
      className="relative w-full overflow-hidden bg-[#020617] flex items-end min-h-[52vh] md:min-h-[62vh] pt-32 md:pt-40 pb-14 md:pb-20"
    >
      <HeroGround />

      <div className={`${CONTAINER} relative z-10`}>
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
          <Reveal as="p" duration={0.75} delay={0.3} className="mt-5 md:mt-7 text-white/70 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl tracking-tight text-balance">
            {subline}
          </Reveal>
        )}
      </div>
    </section>
  );
};
