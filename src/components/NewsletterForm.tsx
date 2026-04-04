'use client';

import { useState } from 'react';
import { subscribeToNewsletter } from '@/lib/actions';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterFormProps {
  title?: string;
  subtitle?: string;
  submitLabel?: string;
}

export default function NewsletterForm({ title = 'Stay updated', subtitle, submitLabel = 'Subscribe' }: NewsletterFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(event.currentTarget);
    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      setStatus('success');
      setMessage(result.message || 'Thank you for subscribing!');
      // Clear message after 5 seconds if success
      setTimeout(() => {
        setMessage('');
        setStatus('idle');
      }, 5000);
      (event.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
      setMessage(result.error || 'Something went wrong.');
    }
  }

  return (
    <div className="space-y-4 max-w-sm">
      <div className="space-y-1">
        <h3 className="text-xs uppercase tracking-widest font-medium opacity-90">{title}</h3>
        {subtitle && (
          <p className="text-[10px] uppercase tracking-wide opacity-70 italic">{subtitle}</p>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex group relative overflow-hidden">
        <input
          type="email"
          name="email"
          placeholder="your email address"
          required
          className="bg-transparent border-b border-brand-charcoal/40 py-2 text-[10px] uppercase tracking-widest focus:outline-none focus:border-brand-charcoal transition-all w-full placeholder:opacity-50"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className="border-b border-brand-charcoal/40 py-2 px-6 text-[10px] uppercase tracking-widest hover:border-brand-charcoal hover:bg-brand-charcoal/5 transition-all disabled:opacity-50 font-medium"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '...' : submitLabel}
        </button>
      </form>
      
      <div className="h-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {message && (
            <motion.p 
              key={message}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`text-[9px] uppercase tracking-widest ${status === 'success' ? 'text-green-600' : 'text-red-700'}`}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
