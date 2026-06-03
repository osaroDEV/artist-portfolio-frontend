import {client} from './sanity'
import {GalleryItem, RecentlyPost, SiteSettings, AboutPageData} from './types'

// Helper to build locale-specific GROQ projection
function localeString(field: string, locale: string) {
  return `"${field}": coalesce(${field}.${locale}, ${field}.en)`
}

function localePortableText(field: string, locale: string) {
  return `"${field}": coalesce(${field}.${locale}, ${field}.en)`
}

const imageProjection = `
  asset->{
    _id,
    url,
    metadata {
      dimensions,
      lqip
    }
  },
  hotspot,
  crop
`

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
    seriesRef->{
      _id,
      slug,
      ${localeString('title', locale)}
    },
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
    ${localeString('title', locale)},
    slug,
    ${localeString('excerpt', locale)},
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

export async function getRecentlyPost(locale: string, slug: string): Promise<RecentlyPost | null> {
  const query = `*[_type == "recentlyFeed" && slug.current == $slug][0] {
    _id,
    ${localeString('title', locale)},
    slug,
    ${localeString('excerpt', locale)},
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

  return client.fetch<RecentlyPost | null>(query, {slug})
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
    ${localeString('formSubjectLabel', locale)},
    ${localeString('formMessageLabel', locale)},
    ${localeString('formSubmitLabel', locale)},
    ${localeString('paintingsTitle', locale)},
    ${localeString('drawingsTitle', locale)},
    ${localeString('photographyTitle', locale)},
    ${localeString('aboutTitle', locale)},
    ${localeString('newsletterTitle', locale)},
    ${localeString('newsletterSubtitle', locale)},
    ${localeString('newsletterSubmitLabel', locale)},
    heroRecently { ${imageProjection} },
    heroPaintings { ${imageProjection} },
    heroDrawings { ${imageProjection} },
    heroPhotography { ${imageProjection} }
  }`

  return client.fetch<SiteSettings>(query)
}

export const ABOUT_QUERY = `*[_type == "aboutPage"][0] {
  portraitImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    hotspot,
    crop
  },
  "bio": coalesce(bio.$locale, bio.en),
  "artistStatement": coalesce(artistStatement.$locale, artistStatement.en),
  exhibitions[] {
    _key,
    type,
    year,
    "title": coalesce(title.$locale, title.en),
    "institution": coalesce(institution.$locale, institution.en),
    "description": coalesce(description.$locale, description.en),
    "role": coalesce(role.$locale, role.en),
    link
  },
  networkLinks[] {
    _key,
    name,
    url
  }
}`

export async function fetchAbout(locale: string): Promise<AboutPageData | null> {
  const query = `*[_type == "aboutPage"][0] {
    portraitImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    },
    ${localeString('bio', locale)},
    ${localePortableText('artistStatement', locale)},
    exhibitions[] {
      _key,
      type,
      year,
      ${localeString('title', locale)},
      ${localeString('institution', locale)},
      ${localeString('description', locale)},
      ${localeString('role', locale)},
      link
    },
    networkLinks[] {
      _key,
      name,
      url
    }
  }`
  return client.fetch<AboutPageData>(query)
}

export interface SeriesWithItems {
  _id: string;
  title: string;
  slug: { current: string };
  paintings: GalleryItem[];
}

export async function getSeriesWithItems(
  locale: string,
  slug: string,
): Promise<SeriesWithItems | null> {
  const query = `*[_type == "series" && slug.current == $slug][0] {
    _id,
    ${localeString('title', locale)},
    slug,
    "paintings": *[_type == "galleryItem" && references(^._id)] | order(order asc, year desc) {
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
      ${localePortableText('description', locale)}
    }
  }`
  return client.fetch<SeriesWithItems | null>(query, {slug})
}

export interface SeriesCover {
  _id: string;
  title: string;
  slug: { current: string };
  coverItem: GalleryItem | null;
}

export async function getSeriesCovers(locale: string): Promise<SeriesCover[]> {
  const query = `*[_type == "series"] | order(title asc) {
    _id,
    ${localeString('title', locale)},
    slug,
    "coverItem": *[_type == "galleryItem" && references(^._id)] | order(order asc, year desc)[0] {
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
      ${localePortableText('description', locale)}
    }
  }`
  return client.fetch<SeriesCover[]>(query)
}
