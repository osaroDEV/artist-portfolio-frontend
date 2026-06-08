import {getSiteSettings} from '@/lib/queries';
import NewsletterCTA from '@/components/NewsletterCTA';

export default async function ContactPage(props: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await props.params;
  const settings = await getSiteSettings(locale);

  return (
    <div className="w-full space-y-20">

      {/* ── Page title ── */}
      <header>
        <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase">
          {settings?.contactTitle || 'Contact'}
        </h1>
      </header>

      {/* ── Two-column desktop layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

        {/* ── LEFT: Contact form ── */}
        <div className="flex flex-col gap-10">

          {/* Inline contact meta */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pb-6 border-b border-brand-charcoal/10">
            {settings?.contactEmail && (
              <a
                href={`mailto:${settings.contactEmail}`}
                className="text-[11px] uppercase tracking-[0.22em] text-brand-charcoal/50 hover:text-brand-charcoal transition-colors"
              >
                {settings.contactEmail}
              </a>
            )}
            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] uppercase tracking-[0.22em] text-brand-charcoal/50 hover:text-brand-charcoal transition-colors"
              >
                {settings?.instagramLabel || 'Instagram'} ↗
              </a>
            )}
          </div>

          <form className="flex flex-col gap-10">
            {/* Name + Email side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/40 group-focus-within:text-brand-charcoal transition-colors">
                  {settings?.formNameLabel || 'Name'}
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-brand-charcoal/10 py-2.5 focus:outline-none focus:border-brand-charcoal transition-colors font-light text-sm"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/40 group-focus-within:text-brand-charcoal transition-colors">
                  {settings?.formEmailLabel || 'Email'}
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-brand-charcoal/10 py-2.5 focus:outline-none focus:border-brand-charcoal transition-colors font-light text-sm"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/40 group-focus-within:text-brand-charcoal transition-colors">
                {settings?.formSubjectLabel || 'Subject'}
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-brand-charcoal/10 py-2.5 focus:outline-none focus:border-brand-charcoal transition-colors font-light text-sm"
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/40 group-focus-within:text-brand-charcoal transition-colors">
                {settings?.formMessageLabel || 'Message'}
              </label>
              <textarea
                rows={7}
                className="w-full bg-transparent border-b border-brand-charcoal/10 py-2.5 focus:outline-none focus:border-brand-charcoal transition-colors font-light text-sm resize-none"
              />
            </div>

            <div>
              <button
                type="submit"
                className="text-[10px] uppercase tracking-[0.3em] text-brand-charcoal border border-brand-charcoal/20 px-10 py-4 hover:bg-brand-charcoal hover:text-white transition-all duration-500"
              >
                {settings?.formSubmitLabel || 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* ── RIGHT: Studio info panel ── */}
        <div className="lg:pl-8 xl:pl-16 flex flex-col gap-12 lg:border-l border-brand-charcoal/10">

          {/* Studio address block */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-charcoal/40 font-medium">
              Studio
            </p>
            <address className="not-italic flex flex-col gap-2">
              <span className="text-[13px] font-light text-brand-charcoal/70 tracking-wide leading-relaxed">
                Ella Becker
              </span>
              <span className="text-[13px] font-light text-brand-charcoal/50 tracking-wide leading-relaxed">
                Atelierhaus Auguste
              </span>
              <span className="text-[13px] font-light text-brand-charcoal/50 tracking-wide leading-relaxed">
                Auguste-Viktoria-Allee 99–100
              </span>
              <span className="text-[13px] font-light text-brand-charcoal/50 tracking-wide leading-relaxed">
                13403 Berlin
              </span>
            </address>
          </div>

          {/* Divider */}
          <div className="w-8 h-px bg-brand-charcoal/15" />

          {/* Direct contact */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-charcoal/40 font-medium">
              {locale === 'de' ? 'Direktkontakt' : 'Direct Contact'}
            </p>
            <div className="flex flex-col gap-3">
              {settings?.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="group flex items-center gap-3 text-[13px] font-light text-brand-charcoal/60 hover:text-brand-charcoal transition-colors"
                >
                  <span className="w-4 h-px bg-brand-charcoal/20 group-hover:w-6 group-hover:bg-brand-charcoal transition-all duration-300" />
                  {settings.contactEmail}
                </a>
              )}
              {settings?.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-[13px] font-light text-brand-charcoal/60 hover:text-brand-charcoal transition-colors"
                >
                  <span className="w-4 h-px bg-brand-charcoal/20 group-hover:w-6 group-hover:bg-brand-charcoal transition-all duration-300" />
                  {settings?.instagramLabel || 'Instagram'} ↗
                </a>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="w-8 h-px bg-brand-charcoal/15" />

          {/* Response note */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-charcoal/40 font-medium">
              {locale === 'de' ? 'Hinweis' : 'Note'}
            </p>
            <p className="text-[13px] font-light text-brand-charcoal/50 leading-relaxed max-w-sm">
              {locale === 'de'
                ? 'Anfragen zu Ausstellungen, Kooperationen und Ankäufen sind herzlich willkommen. Ich melde mich in der Regel innerhalb von 3–5 Werktagen.'
                : 'Enquiries about exhibitions, collaborations and acquisitions are warmly welcome. I typically respond within 3–5 working days.'}
            </p>
          </div>

        </div>
      </div>

      {/* ── Newsletter CTA — full width below both columns ── */}
      <NewsletterCTA
        title={settings?.newsletterTitle}
        subtitle={settings?.newsletterSubtitle}
        submitLabel={settings?.newsletterSubmitLabel}
      />

    </div>
  );
}
