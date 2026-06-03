import {getRecentlyFeed, getSiteSettings} from '@/lib/queries';
import Image from 'next/image';
import {urlFor} from '@/lib/sanity';
import {format} from 'date-fns';
import {de, enUS, fr} from 'date-fns/locale';
import Hero from '@/components/Hero';
import {Link} from '@/i18n/routing';

const dateLocales = {en: enUS, de, fr};

export default async function RecentlyPage(props: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await props.params;

  const [posts, settings] = await Promise.all([
    getRecentlyFeed(locale),
    getSiteSettings(locale)
  ]);
  
  const dateLocale = dateLocales[locale as keyof typeof dateLocales] || enUS;
  const heroImage = settings?.heroRecently;

  return (
    <div className="max-w-screen-2xl mx-auto">
      {heroImage ? (
        <div className="-mx-6 md:-mx-16 -mt-32 md:-mt-24 mb-24 md:mb-32">
          <Hero 
            image={heroImage} 
            title="Recently" 
            subtitle="Updates & Journal" 
          />
        </div>
      ) : (
        <header className="mb-24 px-6 md:px-16">
          <h2 className="text-4xl md:text-6xl font-light mb-4 italic">Recently</h2>
          <div className="h-px w-24 bg-brand-charcoal opacity-20" />
        </header>
      )}

      <div className="max-w-4xl mx-auto px-6 md:px-0 space-y-24 md:space-y-32">
        {posts.map((post) => (
          <article key={post._id} className="group relative border-b border-brand-charcoal/5 pb-24 md:pb-32 last:border-0">
            <Link href={`/recently/${post.slug?.current || '#'}`} className="block">
              <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                {/* Date/Sidebar */}
                <div className="md:w-32 flex-shrink-0 pt-2">
                  <time className="text-[10px] uppercase tracking-widest opacity-40">
                    {format(new Date(post.publishedAt), 'MMMM yyyy', {locale: dateLocale})}
                  </time>
                </div>

                {/* Content Preview */}
                <div className="flex-grow space-y-6">
                  <h3 className="text-2xl md:text-3xl font-serif font-light group-hover:text-brand-pink transition-colors">
                    {post.title}
                  </h3>
                  
                  {post.image && (
                    <div 
                      className="relative bg-neutral-100 overflow-hidden"
                      style={{ aspectRatio: post.image?.asset?.metadata?.dimensions?.aspectRatio || '16/9' }}
                    >
                      <Image
                        src={urlFor(post.image).width(1200).url()}
                        alt={post.image.alt || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        placeholder="blur"
                        blurDataURL={post.image.asset.metadata.lqip}
                      />
                    </div>
                  )}

                  {post.excerpt && (
                    <p className="text-sm opacity-70 leading-relaxed max-w-prose">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity flex items-center gap-2 pt-4">
                    {locale === 'de' ? 'Weiterlesen' : 'Read more'} <span className="text-brand-pink transition-transform group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="h-[40vh] flex items-center justify-center opacity-40 italic">
          No recent updates.
        </div>
      )}
    </div>
  );
}
