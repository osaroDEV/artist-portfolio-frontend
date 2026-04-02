'use client';

import {useLocale} from 'next-intl';
import {routing, usePathname, useRouter} from '@/i18n/routing';
import {useTransition} from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onLocaleChange(nextLocale: 'en' | 'de') {
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  }

  return (
    <div className="flex items-center space-x-4 text-base uppercase tracking-[0.2em]">
      {routing.locales.map((cur) => (
        <button
          key={cur}
          onClick={() => onLocaleChange(cur as any)}
          disabled={isPending}
          className={`cursor-pointer transition-opacity hover:opacity-100 ${
            locale === cur ? 'opacity-100 font-medium' : 'opacity-40'
          }`}
        >
          {cur}
        </button>
      ))}
    </div>
  );
}
