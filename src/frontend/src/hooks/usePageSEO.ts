import { useEffect } from "react";

interface HreflangEntry {
  lang: string;
  url: string;
}

interface PageSEOOptions {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  googlebot?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogLocale?: string;
  ogSiteName?: string;
  twitterCard?: string;
  schema?: object | object[];
  hreflangs?: HreflangEntry[];
}

function upsertMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    const [attrName, attrVal] = attr.split("=");
    el.setAttribute(attrName, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export function usePageSEO(options: PageSEOOptions) {
  const {
    title,
    description,
    canonical,
    robots = "index, follow",
    googlebot = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    ogType = "website",
    ogTitle,
    ogDescription,
    ogImage,
    ogLocale = "en_GB",
    ogSiteName = "Gemora Global",
    twitterCard = "summary_large_image",
    schema,
    hreflangs,
  } = options;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    // Canonical
    let canonicalEl = document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical;

    // Robots meta
    upsertMeta("meta[name='robots']", "name=robots", robots);
    upsertMeta("meta[name='googlebot']", "name=googlebot", googlebot);

    // Description
    upsertMeta("meta[name='description']", "name=description", description);

    // OG tags
    upsertMeta("meta[property='og:type']", "property=og:type", ogType);
    upsertMeta("meta[property='og:url']", "property=og:url", canonical);
    upsertMeta(
      "meta[property='og:title']",
      "property=og:title",
      ogTitle || title,
    );
    upsertMeta(
      "meta[property='og:description']",
      "property=og:description",
      ogDescription || description,
    );
    if (ogImage)
      upsertMeta("meta[property='og:image']", "property=og:image", ogImage);
    upsertMeta("meta[property='og:locale']", "property=og:locale", ogLocale);
    upsertMeta(
      "meta[property='og:site_name']",
      "property=og:site_name",
      ogSiteName,
    );

    // Twitter
    upsertMeta("meta[name='twitter:card']", "name=twitter:card", twitterCard);
    upsertMeta(
      "meta[name='twitter:title']",
      "name=twitter:title",
      ogTitle || title,
    );
    upsertMeta(
      "meta[name='twitter:description']",
      "name=twitter:description",
      ogDescription || description,
    );
    if (ogImage)
      upsertMeta("meta[name='twitter:image']", "name=twitter:image", ogImage);

    // JSON-LD Schema
    if (schema) {
      const existing = document.getElementById("page-schema");
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-schema";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Hreflang alternate links
    const injectedHreflangs: HTMLLinkElement[] = [];
    if (hreflangs && hreflangs.length > 0) {
      // Remove any previously injected hreflang links
      for (const el of document.querySelectorAll(
        "link[rel='alternate'][hreflang]",
      )) {
        el.remove();
      }
      for (const { lang, url } of hreflangs) {
        const link = document.createElement("link");
        link.rel = "alternate";
        link.setAttribute("hreflang", lang);
        link.href = url;
        document.head.appendChild(link);
        injectedHreflangs.push(link);
      }
    }

    return () => {
      document.title = prevTitle;
      for (const el of injectedHreflangs) el.remove();
    };
  }, [
    title,
    description,
    canonical,
    robots,
    googlebot,
    ogType,
    ogTitle,
    ogDescription,
    ogImage,
    ogLocale,
    ogSiteName,
    twitterCard,
    schema,
    hreflangs,
  ]);
}
