import {getSiteSettings} from '@/lib/queries';
import {PortableText} from '@portabletext/react';

export default async function AboutPage(props: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await props.params;

  const settings = await getSiteSettings(locale);

  if (!settings) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-32">
      {/* Artist Statement */}
      {settings.artistStatement && (
        <section className="text-center md:text-left">
          <div className="prose prose-lg md:prose-xl prose-neutral font-serif italic font-light leading-relaxed max-w-none opacity-90">
            <PortableText value={settings.artistStatement} />
          </div>
        </section>
      )}

      {/* Bio / About */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-24">
        <section className="md:col-span-3 space-y-8">
          <h2 className="text-[10px] uppercase tracking-[0.3em] opacity-40 border-b border-brand-charcoal/10 pb-4">Biography</h2>
          <div className="prose prose-sm prose-neutral max-w-none leading-loose">
            <PortableText value={settings.aboutText} />
          </div>
        </section>

        {/* CV / Exhibition History */}
        <section className="md:col-span-2 space-y-8">
          <h2 className="text-[10px] uppercase tracking-[0.3em] opacity-40 border-b border-brand-charcoal/10 pb-4">Exhibitions</h2>
          <div className="text-xs space-y-1 CV-portable-text opacity-80">
            <PortableText value={settings.cvText} />
          </div>
        </section>
      </div>
    </div>
  );
}
