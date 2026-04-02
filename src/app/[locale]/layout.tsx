import "@/app/globals.css";
import Navigation from "@/components/Navigation";
import NewsletterForm from "@/components/NewsletterForm";
import { Link, routing } from "@/i18n/routing";
import { getSiteSettings } from "@/lib/queries";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Crimson_Pro, Inter } from "next/font/google";
import { notFound } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["200", "300", "400"],
});

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const { children } = props;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const settings = await getSiteSettings(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${crimsonPro.variable} antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="min-h-screen pt-32 md:pt-16 md:ml-64 px-6 md:px-16 max-w-screen-2xl pb-24">
            {children}
          </main>

          {/* Subtle footer */}
          <footer className="px-6 md:px-12 py-16 max-w-screen-2xl mx-auto flex flex-col space-y-12 md:space-y-0 md:flex-row justify-between items-start md:items-center text-[10px] uppercase tracking-widest transition-all">
            <div className="flex flex-col space-y-2 opacity-40"> 
               <div>© 2026 Ella Becker. All rights reserved.</div>
               <div>Website by <a href="https://codeillustrated.com/labs" className='underline font-medium' target="_blank" rel="noopener noreferrer">Code Illustrated Labs</a></div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start md:items-center">
              <NewsletterForm 
                title={settings?.newsletterTitle} 
                subtitle={settings?.newsletterSubtitle}
                submitLabel={settings?.newsletterSubmitLabel} 
              />
              
              <div className="flex space-x-6 opacity-40">
                <a href="https://www.instagram.com/ellarbecker" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                  Instagram
                </a>
                <Link
                  href="/contact"
                  className="hover:opacity-100 transition-opacity"
                >
                  Contact
                </Link>
              </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
