import {fetchAbout, getSiteSettings} from '@/lib/queries';
import {getTranslations} from 'next-intl/server';
import AboutPageClient from '@/components/about/AboutPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});
  
  return {
    title: t('about_title'),
  };
}

export default async function AboutPageRoute({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const [data, settings] = await Promise.all([
    fetchAbout(locale),
    getSiteSettings(locale)
  ]);

  if (!data) return null;

  return <AboutPageClient data={data} title={settings?.aboutTitle || 'About'} />;
}
