import {getSiteSettings} from '@/lib/queries';

export default async function ContactPage(props: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await props.params;

  const settings = await getSiteSettings(locale);
  // Note: For a real app, you would handle the form submission with a Server Action or API route
  
  return (
    <div className="space-y-24">
      <header className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-widest uppercase">
          {settings?.contactTitle || 'Contact'}
        </h2>
        <div className="h-px w-12 bg-brand-charcoal opacity-10" />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32">
        {/* Direct Contact Info */}
        <div className="md:col-span-12 lg:col-span-4 space-y-12">
          {settings?.instagramUrl && (
            <section className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/70">
                {settings?.instagramLabel || 'Instagram'}
              </h3>
              <a 
                href={settings.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-base font-light hover:text-brand-charcoal transition-all inline-block border-b border-brand-charcoal/10"
              >
                @ellabecker
              </a>
            </section>
          )}
        </div>

        {/* Minimalist Form */}
        <form className="md:col-span-12 lg:col-span-8 space-y-12 max-w-2xl">
          <div className="space-y-2 group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/70 group-focus-within:text-brand-charcoal transition-colors">
              {settings?.formNameLabel || 'Name'}
            </label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-brand-charcoal/10 py-2 focus:outline-none focus:border-brand-charcoal transition-colors font-light text-sm"
            />
          </div>

          <div className="space-y-2 group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/70 group-focus-within:text-brand-charcoal transition-colors">
              {settings?.formEmailLabel || 'Email'}
            </label>
            <input 
              type="email" 
              className="w-full bg-transparent border-b border-brand-charcoal/10 py-2 focus:outline-none focus:border-brand-charcoal transition-colors font-light text-sm"
            />
          </div>
          
          <div className="space-y-2 group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/70 group-focus-within:text-brand-charcoal transition-colors">
              {settings?.formSubjectLabel || 'Subject'}
            </label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-brand-charcoal/10 py-2 focus:outline-none focus:border-brand-charcoal transition-colors font-light text-sm"
            />
          </div>

          <div className="space-y-2 group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/70 group-focus-within:text-brand-charcoal transition-colors">
              {settings?.formMessageLabel || 'Message'}
            </label>
            <textarea 
              rows={6}
              className="w-full bg-transparent border-b border-brand-charcoal/10 py-2 focus:outline-none focus:border-brand-charcoal transition-colors font-light text-sm resize-none"
            />
          </div>

          <button 
            type="submit" 
            className="text-[10px] uppercase tracking-[0.3em] text-brand-charcoal border border-brand-charcoal/20 px-10 py-5 hover:bg-brand-charcoal hover:text-white transition-all duration-500"
          >
            {settings?.formSubmitLabel || 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
