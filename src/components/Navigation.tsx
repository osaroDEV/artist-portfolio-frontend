'use client';

import {Link, usePathname} from '@/i18n/routing';
import {useTranslations, useLocale} from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Menu, X} from 'lucide-react';

export default function Navigation() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {href: '/recently', label: t('recently')},
    {href: '/paintings', label: t('paintings')},
    {href: '/drawings', label: t('drawings')},
    {href: '/photography', label: t('photography')},
    {href: '/about', label: t('about')},
    {href: '/contact', label: t('contact')},
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 md:px-12 md:py-12 bg-transparent pointer-events-none">
      <div className="flex justify-between items-start max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link href="/" className="pointer-events-auto group">
          <h1 className="text-2xl md:text-3xl font-light tracking-[-0.05em]">
            Ella Becker
          </h1>
          <div className="h-px w-0 bg-brand-charcoal transition-all duration-500 group-hover:w-full" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-col items-end space-y-6 pointer-events-auto">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as any}
                className={`nav-link ${isActive(item.href) ? 'active-nav-link' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <LanguageSwitcher />
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden pointer-events-auto"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} strokeWidth={1} />
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, x: '100%'}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: '100%'}}
            transition={{type: 'spring', damping: 25, stiffness: 200}}
            className="fixed inset-0 z-60 bg-brand-cream p-12 flex flex-col pointer-events-auto"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsOpen(false)}>
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            <div className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  onClick={() => setIsOpen(false)}
                  className={`text-4xl font-serif font-light ${
                    isActive(item.href) ? 'opacity-100 italic' : 'opacity-40'
                  }`}
                >
                  {item.label}
                  <div className="h-px w-0 bg-brand-charcoal transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-brand-charcoal/10 flex flex-col space-y-8">
              <LanguageSwitcher />
              <div className="text-[10px] uppercase tracking-widest opacity-40">
                © 2026 Ella Becker. All rights reserved. Website by <a href="https://codeillustrated.com/labs" className='underline' target="_blank" rel="noopener noreferrer">Code Illustrated Labs</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
