import {getRecentlyFeed, getSiteSettings} from '@/lib/queries';
import {PortableText} from '@portabletext/react';
import Image from 'next/image';
import {urlFor} from '@/lib/sanity';
import {format} from 'date-fns';
import {de, enUS, fr} from 'date-fns/locale';
import Hero from '@/components/Hero';

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

      <div className="max-w-3xl mx-auto px-6 md:px-0 space-y-40">
        {posts.map((post) => (
          <article key={post._id} className="group relative">
            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
              {/* Date/Sidebar */}
              <div className="md:w-32 flex-shrink-0">
                <time className="text-[10px] uppercase tracking-widest opacity-40">
                  {format(new Date(post.publishedAt), 'MMMM yyyy', {locale: dateLocale})}
                </time>
              </div>

              {/* Content */}
              <div className="flex-grow space-y-8">
                {post.contentType === 'image' && post.image && (
                  <div className="aspect-[4/5] relative bg-neutral-100 overflow-hidden">
                    <Image
                      src={urlFor(post.image).width(1200).url()}
                      alt={post.image.alt || ''}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={post.image.asset.metadata.lqip}
                    />
                    {post.image.caption && (
                      <div className="mt-4 text-[10px] uppercase tracking-[0.2em] opacity-40 italic">
                        {post.image.caption}
                      </div>
                    )}
                  </div>
                )}

                {post.contentType === 'text' && post.body && (
                  <div className="prose prose-sm prose-neutral max-w-none">
                    <PortableText value={post.body} />
                  </div>
                )}

                {post.contentType === 'mixed' && (
                  <div className="space-y-8">
                    {post.image && (
                      <div className="aspect-[4/5] relative bg-neutral-100 overflow-hidden">
                        <Image
                          src={urlFor(post.image).width(1200).url()}
                          alt={post.image.alt || ''}
                          fill
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL={post.image.asset.metadata.lqip}
                        />
                      </div>
                    )}
                    {post.body && (
                      <div className="prose prose-sm prose-neutral max-w-none">
                        <PortableText value={post.body} />
                      </div>
                    )}
                  </div>
                )}

                {post.contentType === 'exhibition' && post.exhibitionDetails && (
                  <div className="border border-brand-charcoal/10 p-8 md:p-12 space-y-6">
                    <div className="text-[10px] uppercase tracking-widest opacity-40">Exhibition</div>
                    <h3 className="text-3xl md:text-4xl">{post.exhibitionDetails.exhibitionTitle}</h3>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{post.exhibitionDetails.venue}</p>
                      <p className="text-xs opacity-60">{post.exhibitionDetails.location}</p>
                      {post.exhibitionDetails.startDate && (
                        <p className="text-xs opacity-60 font-serif italic">
                          {format(new Date(post.exhibitionDetails.startDate), 'dd.MM')} — {post.exhibitionDetails.endDate ? format(new Date(post.exhibitionDetails.endDate), 'dd.MM.yyyy') : 'ongoing'}
                        </p>
                      )}
                    </div>
                    {post.exhibitionDetails.description && (
                      <div className="mt-8 pt-8 border-t border-brand-charcoal/5 leading-relaxed text-sm opacity-80">
                        <PortableText value={post.exhibitionDetails.description} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
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
