import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { buttonMotion } from '../styles/motion';

interface BackButtonProps {
  to?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ to, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={buttonMotion.hover}
      whileTap={buttonMotion.tap}
      className={`w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${className}`}
      aria-label="Go back to previous page"
      title="Back"
    >
      <ArrowLeft className="w-4 h-4" />
    </motion.button>
  );
};
