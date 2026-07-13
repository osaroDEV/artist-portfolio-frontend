import {getGalleryItems, getSiteSettings} from '@/lib/queries';
import PortfolioView from '@/components/PortfolioView';
import {getTranslations} from 'next-intl/server';
import Hero from '@/components/Hero';

export default async function HomePage(props: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await props.params;

  const [rawItems, settings, t] = await Promise.all([
    getGalleryItems(locale),
    getSiteSettings(locale),
    getTranslations({locale, namespace: 'Nav'})
  ]);

  const items = rawItems;

  const heroImage = settings?.heroRecently || settings?.heroPaintings || settings?.heroDrawings || settings?.heroPhotography;

  return (
    <div className="space-y-16 md:space-y-24">
      {heroImage ? (
        <div className="-mx-6 md:-mx-16 -mt-32 md:-mt-24 mb-16 md:mb-24">
          <Hero 
            image={heroImage} 
            title={t('portfolio')}
            subtitle={t('featured_works' as any) || t('portfolio')}
          />
        </div>
      ) : (
        <header className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 italic">{t('portfolio')}</h2>
          <div className="h-px w-16 bg-brand-charcoal opacity-20" />
        </header>
      )}

      <PortfolioView initialItems={items} />
    </div>
  );
}
