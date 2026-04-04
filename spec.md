# Gemora Global

## Current State
- Navbar uses `bg-background/90 backdrop-blur` (semi-transparent, blurry)
- Homepage hero and gallery have no entry animations
- Admin product form has a "Manual Image URLs" textarea in addition to file upload
- Admin product/category/gallery/blog forms allow pasting URLs — user wants file-upload only
- Upload via `useStorageUpload` goes through `StorageClient.putFile` then `getDirectURL` — this is correct for blob-storage
- The `useStorageUpload` hook needs better error logging to surface why uploads fail
- Hero slider images: currently `hero_image_1/2/3` keys in admin; works correctly

## Requested Changes (Diff)

### Add
- **Scroll/entry animations**: Add fade-in-up animations for section headings, cards, and key elements on the homepage and main public pages using CSS keyframes + IntersectionObserver (or Tailwind animate classes). Keep it subtle and professional.
- **Hover animations**: Add smooth hover scale/lift effects on product cards, category cards, gallery items, and CTA buttons.
- **Navbar transition**: Smooth transition when scrolling (optional: slight shadow appears on scroll).

### Modify
- **Navbar**: Change `bg-background/90 backdrop-blur` to `bg-[#1A237E]` (solid navy blue). Change link colors to white (`text-white`) with hover `text-[#42A5F5]`. Active link should be `text-[#42A5F5]`. "Get Quote" button should be `bg-[#42A5F5] text-white hover:bg-[#42A5F5]/90`. The "Our Services" dropdown background should be `bg-[#1A237E]` with white text, hover `bg-[#0d1857]`. Mobile menu also solid navy.
- **Admin Products form**: Remove the `manualUrls` textarea ("Or paste image URLs...") entirely. The image section should only have the file upload button. Remove `manualUrls` from the `ProductForm` type and all references. The `allImageUrls()` function should just return `form.imageUrls`.
- **Admin upload error handling**: In `useStorageUpload.ts`, wrap the upload in better try/catch and `console.error` the actual error so it's visible in browser console. Add a more descriptive toast message like "Upload failed — check your connection and try again".
- **Admin image fields**: In AdminCategories, AdminGallery, AdminBlog — wherever there is a text Input for `imageUrl` that lets user type a URL, replace it with a file upload button (same pattern as other admin pages using `useStorageUpload`). The URL field should be read-only/hidden (only set programmatically after upload), with a preview shown if an image URL exists.

### Remove
- `manualUrls` field from AdminProducts form

## Implementation Plan
1. **Navbar.tsx** — Change background to solid `#1A237E`, update all link/button colors to white/sky-blue, update dropdown styles.
2. **AdminProducts.tsx** — Remove `manualUrls` from type + state + form reset + `allImageUrls()` + JSX textarea block.
3. **AdminCategories.tsx** — Replace URL text input with file upload button + preview (using `useStorageUpload`).
4. **AdminGallery.tsx** — Replace URL text input with file upload button + preview.
5. **AdminBlog.tsx** — Replace URL text input with file upload button + preview.
6. **useStorageUpload.ts** — Improve error logging/messaging.
7. **Home.tsx + public pages** — Add subtle fade-in-up CSS animations via `@keyframes` in index.css + IntersectionObserver hook, applied to section titles, stat cards, category cards, testimonial cards.
