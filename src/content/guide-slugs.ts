// Each of these Persian guides also has an English and an Italian edition.
export const guideSlugs = [
  "instagram-story-link-tracking-utm-ga4",
  "google-indexing-troubleshooting-url-inspection",
  "wordpress-headless-content-update-cache-guide",
  "instagram-management-outsourcing-access-handover-checklist",
  "ecommerce-category-page-structure-seo-guide",
  "instagram-visual-identity-content-system-guide",
  "corporate-service-page-content-guide",
  "nextjs-url-migration-redirect-guide",
  "ecommerce-product-page-content-qa-guide",
  "wordpress-headless-images-nextjs-guide",
  "corporate-website-contact-form-guide",
  "multilingual-corporate-website-guide",
  "wordpress-headless-content-preview-guide",
  "nextjs-core-web-vitals-optimization-guide",
  "nextjs-canonical-url-guide",
  "instagram-content-calendar-guide",
  "custom-ecommerce-website-or-ready-made-template",
  "corporate-website-handover-checklist",
  "custom-website-for-service-businesses",
  "nextjs-or-wordpress-headless",
  "nextjs-technical-seo-pre-launch-checklist",
] as const;

export type GuideSlug = (typeof guideSlugs)[number];

export function hasGuideEdition(slug: string): slug is GuideSlug {
  return guideSlugs.some(candidate => candidate === slug);
}
