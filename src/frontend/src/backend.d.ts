import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    id: bigint;
    active: boolean;
    country: string;
    name: string;
    text: string;
    company: string;
    rating: bigint;
}
export interface UserProfile {
    country: string;
    name: string;
    company: string;
}
export interface Category {
    id: bigint;
    sortOrder: bigint;
    name: string;
    description: string;
    imageUrl: string;
}
export interface Catalogue {
    id: bigint;
    title: string;
    createdAt: bigint;
    description: string;
    fileName: string;
    uploadedAt: string;
    fileUrl: string;
}
export interface BlogPost {
    id: bigint;
    status: string;
    title: string;
    content: string;
    date: string;
    createdAt: bigint;
    slug: string;
    author: string;
    readTime: string;
    excerpt: string;
    category: string;
    image: string;
}
export interface Inquiry {
    id: bigint;
    status: string;
    country: string;
    name: string;
    createdAt: bigint;
    whatsapp: string;
    productId?: bigint;
    requirement: string;
}
export interface GalleryItem {
    id: bigint;
    sortOrder: bigint;
    imageUrl: string;
    caption: string;
    itemType: string;
}
export interface Product {
    id: bigint;
    moq: string;
    categoryId: bigint;
    featured: boolean;
    imageUrls: Array<string>;
    name: string;
    createdAt: bigint;
    description: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    changeAdminCredentials(currentUsername: string, currentPassword: string, newUsername: string, newPassword: string): Promise<boolean>;
    createBlogPost(slug: string, title: string, category: string, excerpt: string, author: string, date: string, readTime: string, status: string, image: string, content: string): Promise<bigint>;
    createCatalogue(title: string, description: string, fileUrl: string, fileName: string, uploadedAt: string): Promise<bigint>;
    createCategory(name: string, description: string, imageUrl: string, sortOrder: bigint): Promise<bigint>;
    createGalleryItem(imageUrl: string, caption: string, itemType: string, sortOrder: bigint): Promise<bigint>;
    createProduct(categoryId: bigint, name: string, description: string, moq: string, imageUrls: Array<string>, featured: boolean): Promise<bigint>;
    createTestimonial(name: string, company: string, country: string, text: string, rating: bigint, active: boolean): Promise<bigint>;
    deleteBlogPost(id: bigint): Promise<void>;
    deleteCatalogue(id: bigint): Promise<void>;
    deleteCategory(id: bigint): Promise<void>;
    deleteGalleryItem(id: bigint): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    deleteTestimonial(id: bigint): Promise<void>;
    getBlogPost(slug: string): Promise<BlogPost | null>;
    getBlogPosts(status: string | null): Promise<Array<BlogPost>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCatalogues(): Promise<Array<Catalogue>>;
    getCategories(): Promise<Array<Category>>;
    getContent(key: string): Promise<string | null>;
    getDashboardStats(): Promise<{
        totalProducts: bigint;
        newInquiries: bigint;
        totalVisits: bigint;
        totalInquiries: bigint;
    }>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getGallery(itemType: string | null): Promise<Array<GalleryItem>>;
    getInquiries(): Promise<Array<Inquiry>>;
    getProduct(id: bigint): Promise<Product | null>;
    getProducts(categoryId: bigint | null): Promise<Array<Product>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    recordVisit(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setContent(key: string, value: string): Promise<void>;
    submitInquiry(name: string, country: string, whatsapp: string, requirement: string, productId: bigint | null): Promise<bigint>;
    updateBlogPost(id: bigint, slug: string, title: string, category: string, excerpt: string, author: string, date: string, readTime: string, status: string, image: string, content: string): Promise<void>;
    updateCategory(id: bigint, name: string, description: string, imageUrl: string, sortOrder: bigint): Promise<void>;
    updateGalleryItem(id: bigint, imageUrl: string, caption: string, itemType: string, sortOrder: bigint): Promise<void>;
    updateInquiryStatus(id: bigint, status: string): Promise<void>;
    updateProduct(id: bigint, categoryId: bigint, name: string, description: string, moq: string, imageUrls: Array<string>, featured: boolean): Promise<void>;
    updateTestimonial(id: bigint, name: string, company: string, country: string, text: string, rating: bigint, active: boolean): Promise<void>;
    verifyAdminLogin(username: string, password: string): Promise<boolean>;
}
