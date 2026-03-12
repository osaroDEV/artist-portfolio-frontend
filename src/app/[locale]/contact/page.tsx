import {getSiteSettings} from '@/lib/queries';

export default async function ContactPage(props: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await props.params;

  const settings = await getSiteSettings(locale);
  // Note: For a real app, you would handle the form submission with a Server Action or API route
  
  return (
    <div className="max-w-2xl mx-auto space-y-24">
      <header className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-light italic">
          {settings?.contactTitle || 'Contact'}
        </h2>
        <div className="h-px w-12 bg-brand-charcoal opacity-20" />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Direct Contact Info */}
        <div className="space-y-8">
          <section className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-widest opacity-40">
              {settings?.emailLabel || 'Email'}
            </h3>
            <a 
              href={`mailto:${settings?.contactEmail || 'studio@ellabecker.de'}`} 
              className="text-lg font-light hover:italic transition-all inline-block"
            >
              {settings?.contactEmail || 'studio@ellabecker.de'}
            </a>
          </section>

          {settings?.instagramUrl && (
            <section className="space-y-2">
              <h3 className="text-[10px] uppercase tracking-widest opacity-40">
                {settings?.instagramLabel || 'Instagram'}
              </h3>
              <a 
                href={settings.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg font-light hover:italic transition-all inline-block"
              >
                @ellarbecker
              </a>
            </section>
          )}
        </div>

        {/* Minimalist Form */}
        <form className="space-y-12">
          <div className="space-y-1 group">
            <label className="text-[10px] uppercase tracking-widest opacity-30 group-focus-within:opacity-100 transition-opacity">
              {settings?.formNameLabel || 'Name'}
            </label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-brand-charcoal/10 py-2 focus:outline-none focus:border-brand-charcoal transition-colors font-light"
            />
          </div>

          <div className="space-y-1 group">
            <label className="text-[10px] uppercase tracking-widest opacity-30 group-focus-within:opacity-100 transition-opacity">
              {settings?.formEmailLabel || 'Email'}
            </label>
            <input 
              type="email" 
              className="w-full bg-transparent border-b border-brand-charcoal/10 py-2 focus:outline-none focus:border-brand-charcoal transition-colors font-light"
            />
          </div>

          <div className="space-y-1 group">
            <label className="text-[10px] uppercase tracking-widest opacity-30 group-focus-within:opacity-100 transition-opacity">
              {settings?.formMobileLabel || 'Mobile Number'}
            </label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-brand-charcoal/10 py-2 focus:outline-none focus:border-brand-charcoal transition-colors font-light"
            />
          </div>

          <div className="space-y-1 group">
            <label className="text-[10px] uppercase tracking-widest opacity-30 group-focus-within:opacity-100 transition-opacity">
              {settings?.formMessageLabel || 'Message'}
            </label>
            <textarea 
              rows={4}
              className="w-full bg-transparent border-b border-brand-charcoal/10 py-2 focus:outline-none focus:border-brand-charcoal transition-colors font-light resize-none"
            />
          </div>

          <button 
            type="submit" 
            className="text-[10px] uppercase tracking-[0.3em] opacity-100 border border-brand-charcoal/20 px-8 py-4 hover:bg-brand-charcoal hover:text-white transition-all duration-500"
          >
            {settings?.formSubmitLabel || 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
