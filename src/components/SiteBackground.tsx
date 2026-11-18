import React from 'react';

export const SiteBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Static atmospheric background image */}
      <img
        src="/images/background.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        loading="eager"
        decoding="async"
      />

      {/* Atmospheric dark tint and vignette layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" />
      <div className="absolute inset-0 bg-neutral-950/20 mix-blend-multiply" />
    </div>
  );
};
