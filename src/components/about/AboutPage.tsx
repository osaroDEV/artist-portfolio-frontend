'use client';

import {AboutPageData} from '@/lib/types';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {PortableText} from '@portabletext/react';

const easeSilk: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectionVariants = {
  hidden: {opacity: 0, y: 16},
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {duration: 0.75, ease: easeSilk, delay},
  }),
};

/** Full-width CV section with label + list */
function CvSection({
  label,
  items,
  renderItem,
  delay = 0,
}: {
  label: string;
  items: {_key?: string}[];
  renderItem: (item: any, i: number) => React.ReactNode;
  delay?: number;
}) {
  if (!items.length) return null;
  return (
    <motion.section
      custom={delay}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true}}
      className="flex flex-col gap-4"
    >
      <h2 className="text-[11px] uppercase tracking-[0.22em] font-medium text-brand-charcoal/40 pb-3 border-b border-brand-charcoal/10">
        {label}
      </h2>
      <ul className="flex flex-col gap-1.5">
        {items.map((item: any, i) => (
          <li key={item._key || i} className="text-[15px] leading-[1.7] text-brand-charcoal/80">
            {renderItem(item, i)}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

function ShowLine({item}: {item: any}) {
  return (
    <span>
      {item.year && (
        <span className="text-brand-charcoal/40 tabular-nums mr-2">{item.year}</span>
      )}
      {item.link ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer"
          className="hover:underline underline-offset-4 decoration-brand-charcoal/30">
          {item.title}
        </a>
      ) : (
        <span>{item.title}</span>
      )}
      {item.institution && <span className="text-brand-charcoal/50">, {item.institution}</span>}
      {item.description && <span className="text-brand-charcoal/40"> {item.description}</span>}
    </span>
  );
}

function EducationLine({item}: {item: any}) {
  return (
    <span>
      {item.year && <span className="text-brand-charcoal/40 tabular-nums mr-2">{item.year}</span>}
      <span>{item.description || item.title}</span>
      {item.institution && <span className="text-brand-charcoal/50">, {item.institution}</span>}
    </span>
  );
}

function ProjectLine({item}: {item: any}) {
  return (
    <span>
      {item.year && <span className="text-brand-charcoal/40 tabular-nums mr-2">{item.year}</span>}
      {item.link ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer"
          className="hover:underline underline-offset-4 decoration-brand-charcoal/30">
          {item.title}
        </a>
      ) : (
        <span>{item.title}</span>
      )}
      {item.institution && <span className="text-brand-charcoal/50">, {item.institution}</span>}
      {item.description && <span className="text-brand-charcoal/40"> {item.description}</span>}
    </span>
  );
}

function CollectionLine({item}: {item: any}) {
  return (
    <span>
      {item.institution || item.title}
      {item.description && <span className="text-brand-charcoal/50">, {item.description}</span>}
    </span>
  );
}

export default function AboutPageClient({data, title}: {data: AboutPageData; title: string}) {
  const t = useTranslations('about');

  const shows       = data.exhibitions?.filter(e => e.type === 'solo-exhibition' || e.type === 'group-exhibition') || [];
  const education   = data.exhibitions?.filter(e => e.type === 'education') || [];
  const projects    = data.exhibitions?.filter(e => e.type === 'residency') || [];
  const collections = data.exhibitions?.filter(e => e.type === 'public-collection') || [];

  return (
    <div className="w-full flex flex-col gap-16">

      {/* ── Page heading ── */}
      <motion.div
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, ease: easeSilk}}
      >
        <h1 className="text-xs uppercase tracking-[0.3em] font-medium text-brand-charcoal/40 border-b border-brand-charcoal/10 pb-4">
          {title}
        </h1>
      </motion.div>

      {/* ── Portrait image — full-width under heading ── */}
      {data.portraitImage && (
        <motion.div
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, ease: easeSilk, delay: 0.1}}
          className="relative w-full overflow-hidden"
          style={{aspectRatio: '3 / 2'}}
        >
          <Image
            src={data.portraitImage.asset.url}
            alt="Portrait"
            fill
            priority
            placeholder={data.portraitImage.asset.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={data.portraitImage.asset.metadata?.lqip}
            sizes="(max-width: 768px) 100vw, calc(100vw - 320px)"
            className="object-cover"
            style={{
              objectPosition: data.portraitImage.hotspot
                ? `${data.portraitImage.hotspot.x * 100}% ${data.portraitImage.hotspot.y * 100}%`
                : 'center top',
            }}
          />
        </motion.div>
      )}

      {/* ── Bio & artist statement ── */}
      {(data.bio || data.artistStatement) && (
        <motion.section
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8, ease: easeSilk}}
          className="flex flex-col gap-8"
        >
          {data.bio && (
            <div className="text-2xl md:text-3xl font-light text-brand-charcoal leading-snug">
              {data.bio}
            </div>
          )}
          {data.artistStatement && (
            <div className="prose prose-base prose-neutral font-light leading-relaxed max-w-none text-brand-charcoal/80 border-l border-brand-charcoal/10 pl-6">
              <PortableText value={data.artistStatement} />
            </div>
          )}
        </motion.section>
      )}

      {/* ── CV sections — full width, stacked ── */}
      <div className="flex flex-col gap-12">
        <CvSection
          label={t('exhibitions_label')}
          items={shows}
          renderItem={(item) => <ShowLine item={item} />}
          delay={0}
        />
        <CvSection
          label={t('education_label')}
          items={education}
          renderItem={(item) => <EducationLine item={item} />}
          delay={0.05}
        />
        <CvSection
          label={t('projects_label')}
          items={projects}
          renderItem={(item) => <ProjectLine item={item} />}
          delay={0.1}
        />
        <CvSection
          label={t('collections_label')}
          items={collections}
          renderItem={(item) => <CollectionLine item={item} />}
          delay={0.15}
        />
      </div>

    </div>
  );
}
