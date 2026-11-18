import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from './GlassCard';
import { Check, AlertCircle, Loader2 } from 'lucide-react';

export const NewsletterCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter an email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

  return (
    <GlassCard className="text-left space-y-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
          From my desk
          <br />
          to your inbox.
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div className="relative flex items-center rounded-full bg-black/60 border border-white/10 p-1.5 focus-within:border-white/30 focus-within:ring-1 focus-within:ring-white/20 transition-all">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="name@email.com"
            disabled={status === 'loading' || status === 'success'}
            aria-label="Email address for newsletter"
            className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none"
          />

          <motion.button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-accent px-5 py-2 text-xs sm:text-sm font-semibold shrink-0 flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Joining...</span>
              </>
            ) : status === 'success' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Joined</span>
              </>
            ) : (
              'Subscribe'
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-rose-400 flex items-center gap-1 pl-2"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </motion.p>
          )}

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-emerald-400 flex items-center gap-1 pl-2"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Thank you for subscribing! Updates will arrive from admin@ladestack.in.</span>
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <p className="text-xs text-white/40 font-normal leading-relaxed">
        New work, notes from my process, and design finds worth sharing.
      </p>
    </GlassCard>
  );
};
