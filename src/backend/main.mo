import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Category = {
    id : Nat;
    name : Text;
    description : Text;
    imageUrl : Text;
    sortOrder : Int;
  };

  module Category {
    public func compare(a : Category, b : Category) : Order.Order {
      Int.compare(a.sortOrder, b.sortOrder);
    };
  };

  type Product = {
    id : Nat;
    categoryId : Nat;
    name : Text;
    description : Text;
    moq : Text;
    imageUrls : [Text];
    featured : Bool;
    createdAt : Int;
  };

  type Inquiry = {
    id : Nat;
    name : Text;
    country : Text;
    whatsapp : Text;
    requirement : Text;
    productId : ?Nat;
    createdAt : Int;
    status : Text;
  };

  type GalleryItem = {
    id : Nat;
    imageUrl : Text;
    caption : Text;
    itemType : Text;
    sortOrder : Int;
  };

  module GalleryItem {
    public func compare(a : GalleryItem, b : GalleryItem) : Order.Order {
      Int.compare(a.sortOrder, b.sortOrder);
    };
  };

  type Testimonial = {
    id : Nat;
    name : Text;
    company : Text;
    country : Text;
    text : Text;
    rating : Nat;
    active : Bool;
  };

  module Testimonial {
    public func compareByRating(a : Testimonial, b : Testimonial) : Order.Order {
      Nat.compare(a.rating, b.rating);
    };
  };

  type BlogPost = {
    id : Nat;
    slug : Text;
    title : Text;
    category : Text;
    excerpt : Text;
    author : Text;
    date : Text;
    readTime : Text;
    status : Text;
    image : Text;
    content : Text;
    createdAt : Int;
  };

  module BlogPost {
    public func compareByDate(a : BlogPost, b : BlogPost) : Order.Order {
      Int.compare(b.createdAt, a.createdAt);
    };
  };

  type Catalogue = {
    id : Nat;
    title : Text;
    description : Text;
    fileUrl : Text;
    fileName : Text;
    uploadedAt : Text;
    createdAt : Int;
  };

  module Catalogue {
    public func compareByDate(a : Catalogue, b : Catalogue) : Order.Order {
      Int.compare(b.createdAt, a.createdAt);
    };
  };

  public type UserProfile = {
    name : Text;
    company : Text;
    country : Text;
  };

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Storage
  include MixinStorage();

  // Admin password-based auth
  var adminUsername : Text = "admin";
  var adminPassword : Text = "Gemora@2024";

  public query func verifyAdminLogin(username : Text, password : Text) : async Bool {
    Text.equal(username, adminUsername) and Text.equal(password, adminPassword);
  };

  public shared func changeAdminCredentials(currentUsername : Text, currentPassword : Text, newUsername : Text, newPassword : Text) : async Bool {
    if (Text.equal(currentUsername, adminUsername) and Text.equal(currentPassword, adminPassword)) {
      adminUsername := newUsername;
      adminPassword := newPassword;
      true;
    } else {
      false;
    };
  };

  // Persistent data structures
  let categoriesMap = Map.empty<Nat, Category>();
  let productsMap = Map.empty<Nat, Product>();
  let inquiriesMap = Map.empty<Nat, Inquiry>();
  let galleryItemsMap = Map.empty<Nat, GalleryItem>();
  let testimonialsMap = Map.empty<Nat, Testimonial>();
  let contentEntries = Map.empty<Text, Text>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let blogPostsMap = Map.empty<Nat, BlogPost>();
  let cataloguesMap = Map.empty<Nat, Catalogue>();

  var nextCategoryId = 1;
  var nextProductId = 1;
  var nextInquiryId = 1;
  var nextGalleryItemId = 1;
  var nextTestimonialId = 1;
  var nextBlogPostId = 1;
  var nextCatalogueId = 1;

  // Seed initial data if empty
  do {
    if (categoriesMap.size() == 0) {
      let cats = [
        ("Necklaces", "Exquisite handcrafted necklaces for every occasion", "/assets/generated/jewellery-necklace-hd.dim_800x800.jpg", 1),
        ("Earrings", "Stunning earring collections from studs to chandelier drops", "/assets/generated/jewellery-earrings-hd.dim_800x800.jpg", 2),
        ("Bracelets", "Elegant bracelet and bangle designs", "/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg", 3),
        ("Rings", "Statement rings for every occasion", "/assets/generated/jewellery-rings-hd.dim_800x800.jpg", 4),
        ("Bridal Jewellery", "Complete bridal jewellery sets for weddings", "/assets/generated/jewellery-bridal-hd.dim_800x800.jpg", 5),
        ("Minimal Fashion", "Modern minimalist fashion jewellery", "/assets/generated/jewellery-minimal-hd.dim_800x800.jpg", 6),
      ];
      for ((name, desc, img, order) in cats.vals()) {
        categoriesMap.add(nextCategoryId, { id = nextCategoryId; name; description = desc; imageUrl = img; sortOrder = order });
        nextCategoryId += 1;
      };
    };

    if (productsMap.size() == 0) {
      let prods = [
        (1, "Gold Kundan Layered Necklace", "Premium export quality gold-plated kundan necklace. 3-micron gold plating, handcrafted in Jaipur.", "50 pcs", ["/assets/generated/product-necklace.dim_600x600.jpg"], true),
        (2, "Pearl Drop Chandelier Earrings", "Elegant pearl drop earrings with kundan stone detailing. Lightweight and comfortable.", "50 pcs", ["/assets/generated/product-earrings.dim_600x600.jpg"], true),
        (3, "Gold Bangle Stack Set", "Set of 6 gold-plated bangles with enamel work. Stackable design, anti-tarnish coating.", "100 sets", ["/assets/generated/product-bracelets.dim_600x600.jpg"], false),
        (4, "Cocktail Statement Ring", "Bold gold-tone cocktail ring with colourful stone setting. One-size adjustable.", "100 pcs", ["/assets/generated/product-rings.dim_600x600.jpg"], false),
        (5, "Bridal Kundan Jewellery Set", "Complete bridal set: choker necklace, maang tikka, earrings, and bangles. Premium kundan work.", "20 sets", ["/assets/generated/product-bridal.dim_600x600.jpg"], true),
        (6, "Minimal Gold Chain Necklace", "Delicate layered gold-tone chain necklace for everyday wear. Perfect for western boutiques.", "100 pcs", ["/assets/generated/jewellery-minimal-hd.dim_800x800.jpg"], true),
      ];
      for ((catId, name, desc, moq, imgs, feat) in prods.vals()) {
        productsMap.add(nextProductId, { id = nextProductId; categoryId = catId; name; description = desc; moq; imageUrls = imgs; featured = feat; createdAt = 0 });
        nextProductId += 1;
      };
    };

    if (testimonialsMap.size() == 0) {
      let tests = [
        ("Fatima Al-Hassan", "Al-Noor Boutique", "UAE", "Outstanding quality and prompt delivery. Our customers love Gemora's designs!", 5),
        ("Marie Dubois", "Paris Bijoux", "France", "Best imitation jewellery exporter we have worked with. Consistent quality every order.", 5),
        ("Sarah Johnson", "NYC Accessories", "USA", "Gemora's bridal sets are our top sellers. The craftsmanship is exceptional for the price.", 5),
        ("Ahmed Al-Rashidi", "Gulf Wholesale", "Kuwait", "Fast shipping, competitive pricing, professional team. Highly recommended.", 4),
      ];
      for ((name, company, country, text, rating) in tests.vals()) {
        testimonialsMap.add(nextTestimonialId, { id = nextTestimonialId; name; company; country; text; rating; active = true });
        nextTestimonialId += 1;
      };
    };

    if (galleryItemsMap.size() == 0) {
      let items = [
        ("/assets/generated/jewellery-necklace-hd.dim_800x800.jpg", "Gold Kundan Necklace Collection", "image", 1),
        ("/assets/generated/jewellery-earrings-hd.dim_800x800.jpg", "Chandelier Earrings Collection", "image", 2),
        ("/assets/generated/jewellery-bracelets-hd.dim_800x800.jpg", "Bangle & Bracelet Collection", "image", 3),
        ("/assets/generated/jewellery-rings-hd.dim_800x800.jpg", "Statement Rings Collection", "image", 4),
        ("/assets/generated/jewellery-bridal-hd.dim_800x800.jpg", "Bridal Jewellery Sets", "image", 5),
        ("/assets/generated/jewellery-minimal-hd.dim_800x800.jpg", "Minimal Fashion Collection", "image", 6),
        ("/assets/generated/product-necklace.dim_600x600.jpg", "Export Quality Necklace", "image", 7),
        ("/assets/generated/product-earrings.dim_600x600.jpg", "Premium Earrings", "image", 8),
        ("/assets/generated/product-bridal.dim_600x600.jpg", "Bridal Set Export", "image", 9),
      ];
      for ((url, caption, t, order) in items.vals()) {
        galleryItemsMap.add(nextGalleryItemId, { id = nextGalleryItemId; imageUrl = url; caption; itemType = t; sortOrder = order });
        nextGalleryItemId += 1;
      };
    };

    if (blogPostsMap.size() == 0) {
      let posts = [
        ("top-imitation-jewellery-trends-2026", "Top Imitation Jewellery Trends to Watch in 2026", "Trends",
          "From bold layered necklaces to minimalist ear cuffs, discover the hottest imitation jewellery styles dominating international markets this year.",
          "Priya Sharma", "March 10, 2026", "5 min read", "Published",
          "/assets/generated/blog-trends-2026.dim_800x500.jpg",
          "The global fashion jewellery market is seeing a dramatic shift in 2026. Consumers are moving away from single-statement pieces toward layered, storytelling looks that blend multiple textures and finishes. Indian manufacturers are at the forefront of this trend, producing collections that fuse traditional craftsmanship with modern silhouettes.\n\nOxidised silver pieces continue to dominate European and Middle Eastern wholesale orders. Their antique finish resonates with buyers seeking authentic, handcrafted aesthetics at accessible price points. Gemora Global's latest oxidised line has seen a 40% surge in international inquiries since its launch.\n\nColour-stone statement earrings are commanding premium shelf space in boutiques across France, the UK, and the UAE. These high-drama pieces photograph beautifully, making them social-media favourites and driving impulse purchases online."),
        ("how-to-start-jewellery-wholesale-import-business", "How to Start a Jewellery Wholesale Import Business", "Business Guide",
          "A step-by-step roadmap for boutique owners and distributors looking to source premium imitation jewellery from India's top manufacturers.",
          "Rahul Mehta", "February 28, 2026", "7 min read", "Published",
          "/assets/generated/blog-wholesale-import.dim_800x500.jpg",
          "Starting a jewellery wholesale import business can be one of the most rewarding ventures in the fashion retail sector. India supplies over 60% of the world's imitation jewellery, offering unmatched variety, quality, and competitive pricing.\n\nThe first step is identifying a reliable manufacturer with verified export credentials. Look for suppliers with GST registration, an IEC (Import Export Code), and a track record of international shipments.\n\nMinimum Order Quantities (MOQs) vary significantly between manufacturers. Most reputable Indian exporters set MOQs between 50 and 200 pieces per design. Negotiate sample orders first — a professional manufacturer will ship samples within 7-10 working days."),
        ("why-indian-imitation-jewellery-dominates-global-markets", "Why Indian Imitation Jewellery Dominates Global Markets", "Industry Insights",
          "Explore why India's imitation jewellery industry has become the go-to source for boutiques and distributors across 50+ countries.",
          "Neha Gupta", "February 14, 2026", "6 min read", "Published",
          "/assets/generated/blog-global-markets.dim_800x500.jpg",
          "India's dominance in the global imitation jewellery market is no accident. It is the result of decades of accumulated craft knowledge, investment in manufacturing infrastructure, and a deep understanding of international buyer preferences.\n\nThe Jaipur cluster alone accounts for over 30% of India's jewellery exports, producing everything from Kundan and Meenakari pieces to contemporary minimalist designs.\n\nFor international buyers, sourcing from India offers a compelling combination: factory-direct pricing, an enormous breadth of designs updated seasonally, and the flexibility to customise pieces for private-label requirements."),
        ("bridal-jewellery-collections-international-buyers", "Bridal Jewellery Collections: What International Buyers Want", "Collections",
          "Discover what wholesale buyers from the UAE, UK, and USA are seeking in bridal jewellery collections for 2026.",
          "Ananya Patel", "January 30, 2026", "5 min read", "Published",
          "/assets/generated/blog-bridal-sets.dim_800x500.jpg",
          "Bridal jewellery remains one of the highest-margin categories in the imitation jewellery segment. International buyers are actively sourcing bridal sets that blend traditional Indian aesthetics with contemporary finishing.\n\nThe most requested pieces include kundan-style choker sets, layered necklaces with matching earrings and maang-tikka, and temple-inspired bangles in gold and pearl finishes.\n\nFor wholesale buyers, the key differentiator is anti-tarnish coating — a non-negotiable requirement for most international markets due to humidity and climate considerations."),
        ("export-jewellery-india-usa-guide", "Export Jewellery from India to USA: Complete Guide", "Export Tips",
          "Everything you need to know about exporting imitation jewellery from India to the United States — regulations, shipping, and finding buyers.",
          "Vikram Singh", "January 15, 2026", "6 min read", "Published",
          "/assets/generated/blog-usa-boutiques.dim_800x500.jpg",
          "The USA is one of the largest importers of Indian imitation jewellery, with demand driven by a diverse consumer base and a thriving boutique retail sector. For Indian exporters, this represents a massive and growing opportunity.\n\nTo export jewellery from India to the USA, you need a valid IEC (Import Export Code), compliance with US Customs and Border Protection regulations, and proper HS code classification for your products.\n\nMost Indian jewellery exports to the USA fall under HS code 7117, which covers imitation jewellery. Duties typically range from 0% to 11% depending on materials and design. Working with a licensed customs broker on the US side is highly recommended for first-time exporters."),
        ("private-label-jewellery-india-guide", "Private Label Jewellery Manufacturing in India", "Business Guide",
          "How boutiques and brands can create their own private label jewellery collections with Indian manufacturers.",
          "Deepika Rao", "December 20, 2025", "5 min read", "Published",
          "/assets/generated/blog-private-label.dim_800x500.jpg",
          "Private label jewellery is one of the fastest-growing segments in the global fashion accessories market. For boutique owners and retailers, having your own branded jewellery collection creates loyalty, higher margins, and a unique market position.\n\nIndia is the world's leading destination for private label jewellery manufacturing. With low MOQs, skilled artisans, and complete customisation capabilities, Indian manufacturers can bring your vision to life at a fraction of the cost of domestic production in Western markets.\n\nGemora Global offers full private label services including custom design, logo engraving, branded packaging, and drop shipping for international clients. Our minimum for private label orders starts at just 100 pieces per design."),
      ];
      for ((slug, title, category, excerpt, author, date, readTime, status, image, content) in posts.vals()) {
        blogPostsMap.add(nextBlogPostId, { id = nextBlogPostId; slug; title; category; excerpt; author; date; readTime; status; image; content; createdAt = 0 });
        nextBlogPostId += 1;
      };
    };
  };


  // User Profile API

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // Public API

  public query func getCategories() : async [Category] {
    categoriesMap.values().toArray().sort();
  };

  public query func getProducts(categoryId : ?Nat) : async [Product] {
    productsMap.values().toArray().filter(
      func(p) {
        switch (categoryId) {
          case (null) { true };
          case (?catId) { p.categoryId == catId };
        };
      }
    );
  };

  public query func getProduct(id : Nat) : async ?Product {
    productsMap.get(id);
  };

  public query func getFeaturedProducts() : async [Product] {
    productsMap.values().toArray().filter(func(p) { p.featured });
  };

  public query func getGallery(itemType : ?Text) : async [GalleryItem] {
    let filtered = galleryItemsMap.values().toArray().filter(
      func(item) {
        switch (itemType) {
          case (null) { true };
          case (?t) { Text.equal(item.itemType, t) };
        };
      }
    );
    filtered.sort();
  };

  public query func getTestimonials() : async [Testimonial] {
    testimonialsMap.values().toArray().filter(func(t) { t.active })
      .sort(Testimonial.compareByRating);
  };

  public query func getContent(key : Text) : async ?Text {
    contentEntries.get(key);
  };

  public shared func submitInquiry(name : Text, country : Text, whatsapp : Text, requirement : Text, productId : ?Nat) : async Nat {
    let inquiry : Inquiry = {
      id = nextInquiryId;
      name;
      country;
      whatsapp;
      requirement;
      productId;
      createdAt = Int.abs(Time.now());
      status = "new";
    };
    inquiriesMap.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
    inquiry.id;
  };

  public shared func recordVisit() : async () { () };

  // Blog Post API

  public query func getBlogPosts(status : ?Text) : async [BlogPost] {
    let filtered = blogPostsMap.values().toArray().filter(
      func(p) {
        switch (status) {
          case (null) { true };
          case (?s) { Text.equal(p.status, s) };
        };
      }
    );
    filtered.sort(BlogPost.compareByDate);
  };

  public query func getBlogPost(slug : Text) : async ?BlogPost {
    for (post in blogPostsMap.values()) {
      if (Text.equal(post.slug, slug)) return ?post;
    };
    null;
  };

  public shared func createBlogPost(slug : Text, title : Text, category : Text, excerpt : Text, author : Text, date : Text, readTime : Text, status : Text, image : Text, content : Text) : async Nat {
    let post : BlogPost = {
      id = nextBlogPostId;
      slug;
      title;
      category;
      excerpt;
      author;
      date;
      readTime;
      status;
      image;
      content;
      createdAt = Int.abs(Time.now());
    };
    blogPostsMap.add(nextBlogPostId, post);
    nextBlogPostId += 1;
    post.id;
  };

  public shared func updateBlogPost(id : Nat, slug : Text, title : Text, category : Text, excerpt : Text, author : Text, date : Text, readTime : Text, status : Text, image : Text, content : Text) : async () {
    switch (blogPostsMap.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?existing) {
        blogPostsMap.add(id, { id; slug; title; category; excerpt; author; date; readTime; status; image; content; createdAt = existing.createdAt });
      };
    };
  };

  public shared func deleteBlogPost(id : Nat) : async () {
    blogPostsMap.remove(id);
  };

  // Catalogue API

  public query func getCatalogues() : async [Catalogue] {
    cataloguesMap.values().toArray().sort(Catalogue.compareByDate);
  };

  public shared func createCatalogue(title : Text, description : Text, fileUrl : Text, fileName : Text, uploadedAt : Text) : async Nat {
    let cat : Catalogue = {
      id = nextCatalogueId;
      title;
      description;
      fileUrl;
      fileName;
      uploadedAt;
      createdAt = Int.abs(Time.now());
    };
    cataloguesMap.add(nextCatalogueId, cat);
    nextCatalogueId += 1;
    cat.id;
  };

  public shared func deleteCatalogue(id : Nat) : async () {
    cataloguesMap.remove(id);
  };

  // Admin API (no principal check - protected by frontend password session)

  public shared func createCategory(name : Text, description : Text, imageUrl : Text, sortOrder : Int) : async Nat {
    let category : Category = {
      id = nextCategoryId;
      name;
      description;
      imageUrl;
      sortOrder;
    };
    categoriesMap.add(nextCategoryId, category);
    nextCategoryId += 1;
    category.id;
  };

  public shared func updateCategory(id : Nat, name : Text, description : Text, imageUrl : Text, sortOrder : Int) : async () {
    switch (categoriesMap.get(id)) {
      case (null) { Runtime.trap("Category not found") };
      case (?_) {
        categoriesMap.add(id, { id; name; description; imageUrl; sortOrder });
      };
    };
  };

  public shared func deleteCategory(id : Nat) : async () {
    categoriesMap.remove(id);
  };

  public shared func createProduct(categoryId : Nat, name : Text, description : Text, moq : Text, imageUrls : [Text], featured : Bool) : async Nat {
    let product : Product = {
      id = nextProductId;
      categoryId;
      name;
      description;
      moq;
      imageUrls;
      featured;
      createdAt = Int.abs(Time.now());
    };
    productsMap.add(nextProductId, product);
    nextProductId += 1;
    product.id;
  };

  public shared func updateProduct(id : Nat, categoryId : Nat, name : Text, description : Text, moq : Text, imageUrls : [Text], featured : Bool) : async () {
    switch (productsMap.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?existing) {
        productsMap.add(id, { id; categoryId; name; description; moq; imageUrls; featured; createdAt = existing.createdAt });
      };
    };
  };

  public shared func deleteProduct(id : Nat) : async () {
    productsMap.remove(id);
  };

  public shared func createGalleryItem(imageUrl : Text, caption : Text, itemType : Text, sortOrder : Int) : async Nat {
    let item : GalleryItem = { id = nextGalleryItemId; imageUrl; caption; itemType; sortOrder };
    galleryItemsMap.add(nextGalleryItemId, item);
    nextGalleryItemId += 1;
    item.id;
  };

  public shared func updateGalleryItem(id : Nat, imageUrl : Text, caption : Text, itemType : Text, sortOrder : Int) : async () {
    switch (galleryItemsMap.get(id)) {
      case (null) { Runtime.trap("Gallery item not found") };
      case (?_) {
        galleryItemsMap.add(id, { id; imageUrl; caption; itemType; sortOrder });
      };
    };
  };

  public shared func deleteGalleryItem(id : Nat) : async () {
    galleryItemsMap.remove(id);
  };

  public shared func createTestimonial(name : Text, company : Text, country : Text, text : Text, rating : Nat, active : Bool) : async Nat {
    let testimonial : Testimonial = { id = nextTestimonialId; name; company; country; text; rating; active };
    testimonialsMap.add(nextTestimonialId, testimonial);
    nextTestimonialId += 1;
    testimonial.id;
  };

  public shared func updateTestimonial(id : Nat, name : Text, company : Text, country : Text, text : Text, rating : Nat, active : Bool) : async () {
    switch (testimonialsMap.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?_) {
        testimonialsMap.add(id, { id; name; company; country; text; rating; active });
      };
    };
  };

  public shared func deleteTestimonial(id : Nat) : async () {
    testimonialsMap.remove(id);
  };

  public shared func setContent(key : Text, value : Text) : async () {
    contentEntries.add(key, value);
  };

  public query func getInquiries() : async [Inquiry] {
    inquiriesMap.values().toArray();
  };

  public shared func updateInquiryStatus(id : Nat, status : Text) : async () {
    switch (inquiriesMap.get(id)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?inquiry) {
        inquiriesMap.add(id, {
          id = inquiry.id;
          name = inquiry.name;
          country = inquiry.country;
          whatsapp = inquiry.whatsapp;
          requirement = inquiry.requirement;
          productId = inquiry.productId;
          createdAt = inquiry.createdAt;
          status;
        });
      };
    };
  };

  public query func getDashboardStats() : async {
    totalInquiries : Nat;
    newInquiries : Nat;
    totalProducts : Nat;
    totalVisits : Nat;
  } {
    let newInquiriesCount = inquiriesMap.values().toArray().filter(
      func(inq : Inquiry) : Bool { Text.equal(inq.status, "new") }
    ).size();
    {
      totalInquiries = inquiriesMap.size();
      newInquiries = newInquiriesCount;
      totalProducts = productsMap.size();
      totalVisits = 0;
    };
  };
};
