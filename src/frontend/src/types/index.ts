// Local types matching the Motoko backend interface
// These mirror the types in main.mo

export interface Category {
  id: bigint;
  name: string;
  description: string;
  imageUrl: string;
  sortOrder: bigint;
}

export interface Product {
  id: bigint;
  categoryId: bigint;
  name: string;
  description: string;
  moq: string;
  imageUrls: string[];
  featured: boolean;
  createdAt: bigint;
}

export interface Inquiry {
  id: bigint;
  name: string;
  country: string;
  whatsapp: string;
  requirement: string;
  productId: [] | [bigint];
  createdAt: bigint;
  status: string;
}

export interface GalleryItem {
  id: bigint;
  imageUrl: string;
  caption: string;
  itemType: string;
  sortOrder: bigint;
}

export interface Testimonial {
  id: bigint;
  name: string;
  company: string;
  country: string;
  text: string;
  rating: bigint;
  active: boolean;
}

export interface BlogPost {
  id: bigint;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  status: string;
  image: string;
  content: string;
  createdAt: bigint;
}

export interface Catalogue {
  id: bigint;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
  createdAt: bigint;
}

export interface UserProfile {
  name: string;
  company: string;
  country: string;
}

export interface DashboardStats {
  totalInquiries: bigint;
  newInquiries: bigint;
  totalProducts: bigint;
  totalVisits: bigint;
}

export interface BackendActor {
  // Auth
  verifyAdminLogin(username: string, password: string): Promise<boolean>;
  changeAdminCredentials(
    currentUsername: string,
    currentPassword: string,
    newUsername: string,
    newPassword: string,
  ): Promise<boolean>;

  // Public API
  getCategories(): Promise<Category[]>;
  getProducts(categoryId: [] | [bigint]): Promise<Product[]>;
  getProduct(id: bigint): Promise<[] | [Product]>;
  getFeaturedProducts(): Promise<Product[]>;
  getGallery(itemType: [] | [string]): Promise<GalleryItem[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getContent(key: string): Promise<[] | [string]>;
  submitInquiry(
    name: string,
    country: string,
    whatsapp: string,
    requirement: string,
    productId: [] | [bigint],
  ): Promise<bigint>;
  recordVisit(): Promise<void>;

  // Blog
  getBlogPosts(status: [] | [string]): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<[] | [BlogPost]>;
  createBlogPost(
    slug: string,
    title: string,
    category: string,
    excerpt: string,
    author: string,
    date: string,
    readTime: string,
    status: string,
    image: string,
    content: string,
  ): Promise<bigint>;
  updateBlogPost(
    id: bigint,
    slug: string,
    title: string,
    category: string,
    excerpt: string,
    author: string,
    date: string,
    readTime: string,
    status: string,
    image: string,
    content: string,
  ): Promise<void>;
  deleteBlogPost(id: bigint): Promise<void>;

  // Catalogue
  getCatalogues(): Promise<Catalogue[]>;
  createCatalogue(
    title: string,
    description: string,
    fileUrl: string,
    fileName: string,
    uploadedAt: string,
  ): Promise<bigint>;
  deleteCatalogue(id: bigint): Promise<void>;

  // Admin - Categories
  createCategory(
    name: string,
    description: string,
    imageUrl: string,
    sortOrder: bigint,
  ): Promise<bigint>;
  updateCategory(
    id: bigint,
    name: string,
    description: string,
    imageUrl: string,
    sortOrder: bigint,
  ): Promise<void>;
  deleteCategory(id: bigint): Promise<void>;

  // Admin - Products
  createProduct(
    categoryId: bigint,
    name: string,
    description: string,
    moq: string,
    imageUrls: string[],
    featured: boolean,
  ): Promise<bigint>;
  updateProduct(
    id: bigint,
    categoryId: bigint,
    name: string,
    description: string,
    moq: string,
    imageUrls: string[],
    featured: boolean,
  ): Promise<void>;
  deleteProduct(id: bigint): Promise<void>;

  // Admin - Gallery
  createGalleryItem(
    imageUrl: string,
    caption: string,
    itemType: string,
    sortOrder: bigint,
  ): Promise<bigint>;
  updateGalleryItem(
    id: bigint,
    imageUrl: string,
    caption: string,
    itemType: string,
    sortOrder: bigint,
  ): Promise<void>;
  deleteGalleryItem(id: bigint): Promise<void>;

  // Admin - Testimonials
  createTestimonial(
    name: string,
    company: string,
    country: string,
    text: string,
    rating: bigint,
    active: boolean,
  ): Promise<bigint>;
  updateTestimonial(
    id: bigint,
    name: string,
    company: string,
    country: string,
    text: string,
    rating: bigint,
    active: boolean,
  ): Promise<void>;
  deleteTestimonial(id: bigint): Promise<void>;

  // Admin - Content
  setContent(key: string, value: string): Promise<void>;

  // Admin - Inquiries
  getInquiries(): Promise<Inquiry[]>;
  updateInquiryStatus(id: bigint, status: string): Promise<void>;

  // Admin - Dashboard
  getDashboardStats(): Promise<DashboardStats>;
}
