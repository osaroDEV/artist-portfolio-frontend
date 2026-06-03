import {getRecentlyPost} from '@/lib/queries';
import {PortableText} from '@portabletext/react';
import Image from 'next/image';
import {urlFor} from '@/lib/sanity';
import {format} from 'date-fns';
import {de, enUS, fr} from 'date-fns/locale';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/routing';

const dateLocales = {en: enUS, de, fr};

export default async function RecentlyPostPage(props: {
  params: Promise<{locale: string, slug: string}>;
}) {
  const {locale, slug} = await props.params;
  const post = await getRecentlyPost(locale, slug);

  if (!post) {
    notFound();
  }
  
  const dateLocale = dateLocales[locale as keyof typeof dateLocales] || enUS;

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-0 py-12 md:py-24">
      <Link href="/recently" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 hover:-translate-x-2 transition-all mb-16">
        <span>←</span> {locale === 'de' ? 'Zurück zur Übersicht' : 'Back to overview'}
      </Link>

      <article className="space-y-12">
        <header className="space-y-6">
          <time className="text-[10px] uppercase tracking-widest opacity-40">
            {format(new Date(post.publishedAt), 'dd MMMM yyyy', {locale: dateLocale})}
          </time>
          <h1 className="text-4xl md:text-6xl font-light font-serif">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl opacity-70 leading-relaxed font-light max-w-prose">
              {post.excerpt}
            </p>
          )}
        </header>

        <div className="space-y-16 mt-16 pt-16 border-t border-brand-charcoal/5">
          {post.contentType === 'image' && post.image && (
            <div className="space-y-4">
              <div 
                className="relative bg-neutral-100 overflow-hidden w-full"
              >
                <Image
                  src={urlFor(post.image).width(1600).url()}
                  alt={post.image.alt || ''}
                  width={post.image.asset.metadata.dimensions.width}
                  height={post.image.asset.metadata.dimensions.height}
                  className="w-full h-auto object-contain"
                  placeholder="blur"
                  blurDataURL={post.image.asset.metadata.lqip}
                />
              </div>
              {post.image.caption && (
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 italic">
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
            <div className="space-y-16">
              {post.image && (
                <div className="space-y-4">
                  <div className="relative bg-neutral-100 overflow-hidden w-full">
                    <Image
                      src={urlFor(post.image).width(1600).url()}
                      alt={post.image.alt || ''}
                      width={post.image.asset.metadata.dimensions.width}
                      height={post.image.asset.metadata.dimensions.height}
                      className="w-full h-auto object-contain"
                      placeholder="blur"
                      blurDataURL={post.image.asset.metadata.lqip}
                    />
                  </div>
                  {post.image.caption && (
                    <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 italic">
                      {post.image.caption}
                    </div>
                  )}
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
            <div className="border border-brand-charcoal/10 p-8 md:p-16 space-y-8 bg-brand-charcoal/[-0.02]">
              <div className="text-[10px] uppercase tracking-widest opacity-40">Exhibition Details</div>
              <h3 className="text-3xl md:text-4xl">{post.exhibitionDetails.exhibitionTitle}</h3>
              <div className="space-y-2 text-lg">
                <p className="font-medium">{post.exhibitionDetails.venue}</p>
                <p className="opacity-70">{post.exhibitionDetails.location}</p>
                {post.exhibitionDetails.startDate && (
                  <p className="opacity-70 font-serif italic pt-4">
                    {format(new Date(post.exhibitionDetails.startDate), 'dd.MM')} — {post.exhibitionDetails.endDate ? format(new Date(post.exhibitionDetails.endDate), 'dd.MM.yyyy') : 'ongoing'}
                  </p>
                )}
              </div>
              {post.exhibitionDetails.description && (
                <div className="mt-8 pt-8 border-t border-brand-charcoal/10 leading-relaxed opacity-80 prose prose-neutral">
                  <PortableText value={post.exhibitionDetails.description} />
                </div>
              )}
            </div>
          )}

          {/* Linked Gallery Items */}
          {post.linkedGalleryItems && post.linkedGalleryItems.length > 0 && (
            <div className="mt-24 pt-16 border-t border-brand-charcoal/10">
              <h3 className="text-[10px] uppercase tracking-widest opacity-40 mb-8">Related Works</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {post.linkedGalleryItems.map((item) => (
                  <Link key={item._id} href={`/gallery/${item.slug.current}`} className="group block space-y-4">
                    <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                      <Image
                        src={item.image.asset.url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        placeholder="blur"
                        blurDataURL={item.image.asset.metadata.lqip}
                      />
                    </div>
                    <div className="text-xs tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                      {item.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
