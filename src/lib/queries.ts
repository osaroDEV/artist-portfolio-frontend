import {client} from './sanity'
import {GalleryItem, RecentlyPost, SiteSettings} from './types'

// Helper to build locale-specific GROQ projection
function localeString(field: string, locale: string) {
  return `"${field}": coalesce(${field}.${locale}, ${field}.en)`
}

function localePortableText(field: string, locale: string) {
  return `"${field}": coalesce(${field}.${locale}, ${field}.en)`
}

export async function getGalleryItems(
  locale: string,
  category?: string,
): Promise<GalleryItem[]> {
  const categoryFilter = category ? `&& category == "${category}"` : ''
  
  const query = `*[_type == "galleryItem" ${categoryFilter}] | order(order asc, year desc) {
    _id,
    ${localeString('title', locale)},
    slug,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop,
      ${localeString('alt', locale)}
    },
    category,
    dimensions,
    year,
    ${localeString('medium', locale)},
    ${localePortableText('description', locale)},
    ${localeString('series', locale)},
    featured,
    order
  }`

  return client.fetch<GalleryItem[]>(query)
}

export async function getFeaturedGalleryItems(locale: string): Promise<GalleryItem[]> {
  const query = `*[_type == "galleryItem" && featured == true] | order(order asc) {
    _id,
    ${localeString('title', locale)},
    slug,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop,
      ${localeString('alt', locale)}
    },
    category,
    dimensions,
    year,
    ${localeString('medium', locale)},
    ${localePortableText('description', locale)},
    ${localeString('series', locale)}
  }`

  return client.fetch<GalleryItem[]>(query)
}

export async function getRecentlyFeed(locale: string): Promise<RecentlyPost[]> {
  const query = `*[_type == "recentlyFeed"] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    contentType,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop,
      ${localeString('alt', locale)},
      ${localeString('caption', locale)}
    },
    ${localePortableText('body', locale)},
    exhibitionDetails {
      ${localeString('exhibitionTitle', locale)},
      ${localeString('venue', locale)},
      location,
      startDate,
      endDate,
      ${localePortableText('description', locale)}
    },
    tags,
    linkedGalleryItems[]->{
      _id,
      ${localeString('title', locale)},
      slug,
      image { asset->{ url, metadata { lqip } } }
    }
  }`

  return client.fetch<RecentlyPost[]>(query)
}

export async function getSiteSettings(locale: string): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
    ${localeString('seoTitle', locale)},
    ${localeString('seoDescription', locale)},
    ${localePortableText('artistStatement', locale)},
    ${localePortableText('aboutText', locale)},
    ${localePortableText('cvText', locale)},
    contactEmail,
    instagramUrl,
    ${localePortableText('impressum', locale)},
    ${localeString('copyrightText', locale)},
    ${localeString('contactTitle', locale)},
    ${localeString('emailLabel', locale)},
    ${localeString('instagramLabel', locale)},
    ${localeString('formNameLabel', locale)},
    ${localeString('formEmailLabel', locale)},
    ${localeString('formMobileLabel', locale)},
    ${localeString('formMessageLabel', locale)},
    ${localeString('formSubmitLabel', locale)},
    ${localeString('paintingsTitle', locale)},
    ${localeString('drawingsTitle', locale)},
    ${localeString('photographyTitle', locale)}
  }`

  return client.fetch<SiteSettings>(query)
}
