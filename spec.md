# Gemora Global

## Current State
Sitemap.xml exists at src/frontend/public/sitemap.xml with valid XML content and all 9 pages. Google Search Console reports it cannot read the sitemap, which means the server is likely returning wrong Content-Type (text/html instead of application/xml).

## Requested Changes (Diff)

### Add
- `.ic-assets.json5` in public folder to enforce correct Content-Type headers for sitemap.xml (application/xml), robots.txt (text/plain), and google verification file

### Modify
- Nothing else changes

### Remove
- Nothing

## Implementation Plan
1. Add `.ic-assets.json5` to `src/frontend/public/` with explicit Content-Type headers for static SEO files
