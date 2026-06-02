import { getSeriesWithItems } from '@/lib/queries';
import GalleryGrid from '@/components/GalleryGrid';
import { Link } from '@/i18n/routing';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function SeriesDetailPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  const seriesData = await getSeriesWithItems(locale, slug);

  if (!seriesData) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <Link 
          href="/paintings" 
          className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/60 hover:text-brand-charcoal transition-colors group"
        >
          <ChevronLeft size={14} className="mr-1 group-hover:-translate-x-0.5 transition-transform" />
          Back to Paintings
        </Link>
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-charcoal/40 font-light">Series</span>
          <h2 className="text-3xl md:text-4xl font-light italic mt-1">{seriesData.title}</h2>
        </div>
        <div className="h-px w-16 bg-brand-charcoal opacity-20" />
      </header>

      <GalleryGrid items={seriesData.paintings} />

      {seriesData.paintings.length === 0 && (
        <div className="h-[40vh] flex items-center justify-center opacity-30 italic">
          No works found in this series.
        </div>
      )}
    </div>
  );
}
