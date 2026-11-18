import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { NewsletterCard } from '../components/NewsletterCard';
import { ConnectCard } from '../components/ConnectCard';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { buttonMotion } from '../styles/motion';
import { Plus, ArrowUpRight, Code2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { profile, capabilities, philosophy, signatureHighlight, blogPosts } = PORTFOLIO_DATA;
  const [expandedCapability, setExpandedCapability] = useState<number | null>(null);

  const toggleCapability = (index: number) => {
    setExpandedCapability(expandedCapability === index ? null : index);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Identity / Hero Card */}
      <GlassCard className="text-center py-8 sm:py-10 space-y-5">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-white/50">
          {profile.eyebrow}
        </p>

        {/* Photo and Name Header Row */}
        <div className="flex items-center justify-center gap-5 sm:gap-6 text-left my-2">
          {/* Profile photo with squircle rounding, hairline border & soft shadow */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl overflow-hidden shrink-0 border border-white/15 shadow-2xl relative group bg-neutral-900">
            <img
              src="/images/profile.png"
              alt={profile.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl sm:rounded-3xl pointer-events-none" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.1]">
              Girish <br />
              Lade
            </h1>
            <p className="text-xs sm:text-sm text-white/50 font-medium pt-0.5">
              {profile.location}
            </p>
          </div>
        </div>

        <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed px-2 font-normal">
          {profile.shortBio}
        </p>

        <div className="pt-2">
          <Link to="/about">
            <motion.button
              type="button"
              whileHover={buttonMotion.hover}
              whileTap={buttonMotion.tap}
              className="btn-dark px-6 py-2 text-xs font-semibold tracking-wide uppercase"
            >
              About Me
            </motion.button>
          </Link>
        </div>
      </GlassCard>

      {/* 2. Featured Work / Portfolio Preview Card */}
      <GlassCard className="text-center py-7 sm:py-8 space-y-5">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-white/50">
          Portfolio
        </p>

        {/* Visual overlap preview collage */}
        <Link to="/projects" className="block group">
          <div className="relative h-44 sm:h-52 w-full flex items-center justify-center overflow-hidden my-2">
            {/* Background project card 1 (left tilt) */}
            <motion.div
              whileHover={{ rotate: -8, y: -6 }}
              className="absolute w-28 sm:w-36 h-36 sm:h-44 rounded-xl overflow-hidden shadow-2xl border border-white/15 -translate-x-14 sm:-translate-x-18 rotate-[-5deg] transition-transform duration-300"
            >
              <img
                src="/images/2JnCIoFkYBohFibzd6RkCrhPaA.webp"
                alt="GB Coder Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Background project card 2 (right tilt) */}
            <motion.div
              whileHover={{ rotate: 8, y: -6 }}
              className="absolute w-28 sm:w-36 h-36 sm:h-44 rounded-xl overflow-hidden shadow-2xl border border-white/15 translate-x-14 sm:translate-x-18 rotate-[6deg] transition-transform duration-300"
            >
              <img
                src="/images/ugMN9AhstupPUBTNALc5VUmV6eM.webp"
                alt="MD2PDF Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Front prominent project card (center) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative z-10 w-32 sm:w-40 h-40 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/25 transition-transform duration-300"
            >
              <img
                src="/images/Z54sInfMaZQ49LXzsNHWlSB45vs.webp"
                alt="LS PDF Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-bold text-white tracking-wide">
                  LS PDF
                </span>
              </div>
            </motion.div>
          </div>
        </Link>

        <div>
          <Link to="/projects">
            <motion.button
              type="button"
              whileHover={buttonMotion.hover}
              whileTap={buttonMotion.tap}
              className="btn-dark px-6 py-2 text-xs font-semibold tracking-wide uppercase"
            >
              View Portfolio
            </motion.button>
          </Link>
        </div>
      </GlassCard>

      {/* 3. Capabilities / Services Card */}
      <GlassCard className="py-7 sm:py-8 space-y-4">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-white/50 text-center">
          Services &amp; Capabilities
        </p>

        <div className="space-y-2">
          {capabilities.map((cap, idx) => {
            const isExpanded = expandedCapability === idx;
            return (
              <div
                key={cap.title}
                className="rounded-2xl bg-white/[0.04] border border-white/[0.08] overflow-hidden transition-colors hover:bg-white/[0.07]"
              >
                <button
                  type="button"
                  onClick={() => toggleCapability(idx)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-expanded={isExpanded}
                >
                  <span>{cap.title}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus className="w-4 h-4 text-white/60" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="px-4 pb-3.5 text-xs text-white/65 leading-relaxed border-t border-white/5 pt-2"
                    >
                      {cap.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* 4. Philosophy / Quote Card */}
      <GlassCard className="py-8 sm:py-10 space-y-5">
        <blockquote className="text-lg sm:text-xl font-medium text-white/95 leading-snug tracking-tight">
          &ldquo;{philosophy.quote}&rdquo;
        </blockquote>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/images/profile.png"
              alt={philosophy.author}
              className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md shrink-0"
            />
            <div className="text-left">
              <p className="text-xs font-bold text-white">{philosophy.author}</p>
              <p className="text-[11px] text-white/50">{philosophy.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-white/30 text-xs">
            <Code2 className="w-4 h-4" />
            <span className="text-[10px] uppercase font-mono tracking-wider">LadeStack</span>
          </div>
        </div>
      </GlassCard>

      {/* 5. Blog Preview Card */}
      <GlassCard className="py-7 sm:py-8 space-y-4">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Blog
          </h2>
          <span className="text-[11px] font-mono text-white/40 uppercase">Selected Notes</span>
        </div>

        <div className="divide-y divide-white/10">
          {blogPosts.slice(0, 4).map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="py-3.5 flex items-center gap-3.5 group hover:bg-white/[0.03] -mx-2 px-2 rounded-xl transition-colors"
            >
              <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-white/5 border border-white/10 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white truncate">
                  {post.title}
                </h3>
                <p className="text-[11px] text-white/45 font-medium mt-0.5">
                  {post.category} &bull; {post.readTime}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-amber-300 transition-colors shrink-0" />
            </Link>
          ))}
        </div>

        <div className="pt-2 text-center">
          <Link to="/blog">
            <motion.button
              type="button"
              whileHover={buttonMotion.hover}
              whileTap={buttonMotion.tap}
              className="btn-dark px-6 py-2 text-xs font-semibold tracking-wide uppercase"
            >
              View All
            </motion.button>
          </Link>
        </div>
      </GlassCard>

      {/* 6. Signature Highlight Card */}
      <GlassCard className="text-center py-10 sm:py-14 space-y-4 relative overflow-hidden">
        {/* Glow backdrop behind large text */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
          <div className="w-48 h-28 bg-amber-400/10 blur-3xl rounded-full" />
        </div>

        <p className="text-[11px] font-semibold tracking-widest uppercase text-white/45">
          {signatureHighlight.heading}
        </p>

        <h3 className="text-5xl sm:text-7xl font-black text-white tracking-tighter drop-shadow-lg">
          {signatureHighlight.heroWord}
        </h3>

        <p className="text-xs sm:text-sm text-white/60 max-w-sm mx-auto leading-relaxed pt-1">
          {signatureHighlight.body}
        </p>
      </GlassCard>

      {/* 7. Newsletter Card */}
      <NewsletterCard />

      {/* 8. Connect Card */}
      <ConnectCard />
    </div>
  );
};
