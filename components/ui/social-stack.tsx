import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Youtube, Share2 } from 'lucide-react';
import { HERO_GROUP_DELAY, HERO_GROUP_DURATION, HERO_REVEAL_EASE } from '../heroIntro';

interface SocialStackLink {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  closedClass: string;
  openClass: string;
  zClass: string;
}

// Same URLs as components/Footer.tsx -- kept in sync manually, not imported,
// since Footer doesn't export them as a shared constant.
const SOCIAL_LINKS: SocialStackLink[] = [
  {
    href: 'https://www.instagram.com/esport.manufaktur',
    label: 'Instagram',
    Icon: Instagram,
    closedClass: 'translate-y-0 scale-90 opacity-0 pointer-events-none',
    openClass: '-translate-y-16 scale-100 opacity-100 pointer-events-auto',
    zClass: 'z-[3]'
  },
  {
    href: 'https://www.linkedin.com/company/esport-manufaktur-gmbh/',
    label: 'LinkedIn',
    Icon: Linkedin,
    closedClass: 'translate-y-0 scale-90 opacity-0 pointer-events-none',
    openClass: '-translate-y-32 scale-100 opacity-100 pointer-events-auto',
    zClass: 'z-[2]'
  },
  {
    href: 'https://www.youtube.com/@eSport-Manufaktur',
    label: 'YouTube',
    Icon: Youtube,
    closedClass: 'translate-y-0 scale-90 opacity-0 pointer-events-none',
    openClass: '-translate-y-48 scale-100 opacity-100 pointer-events-auto',
    zClass: 'z-[1]'
  }
];

// Same frosted-glass recipe as the Navbar's resting desktop pill
// (components/Navbar.tsx) -- background/blur/saturate copied 1:1 so the
// widget reads as the same material, not an approximation.
const GLASSY_CLASS =
  'bg-white/[0.03] backdrop-blur-lg backdrop-saturate-[1.2] border-transparent shadow-[0_0_28px_rgba(52,211,153,0)]';
const SOLID_CLASS =
  'tile-gradient border-white/10 shadow-[0_0_28px_rgba(52,211,153,0.35)] hover:shadow-[0_0_50px_rgba(52,211,153,0.3)]';

const WIDGET_SIZE = 56; // px, matches h-14/w-14
const DRAG_THRESHOLD = 10; // px of movement before a touch counts as a drag, not a tap

export const SocialStack: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dragPos, setDragPos] = useState<{ left: number; top: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, moved: false, startX: 0, startY: 0, originLeft: 0, originTop: 0 });
  const justDraggedRef = useRef(false);
  const hoverLeaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Both hover (desktop) and click/tap (mobile, and desktop pin) drive the
  // same boolean -- no CSS :hover is used, so there's no "stuck open" state
  // from mobile's sticky-hover simulation and no specificity race between a
  // group-hover utility and a plain one restarting the transition. It also
  // gates the glass -> solid look: glassy at rest, always, on both web and
  // mobile, until the user actually interacts.
  const effectiveOpen = isOpen || isHovered;

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
    if (hoverLeaveTimeoutRef.current) {
      clearTimeout(hoverLeaveTimeoutRef.current);
      hoverLeaveTimeoutRef.current = null;
    }
    setIsHovered(true);
  };
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    if (hoverLeaveTimeoutRef.current) clearTimeout(hoverLeaveTimeoutRef.current);
    hoverLeaveTimeoutRef.current = setTimeout(() => setIsHovered(false), 200);
  };

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
      onPointerLeave={handlePointerLeave}
      style={
        dragPos
          ? { left: dragPos.left, top: dragPos.top, touchAction: 'none' }
          : { touchAction: 'none' }
      }
      className={`fixed z-[60] ${dragPos ? '' : 'bottom-6 right-6'} select-none`}
    >
      <div className="relative h-14 w-14">
        {SOCIAL_LINKS.map(({ href, label, Icon, closedClass, openClass, zClass }, i) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            tabIndex={effectiveOpen ? 0 : -1}
            className={`${SOLID_CLASS} absolute inset-0 ${zClass} flex h-14 w-14 items-center justify-center rounded-[20px] border transition-[transform,opacity,box-shadow] duration-500 ease-out ${
              effectiveOpen ? openClass : closedClass
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <Icon className="h-5 w-5 text-emerald-400" />
          </a>
        ))}

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={effectiveOpen}
          aria-label="Social Media Links"
          className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-[20px] border transition-all duration-300 ${
            effectiveOpen ? SOLID_CLASS : GLASSY_CLASS
          }`}
        >
          <Share2 className="h-5 w-5 text-emerald-400" />
        </button>
      </div>
    </motion.div>
  );
};
