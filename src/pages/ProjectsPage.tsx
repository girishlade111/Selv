import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { BackButton } from '../components/BackButton';
import { NewsletterCard } from '../components/NewsletterCard';
import { ConnectCard } from '../components/ConnectCard';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import { cardFadeIn } from '../styles/motion';

export const ProjectsPage: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Title Card */}
      <GlassCard className="py-7 sm:py-8 space-y-4">
        <BackButton />
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-xs sm:text-sm text-white/55 font-medium mt-1">
            Curated software applications, developer utilities, and web experiments.
          </p>
        </div>
      </GlassCard>

      {/* 2. Vertically Stacked Large Project Cards */}
      <div className="space-y-4 sm:space-y-5">
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/projects/${project.slug}`}
            className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-[28px] sm:rounded-[32px]"
          >
            <motion.div
              variants={cardFadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="glass-panel-interactive rounded-[28px] sm:rounded-[32px] overflow-hidden relative h-64 sm:h-80 w-full"
            >
              {/* Background cover image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Status pill if experimental */}
              {project.status && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-black/70 backdrop-blur-md border border-white/15 text-amber-300">
                    {project.status}
                  </span>
                </div>
              )}

              {/* Bottom gradient overlay with title & arrow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex items-end justify-between p-6 sm:p-8">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                    {project.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {project.title}
                  </h2>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* 3. Newsletter Card */}
      <NewsletterCard />

      {/* 4. Connect Card */}
      <ConnectCard />
    </div>
  );
};
