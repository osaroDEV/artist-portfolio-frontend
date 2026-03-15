import {getGalleryItems, getSiteSettings} from '@/lib/queries';
import GalleryGrid from '@/components/GalleryGrid';

export default async function CategoryPage(props: {
  params: Promise<{locale: string; category: string}>;
}) {
  const {locale, category} = await props.params;

  const [items, settings] = await Promise.all([
    getGalleryItems(locale, category),
    getSiteSettings(locale)
  ]);
  
  // Mapping route name to dynamic titles from Sanity
  const categoryTitle = {
    paintings: settings?.paintingsTitle || 'Paintings',
    drawings: settings?.drawingsTitle || 'Drawings',
    photography: settings?.photographyTitle || 'Photography'
  }[category] || category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="space-y-24">
      <header className="mb-16">
        <h2 className="text-4xl md:text-5xl font-light mb-4 italic">{categoryTitle}</h2>
        <div className="h-px w-16 bg-brand-charcoal opacity-20" />
      </header>

      <GalleryGrid items={items} />

      {items.length === 0 && (
        <div className="col-span-full h-[40vh] flex items-center justify-center opacity-30 italic">
          No works found in this category.
        </div>
      )}
    </div>
  );
}

