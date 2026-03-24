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

  // Changed to query func for fast, reliable login verification
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

  var nextCategoryId = 1;
  var nextProductId = 1;
  var nextInquiryId = 1;
  var nextGalleryItemId = 1;
  var nextTestimonialId = 1;
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
