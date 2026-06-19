'use client';

import {useLocale} from 'next-intl';

export default function Loading() {
  const locale = useLocale();
  const loadingText = locale === 'de' ? 'Einen moment, bitte' : 'One moment please';

  return (
    <div className="fixed inset-0 bg-brand-cream z-100 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/40 animate-pulse">{loadingText}</p>
        <div className="h-px w-12 bg-brand-charcoal opacity-10" />
      </div>
    </div>
  );
}
