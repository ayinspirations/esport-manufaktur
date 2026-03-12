import React, { useEffect, useRef } from 'react';

interface SafeVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SafeVideo: React.FC<SafeVideoProps> = ({ src, className, style }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      style={style}
      onError={() => {}}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};
