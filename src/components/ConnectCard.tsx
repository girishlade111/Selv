import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { Globe, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ConnectCard: React.FC = () => {
  const { social } = PORTFOLIO_DATA.profile;

  const links = [
    { name: 'Website', href: social.github ? PORTFOLIO_DATA.profile.brandSite : '#', icon: Globe },
    { name: 'LinkedIn', href: social.linkedin, icon: LinkedinIcon },
    { name: 'GitHub', href: social.github, icon: GithubIcon },
    { name: 'Email', href: social.email, icon: Mail },
  ];

  return (
    <GlassCard className="text-center py-8 sm:py-10 space-y-4">
      <p className="text-xs sm:text-sm font-medium text-white/50 tracking-wide">
        Have a question or an idea?
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
        Let's connect
      </h2>

      <div className="flex items-center justify-center gap-4 pt-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.94 }}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={link.name}
              title={link.name}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          );
        })}
      </div>
    </GlassCard>
  );
};
