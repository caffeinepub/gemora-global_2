# Gemora Global — Admin Enhancements

## Current State
- **AdminGallery.tsx**: Has a single image upload via `useStorageUpload`. Only one image can be added per dialog session. No bulk/multi-image upload to the gallery itself.
- **AdminProducts.tsx**: Has a product form with multi-image file upload (multiple files selectable at once) but no CSV/spreadsheet bulk product import. Products are added one at a time.
- **Admin pages in general**: All CRUD pages work but some have rough edges — AdminOrders uses local mock data, AdminBlog uses localStorage, other pages use the backend actor. The admin panel navigation and layout is functional.

## Requested Changes (Diff)

### Add
1. **Gallery: Bulk image upload** — Allow admin to select and upload multiple images at once directly to the gallery (not just one image per form dialog). Each uploaded image becomes a separate gallery item automatically with a default caption that can be edited later.
2. **Products: Bulk upload via CSV** — Add a CSV import button in AdminProducts that allows uploading a CSV file with columns: `name, description, moq, categoryId, imageUrl, featured`. Parse it client-side and batch-create products via the backend `createProduct` API.
3. **Admin completeness fixes**:
   - AdminOrders: Persist orders in localStorage so they survive page refresh (currently only in-memory MOCK_ORDERS). Add ability to update order status inline.
   - AdminDashboard: Fix the Edit button in products table to open the AdminProducts page properly (currently it links to /admin/products but doesn't open the edit modal).
   - AdminGallery: After bulk upload, show a success summary ("X images uploaded").
   - AdminProducts: Show product images as thumbnails in the table row.
   - All admin CRUD: Confirm dialogs before delete.

### Modify
- **AdminGallery.tsx**: Add a second "Bulk Upload" button/section that accepts `multiple` files and creates a gallery item for each uploaded file automatically.
- **AdminProducts.tsx**: Add a CSV import section with a template download link and file upload input. After parsing and importing, show a summary toast.

### Remove
- Nothing removed.

## Implementation Plan
1. **AdminGallery** — Add a "Bulk Upload" tab or section in the page (not in the dialog). Use a file input with `multiple` and `accept="image/*"`. On file selection, iterate through files, upload each with `useStorageUpload`, call `createGalleryItem` for each with a default caption (filename minus extension). Show progress counter ("Uploading 3 of 8..."). On completion toast "8 images uploaded to gallery".
2. **AdminProducts** — Add a "Bulk Import CSV" button next to "Add Product". On click, show a dialog with: download CSV template link, file upload input. On CSV file selected, parse with plain JS (split rows/columns), validate required fields, call `createProduct` for each row. Show progress and summary.
3. **AdminOrders** — Move `orders` state to localStorage (read initial from localStorage or MOCK_ORDERS). Add inline status update using a Select in each row. Fix detail modal to update status.
4. **AdminProducts table** — Add image thumbnail column (first imageUrl if available).
5. **Validate** — Run lint + typecheck + build, fix all errors.
