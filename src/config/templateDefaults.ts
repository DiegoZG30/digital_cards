/**
 * Complete default values for ALL template placeholders by sector
 * These defaults are shown when user hasn't entered their own data
 */

import { TemplateSector } from "@/hooks/useTemplates";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
  icon?: string;
}

export interface ScheduleItem {
  day: string;
  hours: string;
  status: "open" | "closed";
}

export interface TestimonialItem {
  text: string;
  author: string;
  source: string;
  rating: number;
}

export interface GalleryItem {
  image: string;
  caption?: string;
}

export interface CertificateItem {
  name: string;
  subtitle?: string;
  icon?: string;
}

export interface TemplateDefaults {
  // ===== PROFILE =====
  fullName: string;
  title: string;
  company: string;
  bio: string;
  profileImage: string;
  backgroundImage: string;
  
  // Multiple background images (for templates with sliders)
  bgImage1: string;
  bgImage2: string;
  bgImage3: string;
  bgImage4: string;
  
  // ===== BADGE/SPECIALTY =====
  cuisineBadge: string;
  specialtyBadge: string;
  languagesBadge: string;
  
  // ===== COLORS (CSS variables) =====
  accentColor: string;
  accentColorHover: string;
  accentColorLight: string;
  
  // ===== CONTACT =====
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  tiktok: string;
  youtube: string;
  websiteUrl: string;
  address: string;
  mapsUrl: string;
  
  // ===== TOP BUTTONS (Refer/Review) =====
  referBtnUrl: string;
  referBtnIcon: string;
  referBtnLabel: string;
  reviewBtnUrl: string;
  reviewBtnIcon: string;
  reviewBtnLabel: string;
  
  // ===== MAIN BUTTON LABELS =====
  reserveBtnLabel: string;
  reserveBtnUrl: string;
  saveContactBtnLabel: string;
  websiteBtnLabel: string;
  shareBtnLabel: string;
  callBtnLabel: string;
  emailBtnLabel: string;
  textBtnLabel: string;
  whatsappBtnLabel: string;
  directionsBtnLabel: string;
  deliveryBtnLabel: string;
  bookBtnLabel: string;
  bookBtnUrl: string;
  quoteBtnLabel: string;
  quoteBtnUrl: string;
  scheduleBtnUrl: string;
  
  // ===== CTA BUTTONS =====
  ctaButtonText: string;
  ctaButtonUrl: string;
  ctaBtnUrl: string;
  ctaBtnIcon: string;
  ctaBtnLabel: string;
  deliveryUrl: string;
  reservationUrl: string;
  
  // ===== VIEW MENU BUTTON =====
  viewMenuBtnUrl: string;
  fullMenuBtnUrl: string;
  fullMenuBtnLabel: string;
  
  // ===== SECTION TITLES =====
  sectionTitle: string;
  menuSectionTitle: string;
  hoursSectionTitle: string;
  servicesSectionTitle: string;
  experienceSectionTitle: string;
  experienceText: string;
  experienceCtaBtnUrl: string;
  experienceCtaBtnIcon: string;
  experienceCtaBtnLabel: string;
  testimonialsTitle: string;
  testimonialsSectionTitle: string;
  leaveReviewUrl: string;
  leaveReviewBtnLabel: string;
  galleryTitle: string;
  gallerySectionTitle: string;
  shareInfoBtnLabel: string;
  getCardUrl: string;
  getCardBtnLabel: string;
  
  // ===== HOURS/SCHEDULE =====
  hours1Day: string;
  hours1Time: string;
  hours1Status: string;
  hours2Day: string;
  hours2Time: string;
  hours2Status: string;
  hours3Day: string;
  hours3Time: string;
  hours3Status: string;
  hours4Day: string;
  hours4Time: string;
  hours4Status: string;
  hours5Day: string;
  hours5Time: string;
  hours5Status: string;
  
  // ===== MENU ITEMS (individual placeholders) =====
  menuItem1Image: string;
  menuItem1Name: string;
  menuItem1Desc: string;
  menuItem1Price: string;
  menuItem2Image: string;
  menuItem2Name: string;
  menuItem2Desc: string;
  menuItem2Price: string;
  menuItem3Image: string;
  menuItem3Name: string;
  menuItem3Desc: string;
  menuItem3Price: string;
  
  // ===== VIDEO =====
  videoUrl: string;
  testimonialsVideoUrl: string;
  
  // ===== CERTIFICATIONS (individual) =====
  cert1Icon: string;
  cert1Line1: string;
  cert1Line2: string;
  cert2Icon: string;
  cert2Line1: string;
  cert2Line2: string;
  cert3Icon: string;
  cert3Line1: string;
  cert3Line2: string;
  
  // ===== TESTIMONIALS (individual) =====
  testimonial1Text: string;
  testimonial1Author: string;
  testimonial1Source: string;
  testimonial2Text: string;
  testimonial2Author: string;
  testimonial2Source: string;
  testimonial3Text: string;
  testimonial3Author: string;
  testimonial3Source: string;
  testimonial4Text: string;
  testimonial4Author: string;
  testimonial4Source: string;
  
  // ===== GALLERY (individual) =====
  gallery1Image: string;
  gallery2Image: string;
  gallery3Image: string;
  gallery4Image: string;
  gallery5Image: string;
  gallery6Image: string;
  gallery7Image: string;
  gallery8Image: string;
  gallery9Image: string;
  gallery10Image: string;
  gallery11Image: string;
  gallery12Image: string;
  
  // ===== SERVICES (individual for construction/cleaning) =====
  service1Name: string;
  service2Name: string;
  service3Name: string;
  service4Name: string;
  service5Name: string;
  service6Name: string;
  service7Name: string;
  service8Name: string;
  service9Name: string;
  
  // ===== REALTOR-SPECIFIC =====
  buyerCategoryTitle: string;
  buyerService1Name: string;
  buyerService2Name: string;
  buyerService3Name: string;
  buyerService4Name: string;
  buyerService5Name: string;
  buyerService6Name: string;
  sellerCategoryTitle: string;
  sellerService1Name: string;
  sellerService2Name: string;
  sellerService3Name: string;
  sellerService4Name: string;
  sellerService5Name: string;
  sellerService6Name: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  feature1Icon: string;
  feature1Text: string;
  feature2Icon: string;
  feature2Text: string;
  feature3Icon: string;
  feature3Text: string;
  feature4Icon: string;
  feature4Text: string;
  listing1Image: string;
  listing1Price: string;
  listing2Image: string;
  listing2Price: string;
  listing3Image: string;
  listing3Price: string;
  listing4Image: string;
  listing4Price: string;
  
  // ===== FOOTER =====
  footerTagline: string;
  footerAddress: string;
  footerBadge: string;
  footerBadgeIcon: string;
  footerBadgeTitle: string;
  footerBadgeSubtitle: string;
  
  // ===== DYNAMIC HTML ARRAYS (for generating HTML) =====
  menuItems: MenuItem[];
  scheduleItems: ScheduleItem[];
  testimonials: TestimonialItem[];
  galleryImages: GalleryItem[];
  certificates: CertificateItem[];
}

