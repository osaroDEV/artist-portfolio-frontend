import {getFeaturedGalleryItems} from '@/lib/queries';
import GalleryGrid from '@/components/GalleryGrid';

export default async function HomePage(props: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await props.params;

  const items = await getFeaturedGalleryItems(locale);

  return (
    <div className="space-y-16">
      <GalleryGrid items={items} />
      
      {items.length === 0 && (
        <div className="col-span-full h-[50vh] flex items-center justify-center opacity-40 italic">
          Coming soon
        </div>
      )}
    </div>
  );
}
