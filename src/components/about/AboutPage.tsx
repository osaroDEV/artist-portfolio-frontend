'use client';

import {AboutPageData} from '@/lib/types';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {PortableText} from '@portabletext/react';

const easeSilk: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AboutPageClient({data}: {data: AboutPageData}) {
  const t = useTranslations('about');

  const education = data.exhibitions?.filter(e => e.type === 'education') || [];
  const projects = data.exhibitions?.filter(e => e.type === 'residency') || [];
  const publications = data.exhibitions?.filter(e => e.type === 'publication') || [];
  const exhibitions = data.exhibitions?.filter(e => e.type === 'solo-exhibition' || e.type === 'group-exhibition') || [];

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        {/* Left Column: Image */}
        <div className="md:col-span-12 lg:col-span-4 flex flex-col pt-4">
          {data.portraitImage && (
            <motion.div
              initial={{opacity: 0, scale: 0.97}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 0.8, ease: easeSilk}}
              className="relative w-full aspect-square overflow-hidden"
            >
              <Image
                src={data.portraitImage.asset.url}
                alt="Portrait"
                fill
                placeholder={data.portraitImage.asset.metadata?.lqip ? "blur" : "empty"}
                blurDataURL={data.portraitImage.asset.metadata?.lqip}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                style={{
                  objectPosition: data.portraitImage.hotspot
                    ? `${data.portraitImage.hotspot.x * 100}% ${data.portraitImage.hotspot.y * 100}%`
                    : 'center',
                }}
              />
            </motion.div>
          )}
        </div>

        {/* Right Column: Content */}
        <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-24 pt-4">
          
          {/* 1. Bio & Statement */}
          <motion.section 
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.8, ease: easeSilk}}
            className="flex flex-col gap-8"
          >
            {data.bio && (
              <div className="text-xl md:text-2xl font-light text-brand-charcoal text-balance">
                {data.bio}
              </div>
            )}
            {data.artistStatement && (
              <div className="prose prose-lg prose-neutral font-light leading-relaxed max-w-none text-brand-charcoal border-l border-brand-charcoal/10 pl-6 lg:pl-10">
                <PortableText value={data.artistStatement} />
              </div>
            )}
          </motion.section>

          {/* 2. Education */}
          {education.length > 0 && (
            <motion.section
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8, ease: easeSilk, delay: 0.1}}
              className="flex flex-col gap-8"
            >
              <h2 className="text-[11px] md:text-xs uppercase tracking-[0.3em] font-medium text-brand-charcoal/40 border-b border-brand-charcoal/10 pb-4">
                {t('education_label')}
              </h2>
              <ul className="flex flex-col gap-8">
                {education.map((item, i) => (
                  <li key={item._key || i} className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 text-sm text-brand-charcoal">
                    <div className="sm:col-span-1 text-brand-charcoal/50 tabular-nums">{item.year}</div>
                    <div className="sm:col-span-3">
                      <div className="font-medium">{item.institution}</div>
                      {item.description && <div className="text-brand-charcoal/60 mt-2 font-light leading-relaxed">{item.description}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* 3. Exhibitions */}
          {exhibitions.length > 0 && (
            <motion.section
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8, ease: easeSilk, delay: 0.2}}
              className="flex flex-col gap-8"
            >
              <h2 className="text-[11px] md:text-xs uppercase tracking-[0.3em] font-medium text-brand-charcoal/40 border-b border-brand-charcoal/10 pb-4">
                {t('exhibitions_label')}
              </h2>
              <ul className="flex flex-col gap-6">
                {exhibitions.map((item, i) => (
                  <li key={item._key || i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 text-sm text-brand-charcoal">
                    <div className="sm:col-span-3 lg:col-span-2 text-brand-charcoal/50 tabular-nums">{item.year}</div>
                    <div className="sm:col-span-9 lg:col-span-10 flex flex-col items-start gap-1">
                      <div className="w-full">
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-charcoal transition-colors underline-offset-4 decoration-brand-charcoal/20 hover:underline">
                            {item.title}
                          </a>
                        ) : (
                          <span>{item.title}</span>
                        )}
                      </div>
                      {item.description && <div className="text-brand-charcoal/60 font-light w-full">{item.description}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* 4. Projects */}
          {projects.length > 0 && (
            <motion.section
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8, ease: easeSilk, delay: 0.3}}
              className="flex flex-col gap-8"
            >
              <h2 className="text-[11px] md:text-xs uppercase tracking-[0.3em] font-medium text-brand-charcoal/40 border-b border-brand-charcoal/10 pb-4">
                {t('projects_label')}
              </h2>
              <ul className="flex flex-col gap-6">
                {projects.map((item, i) => (
                  <li key={item._key || i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 text-sm text-brand-charcoal">
                    <div className="sm:col-span-3 lg:col-span-2 text-brand-charcoal/50 tabular-nums">{item.year}</div>
                    <div className="sm:col-span-9 lg:col-span-10 flex flex-col items-start gap-1">
                      <div className="w-full">
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-charcoal transition-colors underline-offset-4 decoration-brand-charcoal/20 hover:underline">
                            {item.title}
                          </a>
                        ) : (
                          <span>{item.title}</span>
                        )}
                      </div>
                      {item.description && <div className="text-brand-charcoal/60 font-light w-full">{item.description}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* 5. Bibliography */}
          {publications.length > 0 && (
            <motion.section
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8, ease: easeSilk, delay: 0.4}}
              className="flex flex-col gap-8"
            >
              <h2 className="text-[11px] md:text-xs uppercase tracking-[0.3em] font-medium text-brand-charcoal/40 border-b border-brand-charcoal/10 pb-4">
                {t('bibliography_label')}
              </h2>
              <ul className="flex flex-col gap-6">
                {publications.map((item, i) => (
                  <li key={item._key || i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 text-sm text-brand-charcoal">
                    <div className="sm:col-span-3 lg:col-span-2 text-brand-charcoal/50 tabular-nums">{item.year}</div>
                    <div className="sm:col-span-9 lg:col-span-10 flex flex-col items-start gap-1">
                      <div className="font-semibold w-full">
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-charcoal transition-colors underline-offset-4 decoration-brand-charcoal/20 hover:underline">
                            {item.title}
                          </a>
                        ) : (
                          <span>{item.title}</span>
                        )}
                      </div>
                      <div className="text-brand-charcoal/60 font-light pt-1 flex flex-wrap gap-x-2">
                        {item.institution && <span>{item.institution}</span>}
                        {item.role && <span className="italic text-brand-charcoal/50">[{item.role}]</span>}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* 6. Network */}
          {data.networkLinks && data.networkLinks.length > 0 && (
            <motion.section
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8, ease: easeSilk, delay: 0.5}}
              className="flex flex-col gap-8"
            >
              <h2 className="text-[11px] md:text-xs uppercase tracking-[0.3em] font-medium text-brand-charcoal/40 border-b border-brand-charcoal/10 pb-4">
                {t('network_label')}
              </h2>
              <ul className="flex flex-col gap-4 pl-0">
                {data.networkLinks.map((link, i) => (
                  <li key={link._key || i} className="flex">
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-brand-charcoal/70 hover:text-brand-charcoal hover:underline underline-offset-[6px] decoration-brand-charcoal/20 transition-all block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

        </div>
      </div>
    </div>
  );
}