// Common defaults shared across all sectors
const commonDefaults = {
  // Profile
  fullName: "Diego Zapata Gallo",
  title: "TU TITULO",
  company: "Tu Empresa",
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  backgroundImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200",
  bgImage1: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
  bgImage2: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
  bgImage3: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
  bgImage4: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
  
  // Contact
  phone: "+17865551234",
  email: "tu@email.com",
  whatsapp: "17865551234",
  linkedin: "https://linkedin.com/in/tu-perfil",
  websiteUrl: "https://tu-sitio.com",
  instagram: "https://instagram.com/tu-perfil",
  facebook: "https://facebook.com/tu-perfil",
  twitter: "#",
  tiktok: "#",
  youtube: "#",
  address: "123 Main Street, Miami FL 33101",
  mapsUrl: "https://maps.google.com/?q=Miami+FL",
  
  // Top Buttons
  referBtnUrl: "#refer",
  referBtnIcon: "fas fa-gift",
  referBtnLabel: "Refer a Friend",
  reviewBtnUrl: "#review",
  reviewBtnIcon: "fas fa-star",
  reviewBtnLabel: "Leave Review",
  
  // Main Buttons
  saveContactBtnLabel: "Save Contact",
  websiteBtnLabel: "Website",
  shareBtnLabel: "Share",
  callBtnLabel: "Call",
  emailBtnLabel: "Email",
  textBtnLabel: "Text",
  whatsappBtnLabel: "WhatsApp",
  directionsBtnLabel: "Directions",
  deliveryBtnLabel: "Delivery",
  bookBtnLabel: "Book Now",
  bookBtnUrl: "#book",
  quoteBtnLabel: "Get a Quote",
  quoteBtnUrl: "#quote",
  scheduleBtnUrl: "#schedule",
  
  // Experience Section
  experienceSectionTitle: "Our Story",
  experienceText: "Dedicated to providing exceptional service and results.",
  experienceCtaBtnUrl: "#contact",
  experienceCtaBtnIcon: "fas fa-calendar-check",
  experienceCtaBtnLabel: "Get Started Today",
  
  // Certifications (individual placeholders)
  cert1Icon: "fas fa-award",
  cert1Line1: "Certified",
  cert1Line2: "Professional",
  cert2Icon: "fas fa-shield-halved",
  cert2Line1: "Licensed",
  cert2Line2: "& Insured",
  cert3Icon: "fas fa-star",
  cert3Line1: "5-Star",
  cert3Line2: "Rated",
  
  // Testimonials Section
  testimonialsSectionTitle: "What Clients Say",
  testimonialsTitle: "Testimonials",
  leaveReviewUrl: "#review",
  leaveReviewBtnLabel: "Leave a Review",
  testimonialsVideoUrl: "",
  
  // Gallery Section
  gallerySectionTitle: "Our Work",
  galleryTitle: "Gallery",
  shareInfoBtnLabel: "Share My Info",
  getCardUrl: "#",
  getCardBtnLabel: "Get Your Card",
  
  // CTA
  ctaButtonText: "Contact Me",
  ctaButtonUrl: "#contact",
  ctaBtnUrl: "#contact",
  ctaBtnIcon: "fas fa-calendar-check",
  ctaBtnLabel: "Get Started Today",
  deliveryUrl: "",
  reservationUrl: "",
  
  // Video
  videoUrl: "",
  
  // Footer
  footerTagline: "Your trusted professional",
  footerAddress: "123 Main Street, Miami FL 33101",
  footerBadge: "Verified Professional",
  footerBadgeIcon: "fas fa-check-circle",
  footerBadgeTitle: "Verified Business",
  footerBadgeSubtitle: "Trusted Professional",
  
  // Badges
  cuisineBadge: "Professional",
  specialtyBadge: "Expert",
  languagesBadge: "English | Spanish",
};

