import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { BackButton } from '../components/BackButton';
import { NewsletterCard } from '../components/NewsletterCard';
import { ConnectCard } from '../components/ConnectCard';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = PORTFOLIO_DATA.blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Hero Image Card with Bottom Title */}
      <div className="glass-panel rounded-[28px] sm:rounded-[32px] overflow-hidden relative">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />

          {/* Top BackButton */}
          <div className="absolute top-6 left-6 z-10">
            <BackButton to="/blog" />
          </div>

          {/* Bottom Title & Metadata */}
          <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-amber-300">
              <span>{post.category}</span>
              <span>&bull;</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. Article Body Text Card */}
      <GlassCard className="py-8 sm:py-10 space-y-5 text-left">
        <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed italic border-l-2 border-amber-400 pl-4 py-1">
          {post.summary}
        </p>

        <div className="space-y-4 text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
          <span>Author: {PORTFOLIO_DATA.profile.name}</span>
          <Link
            to="/blog"
            className="hover:text-white transition-colors underline underline-offset-4"
          >
            &larr; Back to all notes
          </Link>
        </div>
      </GlassCard>

      {/* 3. Newsletter Card */}
      <NewsletterCard />

      {/* 4. Connect Card */}
      <ConnectCard />
    </div>
  );
};
