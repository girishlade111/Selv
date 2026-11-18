import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { BackButton } from '../components/BackButton';
import { NewsletterCard } from '../components/NewsletterCard';
import { ConnectCard } from '../components/ConnectCard';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogPosts } = PORTFOLIO_DATA;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Title Card */}
      <GlassCard className="py-7 sm:py-8 space-y-4">
        <BackButton />
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Blog
          </h1>
          <p className="text-xs sm:text-sm text-white/55 font-medium mt-1">
            Selected engineering notes, local-first computing insights, and design principles.
          </p>
        </div>
      </GlassCard>

      {/* 2. Article List Card */}
      <GlassCard className="py-6 sm:py-8 space-y-3">
        <div className="divide-y divide-white/10">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="py-4 flex items-center gap-4 group hover:bg-white/[0.03] -mx-2 px-2 rounded-2xl transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-18 sm:w-20 h-14 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/10 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Metadata */}
              <div className="min-w-0 flex-1 text-left">
                <h2 className="text-sm sm:text-base font-bold text-white/95 group-hover:text-white line-clamp-2">
                  {post.title}
                </h2>
                <div className="flex items-center gap-2 text-[11px] text-white/45 font-medium mt-1">
                  <span className="text-amber-300/80">{post.category}</span>
                  <span>&bull;</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white/15 group-hover:text-white transition-all shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </GlassCard>

      {/* 3. Newsletter Card */}
      <NewsletterCard />

      {/* 4. Connect Card */}
      <ConnectCard />
    </div>
  );
};
