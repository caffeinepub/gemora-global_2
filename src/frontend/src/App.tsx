import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminGuard from "./components/AdminGuard";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import { useActor } from "./hooks/useActor";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import ExportMarkets from "./pages/ExportMarkets";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Wholesale from "./pages/Wholesale";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminContent from "./pages/admin/AdminContent";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminSystemSettings from "./pages/admin/AdminSystemSettings";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminWebsiteSettings from "./pages/admin/AdminWebsiteSettings";
import AdminWhatsAppLeads from "./pages/admin/AdminWhatsAppLeads";

function VisitTracker() {
  const { actor } = useActor();
  useEffect(() => {
    if (actor) actor.recordVisit().catch(() => {});
  }, [actor]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <VisitTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/wholesale" element={<Wholesale />} />
        <Route path="/export" element={<ExportMarkets />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminGuard>
              <AdminProducts />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminGuard>
              <AdminCategories />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/inquiries"
          element={
            <AdminGuard>
              <AdminInquiries />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <AdminGuard>
              <AdminGallery />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <AdminGuard>
              <AdminTestimonials />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/content"
          element={
            <AdminGuard>
              <AdminContent />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminGuard>
              <AdminOrders />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <AdminGuard>
              <AdminCustomers />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <AdminGuard>
              <AdminAnalytics />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/whatsapp-leads"
          element={
            <AdminGuard>
              <AdminWhatsAppLeads />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/website-settings"
          element={
            <AdminGuard>
              <AdminWebsiteSettings />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminGuard>
              <AdminSystemSettings />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <AdminGuard>
              <AdminBlog />
            </AdminGuard>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <WhatsAppButton />
      <Toaster />
    </BrowserRouter>
  );
}
