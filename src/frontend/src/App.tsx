import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Wholesale from "./pages/Wholesale";
import WhyChooseUs from "./pages/WhyChooseUs";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminCatalogue from "./pages/admin/AdminCatalogue";
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
import ArtificialJewelleryExporter from "./pages/seo/ArtificialJewelleryExporter";
import ArtificialJewelleryWholesalerIndia from "./pages/seo/ArtificialJewelleryWholesalerIndia";
import BridalImitationJewellery from "./pages/seo/BridalImitationJewellery";
import BridalImitationJewelleryWholesale from "./pages/seo/BridalImitationJewelleryWholesale";
import BridalJewelleryWholesale from "./pages/seo/BridalJewelleryWholesale";
import BulkJewellerySupplier from "./pages/seo/BulkJewellerySupplier";
import CustomJewelleryManufacturer from "./pages/seo/CustomJewelleryManufacturer";
import FashionJewelleryExporter from "./pages/seo/FashionJewelleryExporter";
import FashionJewelleryExporterIndia from "./pages/seo/FashionJewelleryExporterIndia";
import FashionJewelleryManufacturerIndia from "./pages/seo/FashionJewelleryManufacturerIndia";
import ImitationJewelleryExporterIndia from "./pages/seo/ImitationJewelleryExporterIndia";
import ImitationJewelleryManufacturerIndia from "./pages/seo/ImitationJewelleryManufacturerIndia";
import ImitationJewelleryManufacturerJaipur from "./pages/seo/ImitationJewelleryManufacturerJaipur";
import ImitationJewellerySupplierUSA from "./pages/seo/ImitationJewellerySupplierUSA";
import JewelleryExporterToUSA from "./pages/seo/JewelleryExporterToUSA";
import JewelleryExporterUAE from "./pages/seo/JewelleryExporterUAE";
import JewellerySupplierUK from "./pages/seo/JewellerySupplierUK";
import KundanJewelleryWholesale from "./pages/seo/KundanJewelleryWholesale";
import MeenakariJewelleryWholesale from "./pages/seo/MeenakariJewelleryWholesale";
import OxidisedJewellerySupplier from "./pages/seo/OxidisedJewellerySupplier";
import OxidisedJewelleryWholesale from "./pages/seo/OxidisedJewelleryWholesale";
import PrivateLabelJewelleryIndia from "./pages/seo/PrivateLabelJewelleryIndia";
import TempleJewelleryManufacturer from "./pages/seo/TempleJewelleryManufacturer";
import WholesaleImitationJewellery from "./pages/seo/WholesaleImitationJewellery";
import WholesaleImitationJewelleryIndia from "./pages/seo/WholesaleImitationJewelleryIndia";
import WholesaleJewelleryRajasthan from "./pages/seo/WholesaleJewelleryRajasthan";
import WholesaleJewelleryUK from "./pages/seo/WholesaleJewelleryUK";

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
        <Route path="/global-markets" element={<ExportMarkets />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/why-choose-us" element={<WhyChooseUs />} />
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
        <Route
          path="/admin/catalogue"
          element={
            <AdminGuard>
              <AdminCatalogue />
            </AdminGuard>
          }
        />
        <Route
          path="/imitation-jewellery-exporter-india"
          element={<ImitationJewelleryExporterIndia />}
        />
        <Route
          path="/wholesale-imitation-jewellery"
          element={<WholesaleImitationJewellery />}
        />
        <Route
          path="/bridal-jewellery-wholesale"
          element={<BridalJewelleryWholesale />}
        />
        <Route
          path="/fashion-jewellery-exporter"
          element={<FashionJewelleryExporter />}
        />
        <Route
          path="/custom-jewellery-manufacturer"
          element={<CustomJewelleryManufacturer />}
        />
        <Route
          path="/wholesale-imitation-jewellery-india"
          element={<WholesaleImitationJewelleryIndia />}
        />
        <Route
          path="/fashion-jewellery-manufacturer-india"
          element={<FashionJewelleryManufacturerIndia />}
        />
        <Route
          path="/bridal-imitation-jewellery-wholesale"
          element={<BridalImitationJewelleryWholesale />}
        />
        <Route
          path="/bulk-jewellery-supplier"
          element={<BulkJewellerySupplier />}
        />
        <Route
          path="/jewellery-exporter-to-usa"
          element={<JewelleryExporterToUSA />}
        />
        <Route
          path="/jewellery-supplier-uk"
          element={<JewellerySupplierUK />}
        />
        <Route
          path="/jewellery-exporter-uae"
          element={<JewelleryExporterUAE />}
        />
        <Route
          path="/private-label-jewellery-india"
          element={<PrivateLabelJewelleryIndia />}
        />
        <Route
          path="/kundan-jewellery-wholesale"
          element={<KundanJewelleryWholesale />}
        />
        <Route
          path="/temple-jewellery-manufacturer"
          element={<TempleJewelleryManufacturer />}
        />
        <Route
          path="/artificial-jewellery-exporter"
          element={<ArtificialJewelleryExporter />}
        />
        <Route
          path="/bridal-imitation-jewellery"
          element={<BridalImitationJewellery />}
        />
        <Route
          path="/oxidised-jewellery-wholesale"
          element={<OxidisedJewelleryWholesale />}
        />
        <Route
          path="/imitation-jewellery-manufacturer-india"
          element={<ImitationJewelleryManufacturerIndia />}
        />
        <Route
          path="/artificial-jewellery-wholesaler-india"
          element={<ArtificialJewelleryWholesalerIndia />}
        />
        <Route
          path="/fashion-jewellery-exporter-india"
          element={<FashionJewelleryExporterIndia />}
        />
        <Route
          path="/oxidised-jewellery-supplier"
          element={<OxidisedJewellerySupplier />}
        />
        <Route
          path="/imitation-jewellery-supplier-usa"
          element={<ImitationJewellerySupplierUSA />}
        />
        <Route
          path="/imitation-jewellery-manufacturer-jaipur"
          element={<ImitationJewelleryManufacturerJaipur />}
        />
        <Route
          path="/wholesale-jewellery-rajasthan"
          element={<WholesaleJewelleryRajasthan />}
        />
        <Route
          path="/meenakari-jewellery-wholesale"
          element={<MeenakariJewelleryWholesale />}
        />
        <Route
          path="/wholesale-jewellery-uk"
          element={<WholesaleJewelleryUK />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppButton />
      <Toaster />
    </BrowserRouter>
  );
}
