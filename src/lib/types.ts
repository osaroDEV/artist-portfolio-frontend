export interface LocalizedString {
  en: string;
  de?: string;
}

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
        aspectRatio: number;
      };
      lqip: string;
    };
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
  caption?: string;
}

export interface GalleryItem {
  _id: string;
  title: string;
  slug: { current: string };
  image: SanityImage;
  category: string;
  dimensions?: string;
  year?: number;
  medium?: string;
  description?: any; // Portable Text
  series?: string;
  featured?: boolean;
  order?: number;
}

export interface RecentlyPost {
  _id: string;
  title: string;
  publishedAt: string;
  contentType: 'image' | 'text' | 'exhibition' | 'mixed';
  image?: SanityImage;
  body?: any; // Portable Text
  exhibitionDetails?: {
    exhibitionTitle?: string;
    venue?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: any;
  };
  tags?: string[];
  linkedGalleryItems?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    image: { asset: { url: string; metadata: { lqip: string } } };
  }>;
}

export interface SiteSettings {
  seoTitle: string;
  seoDescription: string;
  artistStatement: any;
  aboutText: any;
  cvText: any;
  contactEmail: string;
  instagramUrl: string;
  impressum: any;
  copyrightText: string;
  contactTitle: string;
  emailLabel: string;
  instagramLabel: string;
  formNameLabel: string;
  formEmailLabel: string;
  formMobileLabel: string;
  formSubjectLabel: string;
  formMessageLabel: string;
  formSubmitLabel: string;
  paintingsTitle: string;
  drawingsTitle: string;
  photographyTitle: string;
  aboutTitle: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
  newsletterSubmitLabel: string;
}

export interface AboutExhibition {
  _key: string;
  type: 'education' | 'residency' | 'publication' | 'solo-exhibition' | 'group-exhibition';
  year?: string;
  title?: string;
  institution?: string;
  description?: string;
  role?: string;
  link?: string;
}

export interface NetworkLink {
  _key: string;
  name: string;
  url: string;
}

export interface AboutPageData {
  portraitImage: SanityImage;
  bio: string;
  artistStatement: any;
  exhibitions: AboutExhibition[];
  networkLinks: NetworkLink[];
}
