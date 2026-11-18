import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { BackButton } from '../components/BackButton';
import { NewsletterCard } from '../components/NewsletterCard';
import { ConnectCard } from '../components/ConnectCard';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ChevronDown, Wrench, Layout, Code, Cpu, Sparkles, Layers, GraduationCap } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  Layout,
  Code,
  Cpu,
  Sparkles,
  Layers,
};

export const AboutPage: React.FC = () => {
  const { profile, journey, education, signatureHighlight } = PORTFOLIO_DATA;
  const [expandedId, setExpandedId] = useState<string | null>(journey[0].id);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Header Card with Portrait Photo */}
      <div className="glass-panel rounded-[28px] sm:rounded-[32px] overflow-hidden relative group">
        <div className="h-72 sm:h-96 w-full relative bg-neutral-900">
          <img
            src="/images/profile.png"
            alt={profile.name}
            className="w-full h-full object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-700"
            loading="eager"
          />

          {/* Top BackButton */}
          <div className="absolute top-6 left-6 z-10">
            <BackButton to="/" />
          </div>

          {/* Dark gradient overlay for bottom typography */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20" />

          {/* Bottom Title & Headline */}
          <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300">
              {profile.eyebrow}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {profile.name}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. Extended Bio Card */}
      <GlassCard className="py-7 sm:py-9 space-y-4 text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Engineer by training. Product builder by choice.
        </h2>

        <div className="space-y-3.5 text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
          {profile.extendedBio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </GlassCard>

      {/* 3. Journey & Practice (Accordion) */}
      <GlassCard className="py-7 sm:py-8 space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Journey &amp; Practice
          </h2>
          <p className="text-xs text-white/50 mt-1">
            A systems-oriented progression from physical mechanics to modern digital products.
          </p>
        </div>

        <div className="space-y-2.5 pt-1">
          {journey.map((item) => {
            const Icon = ICON_MAP[item.iconName] || Layers;
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white/[0.04] border border-white/[0.08] overflow-hidden transition-colors hover:bg-white/[0.06]"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-4 flex items-center justify-between text-left gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-white/45 font-medium truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/40 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="px-4 pb-4 pt-1 text-xs text-white/65 leading-relaxed border-t border-white/5"
                    >
                      {item.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* 4. Education Card */}
      <GlassCard className="py-7 sm:py-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-5 h-5 text-amber-300" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Education
          </h2>
        </div>

        <div className="space-y-3 pt-1">
          {education.map((edu) => (
            <div
              key={edu.institution}
              className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.07] space-y-1"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  {edu.qualification}
                </h3>
                <span className="text-[10px] font-mono text-amber-300/80 shrink-0">
                  {edu.year}
                </span>
              </div>
              <p className="text-xs text-white/55 font-medium">
                {edu.institution}
              </p>
              <p className="text-xs text-white/45 pt-1 leading-relaxed">
                {edu.details}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 5. Philosophy Highlight Card */}
      <GlassCard className="text-center py-8 sm:py-10 space-y-3">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-white/45">
          {signatureHighlight.heading}
        </p>
        <blockquote className="text-base sm:text-lg font-bold text-white">
          &ldquo;{signatureHighlight.subtext}&rdquo;
        </blockquote>
      </GlassCard>

      {/* 6. Newsletter Card */}
      <NewsletterCard />

      {/* 7. Connect Card */}
      <ConnectCard />
    </div>
  );
};
