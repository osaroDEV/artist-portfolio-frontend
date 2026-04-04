'use client';

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import { motion, AnimatePresence } from 'framer-motion';

interface FooterLegalProps {
  content: any;
  title?: string;
  locale: string;
}

export default function FooterLegal({ content, title = 'Imprint', locale }: FooterLegalProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!content) return null;

  return (
    <div className="flex flex-col items-start md:items-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest text-[9px] cursor-pointer"
      >
        {isOpen ? 'Close' : title}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden w-full mt-4 text-left"
          >
            <div className="text-[9px] uppercase tracking-widest opacity-70 max-w-4xl space-y-4 border-t border-brand-charcoal/10 pt-8 mt-4 leading-loose pb-8">
              <PortableText value={content} />
              
              <div className="pt-4 space-y-4 border-t border-brand-charcoal/5 mt-8 max-w-2xl">
                {locale === 'de' ? (
                  <p>
                    <strong>Haftungshinweis:</strong> Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                  </p>
                ) : (
                  <p>
                    <strong>Disclaimer:</strong> Despite careful content control no liability will be accepted for the content of external links. For the content of linked pages their operators responsible.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
