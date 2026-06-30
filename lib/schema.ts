/**
 * Reusable JSON-LD Structured Data Schema Generators for Technical SEO.
 * This library uses the dynamic `NEXT_PUBLIC_SITE_URL` to ensure environment consistency.
 */

const getBaseUrl = (): string => {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://panchal-interior.vercel.app").replace(/\/$/, "");
};

/**
 * Returns the Website Schema.
 * Useful on the main home page to establish search action capability.
 */
export function getWebsiteSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Panchal Interior",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/products?query={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Returns the Organization Schema.
 * Standardizes global brand identifiers and connects official social profiles.
 */
export function getOrganizationSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Panchal Interior & Furniture Solutions",
    "url": baseUrl,
    "logo": `${baseUrl}/images/hero.png`,
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com",
      "https://youtube.com"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919664956491",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "gu", "hi"]
    }
  };
}

/**
 * Returns the LocalBusiness Schema.
 * Identifies geo-coordinates, operating hours, and local physical address details.
 */
export function getLocalBusinessSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Panchal Interior & Furniture Solutions",
    "image": `${baseUrl}/images/hero.png`,
    "@id": `${baseUrl}/#localbusiness`,
    "url": baseUrl,
    "telephone": "+919664956491",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Panchal Complex, Near Gota Bridge, Gota",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "382481",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.083652879129598,
      "longitude": 72.52989107604581
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com",
      "https://youtube.com"
    ]
  };
}

/**
 * Returns the FurnitureStore Schema.
 * Specialized type of LocalBusiness for stores/workshops retailing custom furniture.
 */
export function getFurnitureStoreSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Panchal Interior & Furniture Solutions",
    "image": `${baseUrl}/images/sofa_set.png`,
    "@id": `${baseUrl}/#furniturestore`,
    "url": baseUrl,
    "telephone": "+919664956491",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Panchal Complex, Near Gota Bridge, Gota",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "382481",
      "addressCountry": "IN"
    }
  };
}

/**
 * Returns the FAQ Schema for search snippet expansion.
 */
export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Returns the Breadcrumb Schema to represent structural paths.
 * @param items Array of breadcrumb segments containing relative path (without baseUrl) and display name.
 */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.path.startsWith("http") ? item.path : `${baseUrl}${item.path.startsWith("/") ? "" : "/"}${item.path}`
    }))
  };
}
