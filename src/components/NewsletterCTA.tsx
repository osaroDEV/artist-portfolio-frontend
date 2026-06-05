'use client';

import {useState} from 'react';
import {subscribeToNewsletter} from '@/lib/actions';
import {motion, AnimatePresence} from 'framer-motion';

const easeSilk: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface NewsletterCTAProps {
  title?: string;
  subtitle?: string;
  submitLabel?: string;
}

export default function NewsletterCTA({
  title = 'Stay updated',
  subtitle,
  submitLabel = 'Subscribe',
}: NewsletterCTAProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const formData = new FormData(event.currentTarget);
    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      setStatus('success');
      setMessage(result.message || 'Thank you for subscribing.');
      setTimeout(() => {
        setMessage('');
        setStatus('idle');
      }, 6000);
      (event.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
      setMessage(result.error || 'Something went wrong.');
    }
  }

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.9, ease: easeSilk}}
      className="relative mt-24 pt-16 border-t border-brand-charcoal/10"
    >
      {/* Decorative accent line */}
      <span className="absolute top-0 left-0 w-8 h-px bg-brand-charcoal/60 -translate-y-px" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-2xl">

        {/* Left: headings */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand-charcoal/40 font-medium">
            Newsletter
          </p>
          <h2 className="text-xl font-light text-brand-charcoal leading-snug tracking-[0.05em] normal-case">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[13px] text-brand-charcoal/50 font-light leading-relaxed max-w-xs">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right: input + button */}
        <div className="flex flex-col gap-5 justify-start pt-1">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.p
                key="success"
                initial={{opacity: 0, y: 6}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                transition={{duration: 0.5, ease: easeSilk}}
                className="text-[11px] uppercase tracking-[0.25em] text-brand-charcoal/60 py-3"
              >
                {message}
              </motion.p>
            ) : (
              <motion.form
                key="form"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.4}}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="group relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="your email address"
                    required
                    disabled={status === 'loading'}
                    className="
                      w-full bg-transparent border-b border-brand-charcoal/15
                      py-3 pr-4
                      text-[12px] uppercase tracking-[0.2em] font-light
                      text-brand-charcoal placeholder:text-brand-charcoal/30
                      focus:outline-none focus:border-brand-charcoal
                      transition-colors duration-300
                      disabled:opacity-40
                    "
                  />
                  {/* animated underline */}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-brand-charcoal group-focus-within:w-full transition-all duration-500 ease-out" />
                </div>

                <div className="flex items-center gap-6">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="
                      text-[10px] uppercase tracking-[0.3em] font-medium
                      text-brand-charcoal border border-brand-charcoal/20
                      px-8 py-4
                      hover:bg-brand-charcoal hover:text-white hover:border-brand-charcoal
                      transition-all duration-500
                      disabled:opacity-40 disabled:cursor-not-allowed
                    "
                  >
                    {status === 'loading' ? '···' : submitLabel}
                  </button>

                  <AnimatePresence>
                    {status === 'error' && message && (
                      <motion.p
                        key="error"
                        initial={{opacity: 0, x: -6}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                        className="text-[10px] uppercase tracking-[0.2em] text-brand-pink"
                      >
                        {message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
