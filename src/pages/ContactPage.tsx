import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { BackButton } from '../components/BackButton';
import { NewsletterCard } from '../components/NewsletterCard';
import { ConnectCard } from '../components/ConnectCard';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Check, AlertCircle, Loader2, Send } from 'lucide-react';
import { buttonMotion } from '../styles/motion';

export const ContactPage: React.FC = () => {
  const { faq } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please write a message.');
      return;
    }

    setStatus('loading');

    // Simulate sending with graceful mailto fallback option
    setTimeout(() => {
      setStatus('success');
      // Create mailto link for reliable direct dispatch
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:admin@ladestack.in?subject=${subject}&body=${body}`;
    }, 900);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Title Card */}
      <GlassCard className="py-7 sm:py-8 space-y-4">
        <BackButton />
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get in touch
          </h1>
          <p className="text-xs sm:text-sm text-white/55 font-medium mt-1">
            Have a project, collaboration idea, or question? Send a note directly.
          </p>
        </div>
      </GlassCard>

      {/* 2. Contact Form Card */}
      <GlassCard className="py-7 sm:py-8 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Name Field */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="name"
              className="text-xs font-semibold text-white/70 tracking-wide uppercase"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              disabled={status === 'loading'}
              className="w-full rounded-2xl bg-black/50 border border-white/10 px-4 py-3 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-white/70 tracking-wide uppercase"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              disabled={status === 'loading'}
              className="w-full rounded-2xl bg-black/50 border border-white/10 px-4 py-3 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="message"
              className="text-xs font-semibold text-white/70 tracking-wide uppercase"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or idea..."
              disabled={status === 'loading'}
              className="w-full rounded-2xl bg-black/50 border border-white/10 px-4 py-3 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all resize-none"
            />
          </div>

          {/* Error & Success Messages */}
          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-rose-400 flex items-center gap-1.5 p-2 rounded-xl bg-rose-500/10 border border-rose-500/20"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-emerald-300 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1 text-left"
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Draft created!</span>
                </div>
                <p className="text-[11px] text-white/70">
                  Your default mail client was triggered. You can also reach me directly at{' '}
                  <a
                    href="mailto:admin@ladestack.in"
                    className="underline text-amber-300 font-semibold"
                  >
                    admin@ladestack.in
                  </a>
                  .
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={buttonMotion.hover}
            whileTap={buttonMotion.tap}
            className="w-full btn-accent py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Submit</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </motion.button>
        </form>
      </GlassCard>

      {/* 3. Frequently Asked Questions Card (Chat-bubble reference design) */}
      <GlassCard className="py-7 sm:py-8 space-y-5 text-left">
        <div className="text-center pb-2">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-white/50">
            Frequently Asked Questions
          </p>
        </div>

        <div className="space-y-4">
          {faq.map((item, idx) => (
            <div key={idx} className="space-y-2">
              {/* Question bubble (white pill on right) */}
              <div className="flex justify-end">
                <div className="bg-white text-black font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-2xl max-w-[85%] shadow-md">
                  {item.question}
                </div>
              </div>

              {/* Answer bubble (dark panel on left) */}
              <div className="flex justify-start">
                <div className="bg-black/60 border border-white/10 text-white/75 text-xs sm:text-sm px-4 py-3 rounded-2xl max-w-[92%] leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 4. Newsletter Card */}
      <NewsletterCard />

      {/* 5. Connect Card */}
      <ConnectCard />
    </div>
  );
};