// Restaurant defaults
const restaurantDefaults: TemplateDefaults = {
  ...commonDefaults,
  fullName: "La Maison Dorée",
  title: "Fine Dining Restaurant",
  company: "Est. 1995",
  bio: "Authentic French cuisine crafted with passion and the finest ingredients. Experience culinary excellence in the heart of the city.",
  profileImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300",
  backgroundImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200",
  bgImage1: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
  bgImage2: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
  bgImage3: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
  bgImage4: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
  
  cuisineBadge: "French Cuisine",
  specialtyBadge: "Fine Dining",
  languagesBadge: "English | French",
  
  accentColor: "#c9a84a",
  accentColorHover: "#b8973f",
  accentColorLight: "rgba(201, 168, 74, 0.15)",
  
  phone: "+1 (555) 123-4567",
  email: "reservations@maisondoree.com",
  whatsapp: "+15551234567",
  instagram: "https://instagram.com/maisondoree",
  facebook: "https://facebook.com/maisondoree",
  linkedin: "#",
  twitter: "#",
  tiktok: "#",
  youtube: "#",
  websiteUrl: "https://maisondoree.com",
  address: "123 Gourmet Avenue, NY 10001",
  mapsUrl: "https://maps.google.com/?q=123+Gourmet+Avenue",
  
  // Top Buttons
  referBtnUrl: "#refer",
  referBtnIcon: "fas fa-gift",
  referBtnLabel: "Refer a Friend",
  reviewBtnUrl: "#review",
  reviewBtnIcon: "fas fa-star",
  reviewBtnLabel: "Leave Review",
  
  // Button Labels
  reserveBtnLabel: "Reserve a Table",
  reserveBtnUrl: "#reserve",
  saveContactBtnLabel: "Save Contact",
  websiteBtnLabel: "Our Website",
  shareBtnLabel: "Share",
  callBtnLabel: "Call",
  emailBtnLabel: "Email",
  textBtnLabel: "Text",
  whatsappBtnLabel: "WhatsApp",
  directionsBtnLabel: "Directions",
  deliveryBtnLabel: "Order Delivery",
  bookBtnLabel: "Reserve Now",
  bookBtnUrl: "#reserve",
  quoteBtnLabel: "Get Quote",
  quoteBtnUrl: "#quote",
  scheduleBtnUrl: "#schedule",
  
  ctaButtonText: "Reserve a Table",
  ctaButtonUrl: "#reserve",
  ctaBtnUrl: "#reserve",
  ctaBtnIcon: "fas fa-calendar-check",
  ctaBtnLabel: "Make a Reservation",
  deliveryUrl: "https://ubereats.com/restaurant",
  reservationUrl: "https://opentable.com/restaurant",
  
  // Menu section
  viewMenuBtnUrl: "#menu",
  fullMenuBtnUrl: "#fullmenu",
  fullMenuBtnLabel: "View Full Menu",
  sectionTitle: "Our Menu",
  menuSectionTitle: "Featured Menu",
  
  // Menu items (individual placeholders)
  menuItem1Image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200",
  menuItem1Name: "Filet Mignon",
  menuItem1Desc: "Premium cut with truffle sauce",
  menuItem1Price: "$45",
  menuItem2Image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200",
  menuItem2Name: "Lobster Bisque",
  menuItem2Desc: "Creamy New England style",
  menuItem2Price: "$28",
  menuItem3Image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200",
  menuItem3Name: "Crème Brûlée",
  menuItem3Desc: "Classic French dessert",
  menuItem3Price: "$16",
  
  // Hours
  hoursSectionTitle: "Hours",
  hours1Day: "Monday - Thursday",
  hours1Time: "11:00 AM - 10:00 PM",
  hours1Status: "open",
  hours2Day: "Friday",
  hours2Time: "11:00 AM - 11:00 PM",
  hours2Status: "open",
  hours3Day: "Saturday",
  hours3Time: "10:00 AM - 11:00 PM",
  hours3Status: "open",
  hours4Day: "Sunday",
  hours4Time: "10:00 AM - 9:00 PM",
  hours4Status: "open",
  hours5Day: "Holidays",
  hours5Time: "Hours may vary",
  hours5Status: "closed",
  
  videoUrl: "https://youtube.com/watch?v=example",
  testimonialsVideoUrl: "",
  
  // Experience
  experienceSectionTitle: "Our Story",
  experienceText: "A culinary journey through the finest flavors, crafted with passion since 1995.",
  experienceCtaBtnUrl: "#reserve",
  experienceCtaBtnIcon: "fas fa-calendar-check",
  experienceCtaBtnLabel: "Make a Reservation",
  
  // Certifications
  cert1Icon: "fas fa-star",
  cert1Line1: "Michelin",
  cert1Line2: "Star",
  cert2Icon: "fas fa-wine-glass",
  cert2Line1: "Wine Spectator",
  cert2Line2: "Award",
  cert3Icon: "fas fa-gem",
  cert3Line1: "AAA Five",
  cert3Line2: "Diamond",
  
  // Testimonials section
  testimonialsSectionTitle: "What Our Guests Say",
  testimonialsTitle: "What Our Guests Say",
  leaveReviewUrl: "#review",
  leaveReviewBtnLabel: "Leave a Review",
  
  testimonial1Text: "The best dining experience in the city. Every dish is a masterpiece.",
  testimonial1Author: "Maria G.",
  testimonial1Source: "Google",
  testimonial2Text: "Incredible atmosphere and impeccable service. A must-visit!",
  testimonial2Author: "Carlos R.",
  testimonial2Source: "Yelp",
  testimonial3Text: "The chef's special was divine. Will definitely come back.",
  testimonial3Author: "Ana L.",
  testimonial3Source: "TripAdvisor",
  testimonial4Text: "Perfect for special occasions. The wine selection is outstanding.",
  testimonial4Author: "Roberto M.",
  testimonial4Source: "Google",
  
  // Gallery
  gallerySectionTitle: "Gallery",
  galleryTitle: "Gallery",
  shareInfoBtnLabel: "Share My Info",
  getCardUrl: "#",
  getCardBtnLabel: "Get Your Card",
  
  gallery1Image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
  gallery2Image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
  gallery3Image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
  gallery4Image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
  gallery5Image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
  gallery6Image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  gallery7Image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
  gallery8Image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400",
  gallery9Image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400",
  gallery10Image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400",
  gallery11Image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
  gallery12Image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400",
  
  // Services (not primary for restaurant but included)
  servicesSectionTitle: "Our Services",
  service1Name: "Dine In",
  service2Name: "Takeout",
  service3Name: "Catering",
  service4Name: "Private Events",
  service5Name: "Wine Pairing",
  service6Name: "Chef's Table",
  service7Name: "Delivery",
  service8Name: "Gift Cards",
  service9Name: "Cooking Classes",
  
  // Realtor-specific (empty for restaurant)
  buyerCategoryTitle: "",
  buyerService1Name: "",
  buyerService2Name: "",
  buyerService3Name: "",
  buyerService4Name: "",
  buyerService5Name: "",
  buyerService6Name: "",
  sellerCategoryTitle: "",
  sellerService1Name: "",
  sellerService2Name: "",
  sellerService3Name: "",
  sellerService4Name: "",
  sellerService5Name: "",
  sellerService6Name: "",
  stat1Value: "",
  stat1Label: "",
  stat2Value: "",
  stat2Label: "",
  stat3Value: "",
  stat3Label: "",
  feature1Icon: "",
  feature1Text: "",
  feature2Icon: "",
  feature2Text: "",
  feature3Icon: "",
  feature3Text: "",
  feature4Icon: "",
  feature4Text: "",
  listing1Image: "",
  listing1Price: "",
  listing2Image: "",
  listing2Price: "",
  listing3Image: "",
  listing3Price: "",
  listing4Image: "",
  listing4Price: "",
  
  footerTagline: "Where every meal tells a story",
  footerAddress: "123 Gourmet Ave, Miami FL 33101",
  footerBadge: "Michelin Star",
  footerBadgeIcon: "fas fa-star",
  footerBadgeTitle: "Award Winning",
  footerBadgeSubtitle: "Fine Dining",
  
  // Dynamic arrays
  menuItems: [
    { name: "Coq au Vin", description: "Classic braised chicken in burgundy wine", price: "$38", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400" },
    { name: "Bouillabaisse", description: "Traditional Marseille fish stew", price: "$45", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400" },
    { name: "Crème Brûlée", description: "Vanilla custard with caramelized sugar", price: "$14", image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400" }
  ],
  
  scheduleItems: [
    { day: "Monday - Thursday", hours: "5:00 PM - 10:00 PM", status: "open" },
    { day: "Friday - Saturday", hours: "5:00 PM - 11:00 PM", status: "open" },
    { day: "Sunday", hours: "4:00 PM - 9:00 PM", status: "open" }
  ],
  
  testimonials: [
    { text: "An unforgettable dining experience!", author: "Sarah M.", source: "Google", rating: 5 },
    { text: "Elegant atmosphere and impeccable service.", author: "James L.", source: "Yelp", rating: 5 },
    { text: "Best French restaurant in the city.", author: "Emily R.", source: "TripAdvisor", rating: 5 },
    { text: "A true gem. Every dish is a work of art.", author: "Michael K.", source: "OpenTable", rating: 5 }
  ],
  
  galleryImages: [
    { image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600", caption: "Dining Room" },
    { image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600", caption: "Ambiance" },
    { image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600", caption: "Private Dining" },
    { image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600", caption: "Signature Dish" }
  ],
  
  certificates: [
    { name: "Michelin Star", subtitle: "2023-2024", icon: "fa-star" },
    { name: "Wine Spectator", subtitle: "Excellence", icon: "fa-wine-glass" },
    { name: "AAA Five Diamond", subtitle: "Distinguished", icon: "fa-gem" }
  ]
};

// Real Estate defaults
const realEstateDefaults: TemplateDefaults = {
  ...commonDefaults,
  fullName: "Marcus Anderson",
  title: "Luxury Real Estate Specialist",
  company: "Premier Properties Group",
  bio: "With over 15 years of experience in luxury real estate, I help clients find their dream homes.",
  profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300",
  backgroundImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
  bgImage1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
  bgImage2: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
  bgImage3: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600",
  bgImage4: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
  
  cuisineBadge: "Luxury Properties",
  specialtyBadge: "Top Producer",
  languagesBadge: "English | Spanish",
  
  accentColor: "#8B7355",
  accentColorHover: "#7a6548",
  accentColorLight: "rgba(139, 115, 85, 0.15)",
  
  phone: "+1 (555) 987-6543",
  email: "marcus@premierproperties.com",
  whatsapp: "+15559876543",
  instagram: "https://instagram.com/marcusrealty",
  facebook: "https://facebook.com/marcusrealty",
  linkedin: "https://linkedin.com/in/marcusrealty",
  twitter: "#",
  tiktok: "#",
  youtube: "#",
  websiteUrl: "https://premierproperties.com/marcus",
  address: "456 Luxury Lane, Beverly Hills, CA 90210",
  mapsUrl: "https://maps.google.com/?q=456+Luxury+Lane",
  
  referBtnUrl: "#refer",
  referBtnIcon: "fas fa-gift",
  referBtnLabel: "Refer a Friend",
  reviewBtnUrl: "#review",
  reviewBtnIcon: "fas fa-star",
  reviewBtnLabel: "Leave Review",
  
  reserveBtnLabel: "Schedule Showing",
  reserveBtnUrl: "#schedule",
  saveContactBtnLabel: "Save Contact",
  websiteBtnLabel: "View Listings",
  shareBtnLabel: "Share",
  callBtnLabel: "Call",
  emailBtnLabel: "Email",
  textBtnLabel: "Text",
  whatsappBtnLabel: "WhatsApp",
  directionsBtnLabel: "Directions",
  deliveryBtnLabel: "",
  bookBtnLabel: "Schedule Showing",
  bookBtnUrl: "#schedule",
  quoteBtnLabel: "Get Valuation",
  quoteBtnUrl: "#valuation",
  scheduleBtnUrl: "#schedule",
  
  ctaButtonText: "Schedule Showing",
  ctaButtonUrl: "#schedule",
  ctaBtnUrl: "#contact",
  ctaBtnIcon: "fas fa-calendar-check",
  ctaBtnLabel: "Let's Find Your Home",
  deliveryUrl: "",
  reservationUrl: "https://calendly.com/marcus-realty",
  
  viewMenuBtnUrl: "",
  fullMenuBtnUrl: "",
  fullMenuBtnLabel: "",
  
  sectionTitle: "Specialties",
  menuSectionTitle: "Property Types",
  hoursSectionTitle: "Availability",
  servicesSectionTitle: "Services",
  experienceSectionTitle: "Why Choose Me",
  experienceText: "Personalized approach for every client with deep knowledge of the local market.",
  experienceCtaBtnUrl: "#contact",
  experienceCtaBtnIcon: "fas fa-home",
  experienceCtaBtnLabel: "Let's Find Your Home",
  testimonialsSectionTitle: "Client Testimonials",
  testimonialsTitle: "Client Testimonials",
  leaveReviewUrl: "#review",
  leaveReviewBtnLabel: "Leave a Review",
  testimonialsVideoUrl: "",
  gallerySectionTitle: "Featured Properties",
  galleryTitle: "Featured Properties",
  shareInfoBtnLabel: "Share My Info",
  getCardUrl: "#",
  getCardBtnLabel: "Get Your Card",
  
  // Hours
  hours1Day: "Monday - Friday",
  hours1Time: "9:00 AM - 6:00 PM",
  hours1Status: "open",
  hours2Day: "Saturday",
  hours2Time: "10:00 AM - 4:00 PM",
  hours2Status: "open",
  hours3Day: "Sunday",
  hours3Time: "By Appointment",
  hours3Status: "open",
  hours4Day: "",
  hours4Time: "",
  hours4Status: "",
  hours5Day: "",
  hours5Time: "",
  hours5Status: "",
  
  menuItem1Image: "",
  menuItem1Name: "",
  menuItem1Desc: "",
  menuItem1Price: "",
  menuItem2Image: "",
  menuItem2Name: "",
  menuItem2Desc: "",
  menuItem2Price: "",
  menuItem3Image: "",
  menuItem3Name: "",
  menuItem3Desc: "",
  menuItem3Price: "",
  
  videoUrl: "",
  
  cert1Icon: "fas fa-trophy",
  cert1Line1: "Top Producer",
  cert1Line2: "2023",
  cert2Icon: "fas fa-gem",
  cert2Line1: "Luxury",
  cert2Line2: "Specialist",
  cert3Icon: "fas fa-award",
  cert3Line1: "NAR Member",
  cert3Line2: "Since 2008",
  
  testimonial1Text: "Found our dream home in just 2 weeks!",
  testimonial1Author: "The Martinez Family",
  testimonial1Source: "Zillow",
  testimonial2Text: "Sold our house above asking price.",
  testimonial2Author: "John & Sarah K.",
  testimonial2Source: "Realtor.com",
  testimonial3Text: "Professional and always available.",
  testimonial3Author: "Mike T.",
  testimonial3Source: "Google",
  testimonial4Text: "Made the whole process stress-free.",
  testimonial4Author: "Lisa M.",
  testimonial4Source: "Yelp",
  
  gallery1Image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
  gallery2Image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400",
  gallery3Image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
  gallery4Image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
  gallery5Image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
  gallery6Image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
  gallery7Image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
  gallery8Image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400",
  gallery9Image: "",
  gallery10Image: "",
  gallery11Image: "",
  gallery12Image: "",
  
  service1Name: "Luxury Homes",
  service2Name: "Investment",
  service3Name: "New Developments",
  service4Name: "Relocation",
  service5Name: "Consulting",
  service6Name: "Staging",
  service7Name: "",
  service8Name: "",
  service9Name: "",
  
  // Realtor-specific
  buyerCategoryTitle: "For Buyers",
  buyerService1Name: "Property Search",
  buyerService2Name: "Market Analysis",
  buyerService3Name: "Negotiation",
  buyerService4Name: "Financing Help",
  buyerService5Name: "Home Inspection",
  buyerService6Name: "Closing Support",
  sellerCategoryTitle: "For Sellers",
  sellerService1Name: "Home Valuation",
  sellerService2Name: "Staging Advice",
  sellerService3Name: "Professional Photos",
  sellerService4Name: "MLS Listing",
  sellerService5Name: "Open Houses",
  sellerService6Name: "Contract Review",
  stat1Value: "$45M+",
  stat1Label: "In Sales",
  stat2Value: "120+",
  stat2Label: "Homes Sold",
  stat3Value: "12",
  stat3Label: "Years Exp.",
  feature1Icon: "fas fa-heart",
  feature1Text: "Personalized approach for every client",
  feature2Icon: "fas fa-map-marker-alt",
  feature2Text: "Deep knowledge of the local market",
  feature3Icon: "fas fa-handshake",
  feature3Text: "Expert negotiation skills",
  feature4Icon: "fas fa-check-circle",
  feature4Text: "Seamless closing process",
  listing1Image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
  listing1Price: "$450,000",
  listing2Image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400",
  listing2Price: "$680,000",
  listing3Image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
  listing3Price: "$925,000",
  listing4Image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
  listing4Price: "$1,200,000",
  
  footerTagline: "Your trusted real estate partner",
  footerAddress: "456 Luxury Lane, Beverly Hills, CA 90210",
  footerBadge: "Licensed Realtor",
  footerBadgeIcon: "fas fa-home",
  footerBadgeTitle: "Licensed Realtor",
  footerBadgeSubtitle: "Top Producer",
  
  menuItems: [
    { name: "Luxury Homes", description: "High-end residential properties", price: "$2M+", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" },
    { name: "Investment", description: "Commercial opportunities", price: "Varies", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400" },
    { name: "New Developments", description: "Pre-construction options", price: "From $800K", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400" }
  ],
  scheduleItems: [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM", status: "open" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM", status: "open" },
    { day: "Sunday", hours: "By Appointment", status: "open" }
  ],
  testimonials: [
    { text: "Found our dream home in under 30 days!", author: "Robert & Linda T.", source: "Zillow", rating: 5 },
    { text: "Professional, knowledgeable, and always available.", author: "Jennifer S.", source: "Realtor.com", rating: 5 },
    { text: "Made the selling process seamless.", author: "David M.", source: "Google", rating: 5 },
    { text: "The best realtor in Beverly Hills.", author: "Amanda C.", source: "Yelp", rating: 5 }
  ],
  galleryImages: [
    { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600", caption: "Modern Villa" },
    { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600", caption: "Luxury Interior" },
    { image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600", caption: "Pool Estate" },
    { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600", caption: "Hillside Home" }
  ],
  certificates: [
    { name: "Top Producer", subtitle: "2023", icon: "fa-trophy" },
    { name: "Luxury Specialist", subtitle: "CLHMS", icon: "fa-gem" },
    { name: "NAR Member", subtitle: "Since 2008", icon: "fa-award" }
  ]
};

// Construction defaults
const constructionDefaults: TemplateDefaults = {
  ...commonDefaults,
  fullName: "BuildRight Construction",
  title: "General Contractor",
  company: "Licensed & Insured",
  bio: "Family-owned construction company with 25+ years of experience. We build quality homes and commercial spaces.",
  profileImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300",
  backgroundImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200",
  bgImage1: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
  bgImage2: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=600",
  bgImage3: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600",
  bgImage4: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600",
  
  cuisineBadge: "General Contractor",
  specialtyBadge: "Licensed & Bonded",
  languagesBadge: "English | Spanish",
  
  accentColor: "#D97706",
  accentColorHover: "#c56905",
  accentColorLight: "rgba(217, 119, 6, 0.15)",
  
  phone: "+1 (555) 456-7890",
  email: "info@buildrightconstruction.com",
  whatsapp: "+15554567890",
  instagram: "https://instagram.com/buildrightco",
  facebook: "https://facebook.com/buildrightconstruction",
  linkedin: "https://linkedin.com/company/buildright",
  twitter: "#",
  tiktok: "#",
  youtube: "#",
  websiteUrl: "https://buildrightconstruction.com",
  address: "789 Builder Street, Austin, TX 78701",
  mapsUrl: "https://maps.google.com/?q=789+Builder+Street",
  
  referBtnUrl: "#refer",
  referBtnIcon: "fas fa-gift",
  referBtnLabel: "Refer a Friend",
  reviewBtnUrl: "#review",
  reviewBtnIcon: "fas fa-star",
  reviewBtnLabel: "Leave Review",
  
  reserveBtnLabel: "Get Estimate",
  reserveBtnUrl: "#estimate",
  saveContactBtnLabel: "Save Contact",
  websiteBtnLabel: "Our Website",
  shareBtnLabel: "Share",
  callBtnLabel: "Call",
  emailBtnLabel: "Email",
  textBtnLabel: "Text",
  whatsappBtnLabel: "WhatsApp",
  directionsBtnLabel: "Directions",
  deliveryBtnLabel: "",
  bookBtnLabel: "Get Quote",
  bookBtnUrl: "#quote",
  quoteBtnLabel: "Get a Quote",
  quoteBtnUrl: "#quote",
  scheduleBtnUrl: "#schedule",
  
  ctaButtonText: "Get Free Estimate",
  ctaButtonUrl: "#estimate",
  ctaBtnUrl: "#quote",
  ctaBtnIcon: "fas fa-calendar-check",
  ctaBtnLabel: "Request a Free Quote",
  deliveryUrl: "",
  reservationUrl: "https://calendly.com/buildright-consult",
  
  viewMenuBtnUrl: "",
  fullMenuBtnUrl: "",
  fullMenuBtnLabel: "",
  
  sectionTitle: "Our Services",
  menuSectionTitle: "Project Types",
  hoursSectionTitle: "Business Hours",
  servicesSectionTitle: "Our Services",
  experienceSectionTitle: "Why Choose Us",
  experienceText: "20+ years of experience building dreams, one project at a time.",
  experienceCtaBtnUrl: "#quote",
  experienceCtaBtnIcon: "fas fa-hard-hat",
  experienceCtaBtnLabel: "Request a Free Quote",
  testimonialsSectionTitle: "Customer Reviews",
  testimonialsTitle: "Customer Reviews",
  leaveReviewUrl: "#review",
  leaveReviewBtnLabel: "Leave a Review",
  testimonialsVideoUrl: "",
  gallerySectionTitle: "Recent Projects",
  galleryTitle: "Recent Projects",
  shareInfoBtnLabel: "Share My Info",
  getCardUrl: "#",
  getCardBtnLabel: "Get Your Card",
  
  hours1Day: "Monday - Friday",
  hours1Time: "7:00 AM - 5:00 PM",
  hours1Status: "open",
  hours2Day: "Saturday",
  hours2Time: "8:00 AM - 2:00 PM",
  hours2Status: "open",
  hours3Day: "Sunday",
  hours3Time: "Closed",
  hours3Status: "closed",
  hours4Day: "",
  hours4Time: "",
  hours4Status: "",
  hours5Day: "",
  hours5Time: "",
  hours5Status: "",
  
  menuItem1Image: "",
  menuItem1Name: "",
  menuItem1Desc: "",
  menuItem1Price: "",
  menuItem2Image: "",
  menuItem2Name: "",
  menuItem2Desc: "",
  menuItem2Price: "",
  menuItem3Image: "",
  menuItem3Name: "",
  menuItem3Desc: "",
  menuItem3Price: "",
  
  videoUrl: "https://youtube.com/watch?v=example",
  
  cert1Icon: "fas fa-id-card",
  cert1Line1: "Licensed",
  cert1Line2: "TX #123456",
  cert2Icon: "fas fa-shield-check",
  cert2Line1: "Fully Insured",
  cert2Line2: "$2M Coverage",
  cert3Icon: "fas fa-award",
  cert3Line1: "BBB A+",
  cert3Line2: "Since 1998",
  
  testimonial1Text: "Transformed our home completely!",
  testimonial1Author: "David & Maria P.",
  testimonial1Source: "Google",
  testimonial2Text: "Professional crew, excellent results.",
  testimonial2Author: "Jennifer L.",
  testimonial2Source: "Yelp",
  testimonial3Text: "On budget and on time. Highly recommend.",
  testimonial3Author: "Robert K.",
  testimonial3Source: "Angi",
  testimonial4Text: "Quality craftsmanship from start to finish.",
  testimonial4Author: "Susan M.",
  testimonial4Source: "BBB",
  
  gallery1Image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400",
  gallery2Image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
  gallery3Image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400",
  gallery4Image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=400",
  gallery5Image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
  gallery6Image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400",
  gallery7Image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400",
  gallery8Image: "https://images.unsplash.com/photo-1600566753376-12c8ab7c0edf?w=400",
  gallery9Image: "",
  gallery10Image: "",
  gallery11Image: "",
  gallery12Image: "",
  
  service1Name: "Residential",
  service2Name: "Commercial",
  service3Name: "Renovations",
  service4Name: "Roofing",
  service5Name: "Plumbing",
  service6Name: "Electrical",
  service7Name: "Painting",
  service8Name: "Flooring",
  service9Name: "Landscaping",
  
  // Realtor-specific (empty for construction)
  buyerCategoryTitle: "",
  buyerService1Name: "",
  buyerService2Name: "",
  buyerService3Name: "",
  buyerService4Name: "",
  buyerService5Name: "",
  buyerService6Name: "",
  sellerCategoryTitle: "",
  sellerService1Name: "",
  sellerService2Name: "",
  sellerService3Name: "",
  sellerService4Name: "",
  sellerService5Name: "",
  sellerService6Name: "",
  stat1Value: "25+",
  stat1Label: "Years Exp.",
  stat2Value: "500+",
  stat2Label: "Projects",
  stat3Value: "100%",
  stat3Label: "Satisfaction",
  feature1Icon: "fas fa-hard-hat",
  feature1Text: "20+ years of experience",
  feature2Icon: "fas fa-shield-halved",
  feature2Text: "Licensed and insured",
  feature3Icon: "fas fa-clock",
  feature3Text: "On-time project delivery",
  feature4Icon: "fas fa-handshake",
  feature4Text: "Satisfaction guaranteed",
  listing1Image: "",
  listing1Price: "",
  listing2Image: "",
  listing2Price: "",
  listing3Image: "",
  listing3Price: "",
  listing4Image: "",
  listing4Price: "",
  
  footerTagline: "Building dreams, one project at a time",
  footerAddress: "789 Builder Street, Austin, TX 78701",
  footerBadge: "Licensed Contractor",
  footerBadgeIcon: "fas fa-hard-hat",
  footerBadgeTitle: "Licensed Contractor",
  footerBadgeSubtitle: "BBB A+ Rated",
  
  menuItems: [
    { name: "Custom Homes", description: "Build your dream home", price: "From $350K", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400" },
    { name: "Renovations", description: "Kitchen, bathroom, whole-home remodels", price: "Free Quote", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400" },
    { name: "Commercial", description: "Office buildings, retail spaces", price: "Custom", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400" }
  ],
  scheduleItems: [
    { day: "Monday - Friday", hours: "7:00 AM - 5:00 PM", status: "open" },
    { day: "Saturday", hours: "8:00 AM - 2:00 PM", status: "open" },
    { day: "Sunday", hours: "Closed", status: "closed" }
  ],
  testimonials: [
    { text: "Built our custom home on time and on budget!", author: "Tom & Mary H.", source: "Google", rating: 5 },
    { text: "Professional crew, clean worksite.", author: "Steve R.", source: "Yelp", rating: 5 },
    { text: "Our kitchen remodel exceeded expectations!", author: "Lisa P.", source: "Angi", rating: 5 },
    { text: "Fair pricing and outstanding quality.", author: "Mark D.", source: "BBB", rating: 5 }
  ],
  galleryImages: [
    { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600", caption: "Custom Home" },
    { image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600", caption: "Kitchen Remodel" },
    { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600", caption: "Interior" },
    { image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600", caption: "Outdoor Living" }
  ],
  certificates: [
    { name: "Licensed", subtitle: "TX #123456", icon: "fa-id-card" },
    { name: "Fully Insured", subtitle: "$2M Coverage", icon: "fa-shield-check" },
    { name: "BBB A+ Rated", subtitle: "Since 1998", icon: "fa-award" }
  ]
};

// Cleaning/AllDry defaults
const cleaningDefaults: TemplateDefaults = {
  ...commonDefaults,
  fullName: "Sparkle Clean Pro",
  title: "Professional Cleaning Services",
  company: "Residential & Commercial",
  bio: "We bring the sparkle to your space! Eco-friendly cleaning solutions with guaranteed satisfaction.",
  profileImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300",
  backgroundImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200",
  bgImage1: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600",
  bgImage2: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
  bgImage3: "https://images.unsplash.com/photo-1527515637462-cee12f5f0e05?w=600",
  bgImage4: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600",
  
  cuisineBadge: "Eco-Friendly",
  specialtyBadge: "5-Star Rated",
  languagesBadge: "English | Spanish",
  
  accentColor: "#3B82F6",
  accentColorHover: "#2563eb",
  accentColorLight: "rgba(59, 130, 246, 0.15)",
  
  phone: "+1 (555) 321-0987",
  email: "hello@sparklecleanpro.com",
  whatsapp: "+15553210987",
  instagram: "https://instagram.com/sparklecleanpro",
  facebook: "https://facebook.com/sparklecleanpro",
  linkedin: "#",
  twitter: "#",
  tiktok: "#",
  youtube: "#",
  websiteUrl: "https://sparklecleanpro.com",
  address: "321 Clean Street, Miami, FL 33101",
  mapsUrl: "https://maps.google.com/?q=321+Clean+Street",
  
  referBtnUrl: "#refer",
  referBtnIcon: "fas fa-gift",
  referBtnLabel: "Refer a Friend",
  reviewBtnUrl: "#review",
  reviewBtnIcon: "fas fa-star",
  reviewBtnLabel: "Leave Review",
  
  reserveBtnLabel: "Book Now",
  reserveBtnUrl: "#book",
  saveContactBtnLabel: "Save Contact",
  websiteBtnLabel: "Our Website",
  shareBtnLabel: "Share",
  callBtnLabel: "Call",
  emailBtnLabel: "Email",
  textBtnLabel: "Text",
  whatsappBtnLabel: "WhatsApp",
  directionsBtnLabel: "Directions",
  deliveryBtnLabel: "",
  bookBtnLabel: "Book Service",
  bookBtnUrl: "#book",
  quoteBtnLabel: "Get Quote",
  quoteBtnUrl: "#quote",
  scheduleBtnUrl: "#schedule",
  
  ctaButtonText: "Book Cleaning",
  ctaButtonUrl: "#book",
  ctaBtnUrl: "#emergency",
  ctaBtnIcon: "fas fa-phone",
  ctaBtnLabel: "Call Now - 24/7",
  deliveryUrl: "",
  reservationUrl: "https://calendly.com/sparkle-clean",
  
  viewMenuBtnUrl: "",
  fullMenuBtnUrl: "",
  fullMenuBtnLabel: "",
  
  sectionTitle: "Our Services",
  menuSectionTitle: "Service Packages",
  hoursSectionTitle: "Availability",
  servicesSectionTitle: "Our Services",
  experienceSectionTitle: "Why Choose Us",
  experienceText: "24/7 Emergency Response with IICRC Certified Technicians.",
  experienceCtaBtnUrl: "#book",
  experienceCtaBtnIcon: "fas fa-bolt",
  experienceCtaBtnLabel: "Book Now",
  testimonialsSectionTitle: "Happy Customers",
  testimonialsTitle: "Happy Customers",
  leaveReviewUrl: "#review",
  leaveReviewBtnLabel: "Leave a Review",
  testimonialsVideoUrl: "",
  gallerySectionTitle: "Before & After",
  galleryTitle: "Before & After",
  shareInfoBtnLabel: "Share My Info",
  getCardUrl: "#",
  getCardBtnLabel: "Get Your Card",
  
  hours1Day: "Monday - Friday",
  hours1Time: "8:00 AM - 6:00 PM",
  hours1Status: "open",
  hours2Day: "Saturday",
  hours2Time: "9:00 AM - 4:00 PM",
  hours2Status: "open",
  hours3Day: "Sunday",
  hours3Time: "Emergency Only",
  hours3Status: "open",
  hours4Day: "24/7 Emergency",
  hours4Time: "Always Available",
  hours4Status: "open",
  hours5Day: "",
  hours5Time: "",
  hours5Status: "",
  
  menuItem1Image: "",
  menuItem1Name: "",
  menuItem1Desc: "",
  menuItem1Price: "",
  menuItem2Image: "",
  menuItem2Name: "",
  menuItem2Desc: "",
  menuItem2Price: "",
  menuItem3Image: "",
  menuItem3Name: "",
  menuItem3Desc: "",
  menuItem3Price: "",
  
  videoUrl: "https://youtube.com/watch?v=example",
  
  cert1Icon: "fas fa-bolt",
  cert1Line1: "24/7",
  cert1Line2: "Emergency",
  cert2Icon: "fas fa-shield-halved",
  cert2Line1: "IICRC",
  cert2Line2: "Certified",
  cert3Icon: "fas fa-leaf",
  cert3Line1: "Eco",
  cert3Line2: "Friendly",
  
  testimonial1Text: "Responded within 30 minutes to our flood!",
  testimonial1Author: "The Garcia Family",
  testimonial1Source: "Google",
  testimonial2Text: "Saved our business after the fire.",
  testimonial2Author: "Mark's Auto Shop",
  testimonial2Source: "Yelp",
  testimonial3Text: "Professional and thorough mold removal.",
  testimonial3Author: "Patricia L.",
  testimonial3Source: "Facebook",
  testimonial4Text: "Our carpets look brand new again!",
  testimonial4Author: "Apartment Complex Mgmt",
  testimonial4Source: "Thumbtack",
  
  gallery1Image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400",
  gallery2Image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
  gallery3Image: "https://images.unsplash.com/photo-1527515637462-cee12f5f0e05?w=400",
  gallery4Image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400",
  gallery5Image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
  gallery6Image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400",
  gallery7Image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400",
  gallery8Image: "https://images.unsplash.com/photo-1600566753376-12c8ab7c0edf?w=400",
  gallery9Image: "",
  gallery10Image: "",
  gallery11Image: "",
  gallery12Image: "",
  
  service1Name: "Water Damage",
  service2Name: "Fire Restoration",
  service3Name: "Mold Removal",
  service4Name: "Carpet Cleaning",
  service5Name: "Air Duct Cleaning",
  service6Name: "Biohazard",
  service7Name: "Storm Damage",
  service8Name: "Sewage Cleanup",
  service9Name: "Odor Removal",
  
  // Realtor-specific (empty for cleaning)
  buyerCategoryTitle: "",
  buyerService1Name: "",
  buyerService2Name: "",
  buyerService3Name: "",
  buyerService4Name: "",
  buyerService5Name: "",
  buyerService6Name: "",
  sellerCategoryTitle: "",
  sellerService1Name: "",
  sellerService2Name: "",
  sellerService3Name: "",
  sellerService4Name: "",
  sellerService5Name: "",
  sellerService6Name: "",
  stat1Value: "10K+",
  stat1Label: "Jobs Done",
  stat2Value: "24/7",
  stat2Label: "Emergency",
  stat3Value: "100%",
  stat3Label: "Satisfaction",
  feature1Icon: "fas fa-bolt",
  feature1Text: "24/7 Emergency Response",
  feature2Icon: "fas fa-shield-halved",
  feature2Text: "IICRC Certified Technicians",
  feature3Icon: "fas fa-clock",
  feature3Text: "Fast Response Time",
  feature4Icon: "fas fa-handshake",
  feature4Text: "Insurance Claim Assistance",
  listing1Image: "",
  listing1Price: "",
  listing2Image: "",
  listing2Price: "",
  listing3Image: "",
  listing3Price: "",
  listing4Image: "",
  listing4Price: "",
  
  footerTagline: "Restoring what matters most",
  footerAddress: "321 Clean Street, Miami, FL 33101",
  footerBadge: "IICRC Certified",
  footerBadgeIcon: "fas fa-certificate",
  footerBadgeTitle: "IICRC Certified",
  footerBadgeSubtitle: "Trusted Professional",
  
  menuItems: [
    { name: "Deep Cleaning", description: "Thorough top-to-bottom cleaning", price: "From $199", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400" },
    { name: "Regular Cleaning", description: "Weekly or bi-weekly maintenance", price: "From $99", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400" },
    { name: "Move In/Out", description: "Complete cleaning for transitions", price: "From $299", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400" }
  ],
  scheduleItems: [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM", status: "open" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM", status: "open" },
    { day: "Emergency", hours: "24/7 Available", status: "open" }
  ],
  testimonials: [
    { text: "My apartment has never looked this clean!", author: "Jessica W.", source: "Google", rating: 5 },
    { text: "I use them weekly for my office. Always reliable!", author: "Carlos M.", source: "Yelp", rating: 5 },
    { text: "Saved me so much time. Worth every penny!", author: "Karen T.", source: "Facebook", rating: 5 },
    { text: "Eco-friendly products and great attention to detail.", author: "Brian L.", source: "Thumbtack", rating: 5 }
  ],
  galleryImages: [
    { image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600", caption: "Kitchen Clean" },
    { image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600", caption: "Living Room" },
    { image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600", caption: "Bathroom" },
    { image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600", caption: "Office" }
  ],
  certificates: [
    { name: "Licensed", subtitle: "State Certified", icon: "fa-id-card" },
    { name: "Insured", subtitle: "Fully Bonded", icon: "fa-shield-check" },
    { name: "Eco-Friendly", subtitle: "Green Certified", icon: "fa-leaf" }
  ]
};

// General defaults (fallback)
const generalDefaults: TemplateDefaults = {
  ...commonDefaults,
  fullName: "Your Name",
  title: "Your Title",
  company: "Your Company",
  bio: "Write a brief description about yourself or your business here.",
  profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300",
  backgroundImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200",
  bgImage1: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
  bgImage2: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600",
  bgImage3: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600",
  bgImage4: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
  
  cuisineBadge: "Professional",
  specialtyBadge: "Expert",
  languagesBadge: "English",
  
  accentColor: "#D4AF37",
  accentColorHover: "#c5a028",
  accentColorLight: "rgba(212, 175, 55, 0.15)",
  
  phone: "+1 (555) 000-0000",
  email: "your@email.com",
  whatsapp: "+15550000000",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  linkedin: "https://linkedin.com",
  twitter: "#",
  tiktok: "#",
  youtube: "#",
  websiteUrl: "https://yourwebsite.com",
  address: "Your Address Here",
  mapsUrl: "https://maps.google.com",
  
  referBtnUrl: "#refer",
  referBtnIcon: "fas fa-gift",
  referBtnLabel: "Refer a Friend",
  reviewBtnUrl: "#review",
  reviewBtnIcon: "fas fa-star",
  reviewBtnLabel: "Leave Review",
  
  reserveBtnLabel: "Book Now",
  reserveBtnUrl: "#book",
  saveContactBtnLabel: "Save Contact",
  websiteBtnLabel: "Website",
  shareBtnLabel: "Share",
  callBtnLabel: "Call",
  emailBtnLabel: "Email",
  textBtnLabel: "Text",
  whatsappBtnLabel: "WhatsApp",
  directionsBtnLabel: "Directions",
  deliveryBtnLabel: "Delivery",
  bookBtnLabel: "Book Now",
  bookBtnUrl: "#book",
  quoteBtnLabel: "Get Quote",
  quoteBtnUrl: "#quote",
  scheduleBtnUrl: "#schedule",
  
  ctaButtonText: "Contact Me",
  ctaButtonUrl: "#contact",
  ctaBtnUrl: "#contact",
  ctaBtnIcon: "fas fa-calendar-check",
  ctaBtnLabel: "Get Started Today",
  deliveryUrl: "",
  reservationUrl: "",
  
  viewMenuBtnUrl: "",
  fullMenuBtnUrl: "",
  fullMenuBtnLabel: "View All",
  
  sectionTitle: "Services",
  menuSectionTitle: "Our Services",
  hoursSectionTitle: "Hours",
  servicesSectionTitle: "Services",
  experienceSectionTitle: "About Us",
  experienceText: "Dedicated to providing exceptional service and results.",
  experienceCtaBtnUrl: "#contact",
  experienceCtaBtnIcon: "fas fa-calendar-check",
  experienceCtaBtnLabel: "Get Started Today",
  testimonialsSectionTitle: "Testimonials",
  testimonialsTitle: "Testimonials",
  leaveReviewUrl: "#review",
  leaveReviewBtnLabel: "Leave a Review",
  testimonialsVideoUrl: "https://youtube.com/watch?v=example",
  gallerySectionTitle: "Gallery",
  galleryTitle: "Gallery",
  shareInfoBtnLabel: "Share My Info",
  getCardUrl: "#",
  getCardBtnLabel: "Get Your Card",
  
  hours1Day: "Monday - Friday",
  hours1Time: "9:00 AM - 5:00 PM",
  hours1Status: "open",
  hours2Day: "Saturday",
  hours2Time: "10:00 AM - 2:00 PM",
  hours2Status: "open",
  hours3Day: "Sunday",
  hours3Time: "Closed",
  hours3Status: "closed",
  hours4Day: "",
  hours4Time: "",
  hours4Status: "",
  hours5Day: "",
  hours5Time: "",
  hours5Status: "",
  
  menuItem1Image: "",
  menuItem1Name: "Service 1",
  menuItem1Desc: "Description of your first service",
  menuItem1Price: "$99",
  menuItem2Image: "",
  menuItem2Name: "Service 2",
  menuItem2Desc: "Description of your second service",
  menuItem2Price: "$149",
  menuItem3Image: "",
  menuItem3Name: "Service 3",
  menuItem3Desc: "Description of your third service",
  menuItem3Price: "$199",
  
  videoUrl: "https://youtube.com/watch?v=example",
  
  cert1Icon: "fas fa-certificate",
  cert1Line1: "Certified",
  cert1Line2: "Professional",
  cert2Icon: "fas fa-id-card",
  cert2Line1: "Licensed",
  cert2Line2: "State Approved",
  cert3Icon: "fas fa-shield-check",
  cert3Line1: "Insured",
  cert3Line2: "Full Coverage",
  
  testimonial1Text: "Great service! Highly recommend.",
  testimonial1Author: "John D.",
  testimonial1Source: "Google",
  testimonial2Text: "Professional and reliable.",
  testimonial2Author: "Sarah M.",
  testimonial2Source: "Yelp",
  testimonial3Text: "Exceeded my expectations!",
  testimonial3Author: "Mike R.",
  testimonial3Source: "Facebook",
  testimonial4Text: "Will definitely use again.",
  testimonial4Author: "Emily L.",
  testimonial4Source: "Google",
  
  gallery1Image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
  gallery2Image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400",
  gallery3Image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400",
  gallery4Image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
  gallery5Image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400",
  gallery6Image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
  gallery7Image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400",
  gallery8Image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
  gallery9Image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
  gallery10Image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400",
  gallery11Image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400",
  gallery12Image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400",
  
  service1Name: "Service 1",
  service2Name: "Service 2",
  service3Name: "Service 3",
  service4Name: "Service 4",
  service5Name: "Service 5",
  service6Name: "Service 6",
  service7Name: "",
  service8Name: "",
  service9Name: "",
  
  buyerCategoryTitle: "",
  buyerService1Name: "",
  buyerService2Name: "",
  buyerService3Name: "",
  buyerService4Name: "",
  buyerService5Name: "",
  buyerService6Name: "",
  sellerCategoryTitle: "",
  sellerService1Name: "",
  sellerService2Name: "",
  sellerService3Name: "",
  sellerService4Name: "",
  sellerService5Name: "",
  sellerService6Name: "",
  stat1Value: "",
  stat1Label: "",
  stat2Value: "",
  stat2Label: "",
  stat3Value: "",
  stat3Label: "",
  feature1Icon: "",
  feature1Text: "",
  feature2Icon: "",
  feature2Text: "",
  feature3Icon: "",
  feature3Text: "",
  feature4Icon: "",
  feature4Text: "",
  listing1Image: "",
  listing1Price: "",
  listing2Image: "",
  listing2Price: "",
  listing3Image: "",
  listing3Price: "",
  listing4Image: "",
  listing4Price: "",
  
  footerTagline: "Your tagline here",
  footerAddress: "Your address here",
  footerBadge: "Verified Professional",
  footerBadgeIcon: "fas fa-check-circle",
  footerBadgeTitle: "Verified Business",
  footerBadgeSubtitle: "Trusted Professional",
  
  menuItems: [
    { name: "Service 1", description: "Description of your first service", price: "$99", image: "" },
    { name: "Service 2", description: "Description of your second service", price: "$149", image: "" },
    { name: "Service 3", description: "Description of your third service", price: "$199", image: "" }
  ],
  scheduleItems: [
    { day: "Monday - Friday", hours: "9:00 AM - 5:00 PM", status: "open" },
    { day: "Saturday", hours: "10:00 AM - 2:00 PM", status: "open" },
    { day: "Sunday", hours: "Closed", status: "closed" }
  ],
  testimonials: [
    { text: "Great service! Highly recommend.", author: "John D.", source: "Google", rating: 5 },
    { text: "Professional and reliable.", author: "Sarah M.", source: "Yelp", rating: 5 },
    { text: "Exceeded my expectations!", author: "Mike R.", source: "Facebook", rating: 5 },
    { text: "Will definitely use again.", author: "Emily L.", source: "Google", rating: 5 }
  ],
  galleryImages: [
    { image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=600" },
    { image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600" },
    { image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=600" },
    { image: "https://images.unsplash.com/photo-1557682260-96773eb01377?w=600" }
  ],
  certificates: [
    { name: "Certified", subtitle: "Professional", icon: "fa-certificate" },
    { name: "Licensed", subtitle: "State Approved", icon: "fa-id-card" },
    { name: "Insured", subtitle: "Full Coverage", icon: "fa-shield-check" }
  ]
};

// Sector defaults map
export const SECTOR_DEFAULTS: Record<TemplateSector, TemplateDefaults> = {
  restaurant: restaurantDefaults,
  "real-estate": realEstateDefaults,
  construction: constructionDefaults,
  cleaning: cleaningDefaults,
  general: generalDefaults,
};

/**
 * Get defaults for a specific sector
 */
export function getSectorDefaults(sector: TemplateSector | string | null): TemplateDefaults {
  if (!sector) return generalDefaults;
  return SECTOR_DEFAULTS[sector as TemplateSector] || generalDefaults;
}

/**
 * Get a specific field value with fallback to sector default
 */
export function getFieldWithDefault<K extends keyof TemplateDefaults>(
  field: K,
  userValue: string | undefined | null,
  sector: TemplateSector | string | null
): TemplateDefaults[K] {
  const defaults = getSectorDefaults(sector);
  if (userValue && userValue.trim() !== "") {
    return userValue as TemplateDefaults[K];
  }
  return defaults[field];
}

/**
 * Get defaults by sector alias (for backwards compatibility)
 */
export function getDefaultsBySector(sector: string): TemplateDefaults {
  switch (sector) {
    case "restaurant": return restaurantDefaults;
    case "realtor":
    case "real-estate": return realEstateDefaults;
    case "construction": return constructionDefaults;
    case "alldry":
    case "cleaning": return cleaningDefaults;
    case "general":
    default: return generalDefaults;
  }
}
