import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cardFadeIn } from '../styles/motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  interactive = false,
  ...props
}) => {
  return (
    <motion.div
      variants={cardFadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={interactive ? { y: -3, scale: 1.008 } : undefined}
      whileTap={interactive ? { scale: 0.995 } : undefined}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`glass-panel rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 text-white relative overflow-hidden ${
        interactive ? 'glass-panel-interactive cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {/* Subtle top edge specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};
