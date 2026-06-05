import {getSiteSettings} from '@/lib/queries';
import NewsletterCTA from '@/components/NewsletterCTA';

export default async function ContactPage(props: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await props.params;
  const settings = await getSiteSettings(locale);

  return (
    <div className="max-w-2xl space-y-16">

      {/* ── Header + meta row ── */}
      <header className="flex flex-col gap-6">
        <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase">
          {settings?.contactTitle || 'Contact'}
        </h1>

        {/* Inline contact meta — sits under title, takes no extra column */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-1 border-t border-brand-charcoal/10">
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
      </header>

      {/* ── Contact form ── */}
      <form className="flex flex-col gap-10">
        {/* Name + Email side by side on wider screens */}
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

      {/* Subscribe CTA — must be outside <form> to avoid nested form error */}
      <NewsletterCTA
        title={settings?.newsletterTitle}
        subtitle={settings?.newsletterSubtitle}
        submitLabel={settings?.newsletterSubmitLabel}
      />

    </div>
  );
}
