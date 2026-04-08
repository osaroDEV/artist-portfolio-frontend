import {getGalleryItems, getSiteSettings} from '@/lib/queries';
import GalleryGrid from '@/components/GalleryGrid';
import Hero from '@/components/Hero';
import {getTranslations} from 'next-intl/server';

export default async function CategoryPage(props: {
  params: Promise<{locale: string; category: string}>;
}) {
  const {locale, category} = await props.params;

  const [items, settings, t] = await Promise.all([
    getGalleryItems(locale, category),
    getSiteSettings(locale),
    getTranslations({locale, namespace: 'Nav'})
  ]);
  
  // Mapping route name to dynamic titles from Sanity with localized fallbacks
  const categoryTitle = {
    paintings: settings?.paintingsTitle || t('paintings'),
    drawings: settings?.drawingsTitle || t('drawings'),
    photography: settings?.photographyTitle || t('photography')
  }[category] || category.charAt(0).toUpperCase() + category.slice(1);

  const heroImage = {
    paintings: settings?.heroPaintings,
    drawings: settings?.heroDrawings,
    photography: settings?.heroPhotography
  }[category];

  return (
    <div className="space-y-16 md:space-y-24">
      {heroImage ? (
        <div className="-mx-6 md:-mx-16 -mt-32 md:-mt-24 mb-16 md:mb-24">
          <Hero 
            image={heroImage} 
            title={categoryTitle}
            subtitle={t('featured_works' as any) || categoryTitle}
          />
        </div>
      ) : (
        <header className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 italic">{categoryTitle}</h2>
          <div className="h-px w-16 bg-brand-charcoal opacity-20" />
        </header>
      )}

      <GalleryGrid items={items} />

      {items.length === 0 && (
        <div className="col-span-full h-[40vh] flex items-center justify-center opacity-30 italic">
          No works found in this category.
        </div>
      )}
    </div>
  );
}

