import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Instagram, Linkedin, Youtube, Mail, Share2 } from 'lucide-react';
import { HERO_GROUP_DELAY, HERO_GROUP_DURATION, HERO_REVEAL_EASE } from '../heroIntro';
import { EASE_REVEAL, SPRING_SHELL } from '../motion';

interface SocialStackLink {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

// Same URLs as components/Footer.tsx -- kept in sync manually, not imported,
// since Footer doesn't export them as a shared constant.
//
// Der letzte Eintrag ist kein Profil, sondern der direkte Weg: ein mailto, das
// das Mailprogramm des Besuchers mit unserer Adresse oeffnet. Er steht am Ende
// der Reihe, hinter einem Trenner -- die Stelle fuer den Weg, den nimmt, wer
// die Profile schon hinter sich hat.
const SOCIAL_LINKS: SocialStackLink[] = [
  { href: 'https://www.instagram.com/esport.manufaktur', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.linkedin.com/company/esport-manufaktur-gmbh/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://www.youtube.com/@eSport-Manufaktur', label: 'YouTube', Icon: Youtube },
  { href: 'mailto:info@esport-manufaktur.com', label: 'E-Mail schreiben', Icon: Mail }
];

// Same frosted-glass recipe as the Navbar's resting desktop pill
// (components/Navbar.tsx) -- background/blur/saturate copied 1:1 so the
// widget reads as the same material, not an approximation.
const GLASSY_CLASS =
  'bg-white/[0.03] backdrop-blur-lg backdrop-saturate-[1.2] border-transparent shadow-[0_0_28px_rgba(52,211,153,0)]';
const SOLID_CLASS =
  'tile-gradient border-white/10 shadow-[0_0_28px_rgba(52,211,153,0.35)] hover:shadow-[0_0_50px_rgba(52,211,153,0.3)]';

/** Derselbe Wechsel wie in der CTA-Pille -- ein Bauteil, eine Bewegung. */
const SWAP = { duration: 0.26, ease: EASE_REVEAL } as const;

/**
 * Hinaus geht es schneller als herein: der abtretende Inhalt ist im Weg,
 * sobald die Schale faehrt -- man soll ihn nicht noch lesen koennen, waehrend
 * daneben schon der neue steht.
 */
const SWAP_OUT = { duration: 0.14, ease: EASE_REVEAL } as const;

const WIDGET_SIZE = 56; // px, matches h-14/w-14
const DRAG_THRESHOLD = 10; // px of movement before a touch counts as a drag, not a tap

export const SocialStack: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dragPos, setDragPos] = useState<{ left: number; top: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, moved: false, startX: 0, startY: 0, originLeft: 0, originTop: 0 });
  const justDraggedRef = useRef(false);

  // Both hover (desktop) and click/tap (mobile, and desktop pin) drive the
  // same boolean -- no CSS :hover is used, so there's no "stuck open" state
  // from mobile's sticky-hover simulation and no specificity race between a
  // group-hover utility and a plain one restarting the transition. It also
  // gates the glass -> solid look: glassy at rest, always, on both web and
  // mobile, until the user actually interacts.
  const effectiveOpen = isOpen || isHovered;

  // Auf dem Telefon oeffnet der Tipp, und nichts schloss wieder: kein Zeiger,
  // der weggeht, kein Klick daneben, der zaehlt. Der aufgeklappte Knopf blieb
  // ueber der ganzen Seite stehen, bis man ihn selbst wieder traf.
  //
  // Beides zaehlt jetzt -- ein Tipp irgendwo sonst und jede Scrollbewegung.
  // Wer scrollt, liest weiter; die Auswahl ist dann erledigt.
  useEffect(() => {
    if (!isOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onScroll = () => setIsOpen(false);
    document.addEventListener('pointerdown', onPointer);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isOpen]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'touch' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    dragState.current = {
      dragging: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      originLeft: dragPos ? dragPos.left : rect.left,
      originTop: dragPos ? dragPos.top : rect.top
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const state = dragState.current;
    if (!state.dragging) return;
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    if (!state.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    state.moved = true;

    const maxLeft = window.innerWidth - WIDGET_SIZE;
    const maxTop = window.innerHeight - WIDGET_SIZE;
    setDragPos({
      left: Math.min(Math.max(state.originLeft + dx, 0), maxLeft),
      top: Math.min(Math.max(state.originTop + dy, 0), maxTop)
    });
  };

  const endDrag = () => {
    const state = dragState.current;
    if (state.dragging && state.moved) justDraggedRef.current = true;
    state.dragging = false;
  };

  // Capture-phase guard: if the gesture that just ended was a drag, swallow
  // the click it produces so it neither toggles the stack nor navigates a
  // freshly-revealed link.
  const handleClickCapture = (e: React.MouseEvent) => {
    if (justDraggedRef.current) {
      justDraggedRef.current = false;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Pointer (not mouse) events, gated to real mice: touch devices fire a
  // synthetic "enter" on tap but never a matching "leave" until something
  // else is touched, which permanently pinned isHovered (and therefore
  // effectiveOpen) true after the first tap and made the toggle button
  // impossible to close again on mobile.
  //
  // The fanned-out icons sit up to 192px above the 56px trigger button via
  // a CSS transform, which doesn't grow the container's own hit-test box --
  // there are real gaps between the button and each icon with no element
  // underneath the cursor. Moving the mouse from the button toward an icon
  // crosses one of those gaps, which used to fire pointerleave instantly
  // and snap the stack shut before it could be reached. A short grace period
  // on leave (cancelled by the next enter) absorbs that transit.
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    setIsHovered(true);
  };
  // Kein pointerleave, sondern die tatsaechliche Position des Zeigers -- wie
  // bei der CTA-Pille. Verschwindet das Zeichen unter ihm, meldet der Browser
  // einen Austritt, den niemand gemacht hat, und mit leerem relatedTarget ist
  // der Fall nicht zu erkennen. Wo der Zeiger steht, weisz nur er selbst.
  useEffect(() => {
    if (!isHovered) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = containerRef.current?.getBoundingClientRect();
      if (!r) return;
      const slack = 28;
      if (
        e.clientX < r.left - slack ||
        e.clientX > r.right + slack ||
        e.clientY < r.top - slack ||
        e.clientY > r.bottom + slack
      ) {
        setIsHovered(false);
      }
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, [isHovered]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: HERO_GROUP_DURATION, delay: HERO_GROUP_DELAY, ease: HERO_REVEAL_EASE }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={handleClickCapture}
      onPointerEnter={handlePointerEnter}
      // `touch-action: none` stand hier fuer das Verschieben mit dem Finger --
      // und hat damit jede Wischbewegung geschluckt, die auf dem Knopf
      // beginnt. Der Knopf klebt unten rechts im Bild, also genau dort, wo der
      // Daumen zum Scrollen aufsetzt: die Seite stand still, und es sah aus,
      // als haenge der untere Rand fest.
      //
      // `pan-y` gibt das Scrollen zurueck. Senkrecht gewischt bewegt sich die
      // Seite, waagerecht begonnene Gesten erreichen weiterhin die Drag-Logik,
      // und mit der Maus ist Ziehen ohnehin unberuehrt. Eine Schaltflaeche, an
      // der die Seite haengenbleibt, ist der schlechtere Tausch.
      style={
        dragPos
          ? { left: dragPos.left, top: dragPos.top, touchAction: 'pan-y' }
          : { touchAction: 'pan-y' }
      }
      // `justify-end`, damit die Schale rechtsbuendig in ihrem Rahmen sitzt.
      // Der Rahmen nimmt die neue Breite sofort an, die Schale animiert sie --
      // linksbuendig waere ihre linke Kante fest und sie wuerde nach rechts
      // aus dem Bild wachsen statt nach links in den freien Raum.
      className={`fixed z-[60] flex justify-end ${dragPos ? '' : 'bottom-6 right-6'} select-none`}
    >
      {/*
        Aufklappen nach links, nicht nach oben.

        Der Stapel schob vier Kacheln senkrecht ueber den Knopf -- vier
        einzelne Flaechen, die je 80 Millisekunden versetzt hochsprangen, mit
        echten Luecken dazwischen, durch die der Zeiger faellt. Jetzt dehnt
        sich eine Flaeche zur Seite und die Symbole stehen darin: ein
        zusammenhaengender Koerper, derselbe wie bei der CTA-Pille, auf
        derselben Feder.

        Nach links, weil der Knopf rechts unten sitzt: die Schale ist am
        rechten Rand verankert, waechst also in den freien Raum hinein statt
        aus dem Bild heraus.
      */}
      <motion.div
        layout
        transition={SPRING_SHELL}
        className={`flex h-14 items-center overflow-hidden rounded-card border transition-colors duration-500 ${
          effectiveOpen ? SOLID_CLASS : GLASSY_CLASS
        }`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {!effectiveOpen ? (
            <motion.button
              key="trigger"
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={false}
              aria-label="Social Media Links"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, transition: SWAP_OUT }}
              transition={SWAP}
              className="flex h-14 w-14 items-center justify-center"
            >
              <Share2 className="h-5 w-5 text-emerald-400" />
            </motion.button>
          ) : (
            <motion.div
              key="links"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: SWAP_OUT }}
              transition={{ ...SWAP, delay: 0.04 }}
              className="flex items-center gap-0.5 px-1.5"
            >
              {SOCIAL_LINKS.map(({ href, label, Icon }, i) => (
                <React.Fragment key={label}>
                  {/* Der Trenner vor dem letzten Eintrag: die drei Profile
                      sind eine Gruppe, das mailto ist eine andere Art Weg. */}
                  {i === SOCIAL_LINKS.length - 1 && (
                    <span aria-hidden="true" className="mx-1 h-6 w-px bg-white/15" />
                  )}
                  <a
                    href={href}
                    // Ein mailto oeffnet das Mailprogramm, kein Dokument: ein
                    // target="_blank" davor liesze einen leeren Tab zurueck.
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    title={label}
                    className="flex h-11 w-11 items-center justify-center rounded-card text-emerald-400 transition-colors duration-500 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
