import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { pageVariants } from '../styles/motion';
import { SiteBackground } from './SiteBackground';
import { FloatingNav } from './FloatingNav';
import { SiteFooter } from './SiteFooter';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export const PageShell: React.FC<PageShellProps> = ({ children, className = '' }) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen text-white relative selection:bg-amber-400 selection:text-black">
      {/* 1. Fixed Environmental Background Layer */}
      <SiteBackground />

      {/* 2. Floating Navigation Rail */}
      <FloatingNav />

      {/* 3. Centered Narrow Content Column */}
      <motion.main
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`w-full max-w-[590px] mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-24 sm:pb-28 space-y-4 sm:space-y-5 relative z-10 ${className}`}
      >
        {children}
        <SiteFooter />
      </motion.main>
    </div>
  );
};
