import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { BackButton } from '../components/BackButton';
import { NewsletterCard } from '../components/NewsletterCard';
import { ConnectCard } from '../components/ConnectCard';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { buttonMotion } from '../styles/motion';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Hero Cover Card */}
      <div className="glass-panel rounded-[28px] sm:rounded-[32px] overflow-hidden relative">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />

          {/* Top BackButton */}
          <div className="absolute top-6 left-6 z-10">
            <BackButton to="/projects" />
          </div>

          {/* Bottom Title & Meta */}
          <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300">
              {project.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. Overview Card */}
      <GlassCard className="py-7 sm:py-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Overview
        </h2>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
          {project.overview}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={buttonMotion.hover}
            whileTap={buttonMotion.tap}
            className="btn-accent px-5 py-2.5 text-xs font-semibold flex items-center gap-2"
          >
            <span>Visit Live Project</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>

          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={buttonMotion.hover}
              whileTap={buttonMotion.tap}
              className="btn-dark px-5 py-2.5 text-xs font-semibold flex items-center gap-2"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Repository</span>
            </motion.a>
          )}
        </div>
      </GlassCard>

      {/* 3. Three Use Cases Card */}
      <GlassCard className="py-7 sm:py-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Primary Use Cases
        </h2>

        <div className="space-y-3.5">
          {project.useCases.map((useCase, idx) => (
            <div
              key={useCase.title}
              className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.07] space-y-1.5"
            >
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <h3 className="text-xs sm:text-sm font-semibold tracking-tight">
                  {idx + 1}. {useCase.title}
                </h3>
              </div>
              <p className="text-xs text-white/60 leading-relaxed pl-6">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 4. Technologies Card */}
      <GlassCard className="py-6 sm:py-7 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">
          Technologies &amp; Architecture
        </h3>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.06] border border-white/10 text-white/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </GlassCard>

      {/* 5. Return to Projects link */}
      <div className="text-center pt-2">
        <Link
          to="/projects"
          className="text-xs font-medium text-white/50 hover:text-white transition-colors underline underline-offset-4"
        >
          &larr; Back to all projects
        </Link>
      </div>

      {/* 6. Newsletter Card */}
      <NewsletterCard />

      {/* 7. Connect Card */}
      <ConnectCard />
    </div>
  );
};
