/**
 * JSON-LD builders.
 *
 * Every value here comes from the same objects the pages render — the content
 * collections and the config singletons — so structured data cannot drift from
 * visible content. Nothing is re-typed.
 *
 * Absent fields are omitted rather than emitted empty: incomplete structured
 * data is fine, wrong structured data is not.
 */

import { site } from '../data/site';

type Json = Record<string, unknown>;

/** Drops undefined, null, empty strings, and empty arrays, recursively. */
const prune = (obj: Json): Json =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === undefined || v === null || v === '') return false;
      if (Array.isArray(v)) return v.length > 0;
      return true;
    })
  );

const absolute = (path: string): string =>
  new URL(path, site.brand.domain).href;

export function organizationSchema(): Json {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.brand.name,
    legalName: site.brand.legalName?.startsWith('[[') ? undefined : site.brand.legalName,
    url: site.brand.domain,
    description: site.brand.tagline?.startsWith('[[') ? undefined : site.brand.tagline,
    email: site.contact.general,
    telephone: site.contact.phone,
    sameAs: site.social.map((s) => s.url),
    address: site.address
      ? prune({
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.zip,
          addressCountry: site.address.country,
        })
      : undefined,
  });
}

interface FlavorLike {
  id: string;
  data: {
    name: string;
    description?: string;
    upc?: string;
    canSizeFlOz?: number;
    ingredients?: string[];
    nutrition?: {
      calories?: number;
      servingSizeFlOz?: number;
      sodiumMg?: number;
      totalCarbohydrateG?: number;
      proteinG?: number;
      totalFatG?: number;
      totalSugarsG?: number;
      dietaryFiberG?: number;
    };
  };
}

export function productSchema(flavor: FlavorLike): Json {
  const d = flavor.data;
  const n = d.nutrition;

  // Placeholder strings must never reach structured data.
  const clean = (s?: string) => (s?.startsWith('[[') ? undefined : s);

  return prune({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: clean(d.name) ?? d.name,
    description: clean(d.description),
    gtin: d.upc,
    brand: prune({ '@type': 'Brand', name: site.brand.name }),
    url: absolute(`/product/${flavor.id}`),
    size: d.canSizeFlOz ? `${d.canSizeFlOz} fl oz` : undefined,
    nutrition: n
      ? prune({
          '@type': 'NutritionInformation',
          servingSize: n.servingSizeFlOz ? `${n.servingSizeFlOz} fl oz` : undefined,
          calories: n.calories !== undefined ? `${n.calories} calories` : undefined,
          sodiumContent: n.sodiumMg !== undefined ? `${n.sodiumMg} mg` : undefined,
          carbohydrateContent:
            n.totalCarbohydrateG !== undefined ? `${n.totalCarbohydrateG} g` : undefined,
          sugarContent: n.totalSugarsG !== undefined ? `${n.totalSugarsG} g` : undefined,
          fiberContent: n.dietaryFiberG !== undefined ? `${n.dietaryFiberG} g` : undefined,
          proteinContent: n.proteinG !== undefined ? `${n.proteinG} g` : undefined,
          fatContent: n.totalFatG !== undefined ? `${n.totalFatG} g` : undefined,
        })
      : undefined,
  });
}

interface LocationLike {
  data: {
    name: string;
    address1?: string;
    city?: string;
    state: string;
    zip?: string;
    lat?: number;
    lng?: number;
    url?: string;
    phone?: string;
  };
}

/**
 * A stockist is a LocalBusiness that carries the product — not the brand
 * itself. Emitted per store on the where-to-buy page.
 */
export function localBusinessSchema(location: LocationLike): Json {
  const d = location.data;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: d.name,
    url: d.url,
    telephone: d.phone,
    address: prune({
      '@type': 'PostalAddress',
      streetAddress: d.address1,
      addressLocality: d.city,
      addressRegion: d.state,
      postalCode: d.zip,
      addressCountry: 'US',
    }),
    geo:
      d.lat !== undefined && d.lng !== undefined
        ? { '@type': 'GeoCoordinates', latitude: d.lat, longitude: d.lng }
        : undefined,
  });
}

interface FaqLike {
  data: { question: string; answer: string };
}

export function faqSchema(entries: FaqLike[]): Json | undefined {
  // Placeholder questions would be indexed as real FAQ content. Skip them.
  const real = entries.filter(
    (e) => !e.data.question.startsWith('[[') && !e.data.answer.startsWith('[[')
  );
  if (real.length === 0) return undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: real.map((e) => ({
      '@type': 'Question',
      name: e.data.question,
      acceptedAnswer: { '@type': 'Answer', text: e.data.answer },
    })),
  };
}
