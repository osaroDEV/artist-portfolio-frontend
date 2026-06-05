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

/** Renders a section with a bold header and a plain list of entries */
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
      <h2 className="text-[10px] uppercase tracking-[0.22em] font-bold text-brand-charcoal pb-2 border-b border-brand-charcoal/10">
        {label}
      </h2>
      <ul className="flex flex-col gap-1.5">
        {items.map((item: any, i) => (
          <li key={item._key || i} className="text-[13px] leading-[1.6] text-brand-charcoal/80">
            {renderItem(item, i)}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

/** Renders a single show / exhibition line: "year title, institution (note)" */
function ShowLine({item}: {item: any}) {
  return (
    <span>
      {item.year && (
        <span className="text-brand-charcoal/50 tabular-nums mr-2">{item.year}</span>
      )}
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-4 decoration-brand-charcoal/30"
        >
          {item.title}
        </a>
      ) : (
        <span>{item.title}</span>
      )}
      {item.institution && (
        <span className="text-brand-charcoal/60">, {item.institution}</span>
      )}
      {item.description && (
        <span className="text-brand-charcoal/50"> {item.description}</span>
      )}
    </span>
  );
}

/** Renders an education entry as a prose block */
function EducationLine({item}: {item: any}) {
  const parts = [item.year, item.description || item.title, item.institution]
    .filter(Boolean)
    .join(' – ');
  return <span>{parts}</span>;
}

/** Renders a projects / scholarships entry */
function ProjectLine({item}: {item: any}) {
  return (
    <span>
      {item.year && (
        <span className="text-brand-charcoal/50 tabular-nums mr-2">{item.year}</span>
      )}
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-4 decoration-brand-charcoal/30"
        >
          {item.title}
        </a>
      ) : (
        <span>{item.title}</span>
      )}
      {item.institution && (
        <span className="text-brand-charcoal/60">, {item.institution}</span>
      )}
      {item.description && (
        <span className="text-brand-charcoal/50"> {item.description}</span>
      )}
    </span>
  );
}

/** Renders a public-collection entry: just the institution name */
function CollectionLine({item}: {item: any}) {
  return (
    <span>
      {item.institution || item.title}
      {item.description && (
        <span className="text-brand-charcoal/50">, {item.description}</span>
      )}
    </span>
  );
}

export default function AboutPageClient({data, title}: {data: AboutPageData; title: string}) {
  const t = useTranslations('about');

  const shows = data.exhibitions?.filter(
    (e) => e.type === 'solo-exhibition' || e.type === 'group-exhibition',
  ) || [];
  const education = data.exhibitions?.filter((e) => e.type === 'education') || [];
  const projects = data.exhibitions?.filter((e) => e.type === 'residency') || [];
  const collections = data.exhibitions?.filter((e) => e.type === 'public-collection') || [];

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">

        {/* ── Left Column: Portrait ── */}
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
                placeholder={data.portraitImage.asset.metadata?.lqip ? 'blur' : 'empty'}
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

        {/* ── Right Column: Content ── */}
        <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-16 pt-4">

          {/* Page title */}
          <div>
            <h1 className="text-[11px] md:text-xs uppercase tracking-[0.3em] font-medium text-brand-charcoal/40 border-b border-brand-charcoal/10 pb-4">
              {title}
            </h1>
          </div>

          {/* Bio & Statement */}
          {(data.bio || data.artistStatement) && (
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
          )}

          {/* ── 2-column CV table ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">

            {/* LEFT: Shows */}
            <CvSection
              label={t('exhibitions_label')}
              items={shows}
              renderItem={(item) => <ShowLine item={item} />}
              delay={0}
            />

            {/* RIGHT: Education, Projects & Scholarships, Collections */}
            <div className="flex flex-col gap-14">

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

              {collections.length > 0 && (
                <CvSection
                  label={t('collections_label')}
                  items={collections}
                  renderItem={(item) => <CollectionLine item={item} />}
                  delay={0.15}
                />
              )}

            </div>
          </div>



        </div>
      </div>
    </div>
  );
}
