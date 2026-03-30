# Gemora Global — SEO Landing Pages & Homepage Title Update

## Current State
- 9 public pages: Home, About, Products, ProductDetail, Wholesale, WhyChooseUs, ExportMarkets, Gallery, Blog, BlogPost, Contact
- Homepage title: "Imitation Jewellery Exporter & Manufacturer in India | Gemora Global"
- Routes defined in App.tsx
- sitemap.xml in public folder only has hash-based anchor URLs (not proper page URLs)
- Admin panel functional but user reports issues

## Requested Changes (Diff)

### Add
- 11 unique SEO landing pages (removing duplicates from user list):
  1. `/imitation-jewellery-exporter-india` — target: imitation jewellery exporter india
  2. `/wholesale-imitation-jewellery` — target: wholesale imitation jewellery supplier
  3. `/bridal-jewellery-wholesale` — target: bridal imitation jewellery wholesale
  4. `/fashion-jewellery-exporter` — target: fashion jewellery exporter worldwide
  5. `/custom-jewellery-manufacturer` — target: custom imitation jewellery manufacturer
  6. `/wholesale-imitation-jewellery-india` — target: wholesale imitation jewellery india
  7. `/fashion-jewellery-manufacturer-india` — target: fashion jewellery manufacturer india
  8. `/bridal-imitation-jewellery-wholesale` — target: bridal jewellery sets wholesale supplier
  9. `/bulk-jewellery-supplier` — target: bulk fashion jewellery supplier
  10. `/jewellery-exporter-to-usa` — target: imitation jewellery exporter india to usa
  11. `/jewellery-supplier-uk` — target: imitation jewellery supplier uk
  12. `/jewellery-exporter-uae` — target: imitation jewellery exporter uae
  13. `/private-label-jewellery-india` — target: private label jewellery manufacturer india
- Each SEO page must have: unique H1, H2 (Benefits, Product categories, Why choose us, Export countries, FAQ), 2000+ words body copy, meta title, meta description, JSON-LD schema, internal links to other pages, WhatsApp CTA, Get Catalog CTA, Inquiry form, Trust badges
- Update sitemap.xml to include all new SEO pages + existing 9 pages with proper full URLs (no hash anchors)

### Modify
- Homepage title tag: change to "Best Imitation Jewellery Exporter in India | Wholesale Manufacturer & Supplier"
- Homepage meta description: "India's leading imitation jewellery manufacturer & exporter. Wholesale fashion jewellery, bridal sets & custom designs. Worldwide shipping available."
- Homepage H1 and OG/Twitter title tags to match
- App.tsx: add routes for all 13 new SEO pages
- Update sitemap.xml: replace hash-anchor URLs with proper canonical page URLs, add all new SEO pages
- Footer: add links to new SEO pages for internal linking

### Remove
- Hash-based anchor URLs from sitemap (#about, #products, #contact) — replace with proper page URLs

## Implementation Plan
1. Update index.html — title, meta description, OG/Twitter tags
2. Create a shared SEO page template component (SeoLandingPage.tsx) — reusable with props for: title, h1, metaDescription, targetKeyword, bodyContent, faqItems
3. Create all 13 SEO page files in src/pages/seo/ folder
4. Add all 13 routes to App.tsx
5. Update Footer component to include links to all SEO pages
6. Update sitemap.xml with all pages and correct lastmod 2026-03-30
7. Admin panel: check for any broken imports or missing components causing issues
