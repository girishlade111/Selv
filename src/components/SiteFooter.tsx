import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full py-6 text-center text-xs text-white/40 flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-white/5">
      <p>
        &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a
          href={PORTFOLIO_DATA.profile.brandSite}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          LadeStack Ecosystem
        </a>
        <span>&bull;</span>
        <a
          href={PORTFOLIO_DATA.profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};
