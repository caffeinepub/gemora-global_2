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

  // User Profile API

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public API (accessible to all including guests)

  public query ({ caller }) func getCategories() : async [Category] {
    categoriesMap.values().toArray().sort();
  };

  public query ({ caller }) func getProducts(categoryId : ?Nat) : async [Product] {
    productsMap.values().toArray().filter(
      func(p) {
        switch (categoryId) {
          case (null) { true };
          case (?catId) {
            p.categoryId == catId;
          };
        };
      }
    );
  };

  public query ({ caller }) func getProduct(id : Nat) : async ?Product {
    productsMap.get(id);
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    productsMap.values().toArray().filter(
      func(p) { p.featured }
    );
  };

  public query ({ caller }) func getGallery(itemType : ?Text) : async [GalleryItem] {
    let filtered = galleryItemsMap.values().toArray().filter(
      func(item) {
        switch (itemType) {
          case (null) { true };
          case (?itemType) {
            Text.equal(item.itemType, itemType);
          };
        };
      }
    );
    filtered.sort();
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonialsMap.values().toArray().filter(
      func(t) { t.active }
    ).sort(Testimonial.compareByRating);
  };

  public query ({ caller }) func getContent(key : Text) : async ?Text {
    contentEntries.get(key);
  };

  public shared ({ caller }) func submitInquiry(name : Text, country : Text, whatsapp : Text, requirement : Text, productId : ?Nat) : async Nat {
    // No authorization check - accessible to all including guests
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

  public shared ({ caller }) func recordVisit() : async () {
    // No authorization check - accessible to all including guests
    ();
  };

  // Admin API (requires admin role)

  public shared ({ caller }) func createCategory(name : Text, description : Text, imageUrl : Text, sortOrder : Int) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create categories");
    };
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

  public shared ({ caller }) func updateCategory(id : Nat, name : Text, description : Text, imageUrl : Text, sortOrder : Int) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update categories");
    };
    switch (categoriesMap.get(id)) {
      case (null) { Runtime.trap("Category not found") };
      case (?_) {
        let category : Category = {
          id;
          name;
          description;
          imageUrl;
          sortOrder;
        };
        categoriesMap.add(id, category);
      };
    };
  };

  public shared ({ caller }) func deleteCategory(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete categories");
    };
    categoriesMap.remove(id);
  };

  public shared ({ caller }) func createProduct(categoryId : Nat, name : Text, description : Text, moq : Text, imageUrls : [Text], featured : Bool) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
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

  public shared ({ caller }) func updateProduct(id : Nat, categoryId : Nat, name : Text, description : Text, moq : Text, imageUrls : [Text], featured : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (productsMap.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?existing) {
        let product : Product = {
          id;
          categoryId;
          name;
          description;
          moq;
          imageUrls;
          featured;
          createdAt = existing.createdAt; // Preserve original creation time
        };
        productsMap.add(id, product);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    productsMap.remove(id);
  };

  public shared ({ caller }) func createGalleryItem(imageUrl : Text, caption : Text, itemType : Text, sortOrder : Int) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create gallery items");
    };
    let item : GalleryItem = {
      id = nextGalleryItemId;
      imageUrl;
      caption;
      itemType;
      sortOrder;
    };
    galleryItemsMap.add(nextGalleryItemId, item);
    nextGalleryItemId += 1;
    item.id;
  };

  public shared ({ caller }) func updateGalleryItem(id : Nat, imageUrl : Text, caption : Text, itemType : Text, sortOrder : Int) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update gallery items");
    };
    switch (galleryItemsMap.get(id)) {
      case (null) { Runtime.trap("Gallery item not found") };
      case (?_) {
        let item : GalleryItem = {
          id;
          imageUrl;
          caption;
          itemType;
          sortOrder;
        };
        galleryItemsMap.add(id, item);
      };
    };
  };

  public shared ({ caller }) func deleteGalleryItem(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete gallery items");
    };
    galleryItemsMap.remove(id);
  };

  public shared ({ caller }) func createTestimonial(name : Text, company : Text, country : Text, text : Text, rating : Nat, active : Bool) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create testimonials");
    };
    let testimonial : Testimonial = {
      id = nextTestimonialId;
      name;
      company;
      country;
      text;
      rating;
      active;
    };
    testimonialsMap.add(nextTestimonialId, testimonial);
    nextTestimonialId += 1;
    testimonial.id;
  };

  public shared ({ caller }) func updateTestimonial(id : Nat, name : Text, company : Text, country : Text, text : Text, rating : Nat, active : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };
    switch (testimonialsMap.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?_) {
        let testimonial : Testimonial = {
          id;
          name;
          company;
          country;
          text;
          rating;
          active;
        };
        testimonialsMap.add(id, testimonial);
      };
    };
  };

  public shared ({ caller }) func deleteTestimonial(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };
    testimonialsMap.remove(id);
  };

  public shared ({ caller }) func setContent(key : Text, value : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can set content entries");
    };
    contentEntries.add(key, value);
  };

  public query ({ caller }) func getInquiries() : async [Inquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiriesMap.values().toArray();
  };

  public shared ({ caller }) func updateInquiryStatus(id : Nat, status : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update inquiry status");
    };
    switch (inquiriesMap.get(id)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?inquiry) {
        let updatedInquiry : Inquiry = {
          id = inquiry.id;
          name = inquiry.name;
          country = inquiry.country;
          whatsapp = inquiry.whatsapp;
          requirement = inquiry.requirement;
          productId = inquiry.productId;
          createdAt = inquiry.createdAt;
          status;
        };
        inquiriesMap.add(id, updatedInquiry);
      };
    };
  };

  public query ({ caller }) func getDashboardStats() : async {
    totalInquiries : Nat;
    newInquiries : Nat;
    totalProducts : Nat;
    totalVisits : Nat;
  } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view dashboard stats");
    };
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
