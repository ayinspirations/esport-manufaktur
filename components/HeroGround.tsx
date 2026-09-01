import React from 'react';

interface HeroGroundProps {
  /**
   * The Hero drives these two layers itself -- an entrance tween and a pointer
   * parallax -- so it passes refs in. Everywhere else the ground is static and
   * both are omitted.
   */
  glowRef?: React.Ref<HTMLDivElement>;
  gridRef?: React.Ref<HTMLDivElement>;
  className?: string;
  /** For masking the ground off where it has to hand over to the canvas. */
  style?: React.CSSProperties;
}

/**
 * The homepage hero's ground: dark base, one ambient teal glow, a vignette,
 * and two diagonal line patterns at different spacing.
 *
 * Extracted so the Best Cases closing tile can stand on the same ground as the
 * hero rather than approximating it with a lone blue radial. Every dimension
 * in here is a percentage, so it composes at tile scale as readily as at full
 * viewport height.
 */
export const HeroGround: React.FC<HeroGroundProps> = ({ glowRef, gridRef, className = '', style }) => (
  <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`} style={style}>
    <div className="absolute inset-0 bg-[#020617]" />

    {/* Ambient light -- large, low-opacity radial gradient, no filter:blur() (see
        note below on grid) so it never triggers a first-paint flicker on mobile
        Safari. Volumetric feel comes purely from the gradient's own soft stops. */}
    <div
      ref={glowRef}
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(circle at 20% 16%, rgba(0,129,141,0.36) 0%, rgba(0,129,141,0.17) 26%, rgba(0,129,141,0.05) 46%, transparent 64%)'
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#061226]/40 to-[#020617]" />

    {/* Diagonal line pattern, masked with a radial (bright center-right, fading
        toward the edges) intersected with a vertical fade. White-based mask stops
        on purpose: black-to-transparent gradients can render as luminance masks in
        some browsers (black ~= invisible regardless of alpha), wiping the pattern
        out instead of giving a controlled fade.

        One layer, not two. There used to be a second set of lines at twice the
        spacing in lime (rgba(132, 204, 22, 0.4)) at 25% opacity, meant to add
        depth. At that opacity over a near-black navy lime has no chroma left to
        show -- it landed as a flat warm grey, so what it actually added was a
        second, muddier grid interleaved between the teal one. */}
    <div ref={gridRef} className="absolute inset-0">
      <div
        className="absolute top-0 right-0 w-[85%] h-full opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, transparent, transparent 38px, rgba(45, 212, 191, 0.55) 38px, rgba(45, 212, 191, 0.55) 40px)',
          maskImage:
            'radial-gradient(ellipse 70% 65% at 68% 45%, white 0%, white 35%, transparent 78%), linear-gradient(to bottom, transparent 0%, white 22%, white 72%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 65% at 68% 45%, white 0%, white 35%, transparent 78%), linear-gradient(to bottom, transparent 0%, white 22%, white 72%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in'
        }}
      />
    </div>
  </div>
);

/**
 * The hero headline's teal-to-lime sweep. Shared so the Best Cases closer runs
 * the same gradient rather than a lookalike -- these are the only two places
 * on the site that carry it.
 */
export const HERO_GRADIENT_TEXT =
  'bg-gradient-to-r from-[#2dd4bf] to-[#84cc16] bg-clip-text text-transparent';
