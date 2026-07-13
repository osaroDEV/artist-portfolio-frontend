import {getGalleryItems} from '@/lib/queries';
import PortfolioView from '@/components/PortfolioView';
import {getTranslations} from 'next-intl/server';

export default async function PortfolioPage(props: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await props.params;

  const [rawItems, t] = await Promise.all([
    getGalleryItems(locale),
    getTranslations({locale, namespace: 'Nav'})
  ]);

  const seriesMap = new Set<string>();
  const items: typeof rawItems = [];

  for (const item of rawItems) {
    if (item.seriesRef) {
      if (!seriesMap.has(item.seriesRef._id)) {
        seriesMap.add(item.seriesRef._id);
        items.push(item);
      }
    } else {
      items.push(item);
    }
  }

  return (
    <div className="space-y-16 md:space-y-24">
      <header className="mb-16">
        <h2 className="text-4xl md:text-5xl font-light mb-4 italic">{t('portfolio')}</h2>
        <div className="h-px w-16 bg-brand-charcoal opacity-20" />
      </header>

      <PortfolioView initialItems={items} />
    </div>
  );
}
