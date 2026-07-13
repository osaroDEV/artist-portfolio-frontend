import "@/app/globals.css";
import Navigation from "@/components/Navigation";
import NewsletterForm from "@/components/NewsletterForm";
import { routing } from "@/i18n/routing";
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
    <html lang={locale} suppressHydrationWarning translate="no">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${inter.variable} ${crimsonPro.variable} antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <div className="md:ml-64 flex flex-col min-h-screen">
            <main className="flex-grow pt-32 md:pt-24 px-6 md:px-16 max-w-screen-2xl w-full pb-24">
            {children}
          </main>

            {/* Subtle footer */}
            <footer className="px-6 md:px-12 py-16 mt-12 max-w-screen-2xl w-full flex flex-col space-y-16 transition-all">
              <div className="w-full">
              <NewsletterForm 
                title={settings?.newsletterTitle} 
                subtitle={settings?.newsletterSubtitle}
                submitLabel={settings?.newsletterSubmitLabel} 
              />
            </div>

            <div className="text-[10px] opacity-70 tracking-widest uppercase leading-loose max-w-4xl space-y-4">
              <div className="font-bold mb-4">{locale === 'de' ? 'IMPRESSUM' : 'IMPRINT'}</div>
              {locale === 'de' ? (
                <>
                  <p>
                    Verantwortlich für den Inhalt dieser Site: Ella Becker, Atelierhaus Auguste, Auguste-Viktoria-Allee 99-100, 13403 Berlin; studio(at)ellabecker.de
                  </p>
                  <p>
                    Copyright 2023 © by Ella Becker
                  </p>
                  <p>
                    Alle Abbildungen und Texte dieser Site sind urheberrechtlich geschützt und dürfen nicht ohne schriftliche Genehmigung der o.g. Autorin bzw. Urheberin verwendet werden. Es gilt das deutsche Urheberrecht.
                  </p>
                  <div className="font-bold mt-8 mb-2">Haftungshinweis</div>
                  <p>
                    Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Responsible for the content of this site: Ella Becker, Atelierhaus Auguste, Auguste-Viktoria-Allee 99-100, 13403 Berlin; studio(at)ellabecker.de
                  </p>
                  <p>
                    Copyright 2023 © by Ella Becker
                  </p>
                  <p>
                    All images, videos and text on this website are copyright protected. None of the contents may be reproduced in any form or by any electronic or mechanical means without permission in writing from the author Ella Becker.
                  </p>
                  <div className="font-bold mt-8 mb-2">Disclaimer</div>
                  <p>
                    Despite careful content control no liability will be accepted for the content of external links. For the content of linked pages their operators responsible.
                  </p>
                </>
              )}
            </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
