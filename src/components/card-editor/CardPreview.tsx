import { useState, useMemo } from "react";
import DOMPurify from "dompurify";
import { Template } from "@/hooks/useTemplates";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Layout } from "lucide-react";
import { getSectorDefaults, TemplateDefaults, getDefaultsBySector } from "@/config/templateDefaults";

// Sanitize user input to prevent XSS attacks
const sanitizeValue = (value: string): string => {
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br', 'span'],
    ALLOWED_ATTR: ['class', 'style']
  });
};

export interface ServiceItem {
  icon: string;
  name: string;
}

export interface CardData {
  // ===== PROFILE =====
  profile: {
    fullName: string;
    title: string;
    company: string;
    profileImage?: string;
  };
  
  // ===== SLUG (public URL) =====
  slug?: string;
  
  // ===== CONTACT =====
  contact: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
  
  // ===== SOCIAL =====
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };
  
  // ===== CONTENT =====
  bio?: string;
  videoUrl?: string;
  
  // ===== ARRAYS =====
  testimonials: Array<{
    name: string;
    content: string;
    rating: number;
    videoUrl?: string;
  }>;
  certificates: Array<{
    name: string;
    imageUrl?: string;
    licenseNumber?: string;
  }>;
  gallery: Array<{
    imageUrl: string;
    caption?: string;
    price?: string; // For realtor listings
  }>;
  
  // ===== CTA =====
  cta?: {
    text: string;
    url: string;
  };
  bookingUrl?: string;
  bookingType?: "popup" | "external";
  websiteUrl?: string;
  reviewUrl?: string;
  
  // ===== BACKGROUND & IMAGES =====
  backgroundImage?: string;
  bgImage1?: string;
  bgImage2?: string;
  bgImage3?: string;
  bgImage4?: string;
  
  // ===== SECTION TITLES =====
  sectionTitle?: string;
  menuSectionTitle?: string;
  hoursSectionTitle?: string;
  servicesSectionTitle?: string;
  experienceSectionTitle?: string;
  experienceText?: string;
  testimonialsSectionTitle?: string;
  gallerySectionTitle?: string;
  
  // ===== SERVICES/MENU =====
  services?: ServiceItem[];
  ctaButtonText?: string;
  
  // ===== TOP BUTTONS (Refer/Review) =====
  referBtnUrl?: string;
  referBtnIcon?: string;
  referBtnLabel?: string;
  reviewBtnUrl?: string;
  reviewBtnIcon?: string;
  reviewBtnLabel?: string;
  
  // ===== MAIN BUTTON LABELS =====
  reserveBtnLabel?: string;
  reserveBtnUrl?: string;
  saveContactBtnLabel?: string;
  bookBtnLabel?: string;
  bookBtnUrl?: string;
  quoteBtnLabel?: string;
  quoteBtnUrl?: string;
  
  // ===== BOTTOM BUTTONS =====
  websiteBtnLabel?: string;
  shareBtnLabel?: string;
  shareInfoBtnLabel?: string;
  getCardUrl?: string;
  getCardBtnLabel?: string;
  
  // ===== EXPERIENCE/CTA BUTTONS =====
  experienceCtaBtnUrl?: string;
  experienceCtaBtnIcon?: string;
  experienceCtaBtnLabel?: string;
  ctaBtnUrl?: string;
  ctaBtnIcon?: string;
  ctaBtnLabel?: string;
  leaveReviewUrl?: string;
  leaveReviewBtnLabel?: string;
  
  // ===== CERTIFICATIONS (individual) =====
  cert1Icon?: string;
  cert1Line1?: string;
  cert1Line2?: string;
  cert2Icon?: string;
  cert2Line1?: string;
  cert2Line2?: string;
  cert3Icon?: string;
  cert3Line1?: string;
  cert3Line2?: string;
  
  // ===== HOURS (individual) =====
  hours1Day?: string;
  hours1Time?: string;
  hours1Status?: string;
  hours2Day?: string;
  hours2Time?: string;
  hours2Status?: string;
  hours3Day?: string;
  hours3Time?: string;
  hours3Status?: string;
  hours4Day?: string;
  hours4Time?: string;
  hours4Status?: string;
  hours5Day?: string;
  hours5Time?: string;
  hours5Status?: string;
  
  // ===== MENU ITEMS (individual) =====
  menuItem1Image?: string;
  menuItem1Name?: string;
  menuItem1Desc?: string;
  menuItem1Price?: string;
  menuItem2Image?: string;
  menuItem2Name?: string;
  menuItem2Desc?: string;
  menuItem2Price?: string;
  menuItem3Image?: string;
  menuItem3Name?: string;
  menuItem3Desc?: string;
  menuItem3Price?: string;
  
  // ===== GALLERY (individual - for direct placeholders) =====
  gallery1Image?: string;
  gallery2Image?: string;
  gallery3Image?: string;
  gallery4Image?: string;
  gallery5Image?: string;
  gallery6Image?: string;
  gallery7Image?: string;
  gallery8Image?: string;
  gallery9Image?: string;
  gallery10Image?: string;
  gallery11Image?: string;
  gallery12Image?: string;
  
  // ===== TESTIMONIALS (individual) =====
  testimonial1Text?: string;
  testimonial1Author?: string;
  testimonial1Source?: string;
  testimonial2Text?: string;
  testimonial2Author?: string;
  testimonial2Source?: string;
  testimonial3Text?: string;
  testimonial3Author?: string;
  testimonial3Source?: string;
  testimonial4Text?: string;
  testimonial4Author?: string;
  testimonial4Source?: string;
  
  // ===== REALTOR-SPECIFIC =====
  listing1Image?: string;
  listing1Price?: string;
  listing2Image?: string;
  listing2Price?: string;
  listing3Image?: string;
  listing3Price?: string;
  listing4Image?: string;
  listing4Price?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  
  // ===== FOOTER =====
  footerTagline?: string;
  footerAddress?: string;
  footerBadge?: string;
  
  // Dynamic index signature for flexibility
  [key: string]: unknown;
}

export interface CustomStyles {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
}

interface CardPreviewProps {
  template: Template | null;
  cardData: CardData;
  customStyles: CustomStyles;
  isPro?: boolean;
}

const DEFAULT_CARD_DATA: CardData = {
  profile: {
    fullName: "Tu Nombre",
    title: "Tu Título",
    company: "Tu Empresa",
  },
  contact: {
    phone: "+1 234 567 890",
    whatsapp: "+1 234 567 890",
    email: "tu@email.com",
  },
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  bio: "Tu biografía profesional aparecerá aquí...",
  testimonials: [],
  certificates: [],
  gallery: [],
};

/**
 * Process template HTML and replace ALL {{placeholders}} with values
 * Uses a comprehensive approach: iterate over ALL keys in defaults and replace them
 */
function processTemplate(
  htmlContent: string, 
  cardData: CardData, 
  defaults: TemplateDefaults,
  isPro: boolean
): string {
  let html = htmlContent;
  
  // Helper to get user value or default
  const getValue = (key: keyof TemplateDefaults, userValue?: string | null): string => {
    if (userValue && userValue.trim() !== "") return userValue;
    const defaultVal = defaults[key];
    return typeof defaultVal === "string" ? defaultVal : "";
  };

  // Build booking onclick handler
  const bookingOnClick = cardData.bookingType === "popup" && cardData.bookingUrl
    ? `openBookingModal('${cardData.bookingUrl || defaults.reservationUrl}')`
    : `window.open('${cardData.bookingUrl || defaults.reservationUrl || "#"}', '_blank')`;

  // ===== ALL STRING REPLACEMENTS =====
  // Create a comprehensive map of ALL possible placeholders to their values
  const replacements: Record<string, string> = {
    // Profile
    "fullName": getValue("fullName", cardData.profile.fullName),
    "TITLE": getValue("title", cardData.profile.title),
    "title": getValue("title", cardData.profile.title),
    "company": getValue("company", cardData.profile.company),
    "bio": getValue("bio", cardData.bio),
    "profileImage": getValue("profileImage", cardData.profile.profileImage),
    "backgroundImage": getValue("backgroundImage", cardData.backgroundImage),
    "bgImage1": defaults.bgImage1,
    "bgImage2": defaults.bgImage2,
    "bgImage3": defaults.bgImage3,
    "bgImage4": defaults.bgImage4,
    
    // Badges (user can override)
    "cuisineBadge": (cardData.cuisineBadge as string) || defaults.cuisineBadge,
    "specialtyBadge": (cardData.specialtyBadge as string) || defaults.specialtyBadge,
    "languagesBadge": (cardData.languagesBadge as string) || defaults.languagesBadge,
    
    // Contact
    "phone": getValue("phone", cardData.contact.phone),
    "whatsapp": getValue("whatsapp", cardData.contact.whatsapp),
    "email": getValue("email", cardData.contact.email),
    "address": defaults.address,
    "mapsUrl": defaults.mapsUrl,
    
    // Social links
    "facebook": cardData.social.facebook || defaults.facebook,
    "instagram": cardData.social.instagram || defaults.instagram,
    "linkedin": cardData.social.linkedin || defaults.linkedin,
    "twitter": cardData.social.twitter || defaults.twitter,
    "tiktok": cardData.social.tiktok || defaults.tiktok,
    "youtube": cardData.social.youtube || defaults.youtube,
    "websiteUrl": cardData.websiteUrl || defaults.websiteUrl,
    
    // Top Buttons (Refer/Review) - User values override defaults
    "referBtnUrl": (cardData.referBtnUrl as string) || defaults.referBtnUrl,
    "referBtnIcon": (cardData.referBtnIcon as string) || defaults.referBtnIcon,
    "referBtnLabel": (cardData.referBtnLabel as string) || defaults.referBtnLabel,
    "reviewBtnUrl": (cardData.reviewBtnUrl as string) || cardData.reviewUrl || defaults.reviewBtnUrl,
    "reviewBtnIcon": (cardData.reviewBtnIcon as string) || defaults.reviewBtnIcon,
    "reviewBtnLabel": (cardData.reviewBtnLabel as string) || defaults.reviewBtnLabel,
    "reviewUrl": cardData.reviewUrl || defaults.reviewBtnUrl,
    "referUrl": (cardData.referBtnUrl as string) || defaults.referBtnUrl,
    
    // Main Buttons - User values override defaults
    "reserveBtnLabel": (cardData.reserveBtnLabel as string) || defaults.reserveBtnLabel,
    "reserveBtnUrl": (cardData.reserveBtnUrl as string) || defaults.reserveBtnUrl,
    "saveContactBtnLabel": (cardData.saveContactBtnLabel as string) || defaults.saveContactBtnLabel,
    "websiteBtnLabel": (cardData.websiteBtnLabel as string) || defaults.websiteBtnLabel,
    "shareBtnLabel": (cardData.shareBtnLabel as string) || defaults.shareBtnLabel,
    "callBtnLabel": (cardData.callBtnLabel as string) || defaults.callBtnLabel,
    "emailBtnLabel": (cardData.emailBtnLabel as string) || defaults.emailBtnLabel,
    "textBtnLabel": (cardData.textBtnLabel as string) || defaults.textBtnLabel,
    "whatsappBtnLabel": (cardData.whatsappBtnLabel as string) || defaults.whatsappBtnLabel,
    "directionsBtnLabel": (cardData.directionsBtnLabel as string) || defaults.directionsBtnLabel,
    "deliveryBtnLabel": (cardData.deliveryBtnLabel as string) || defaults.deliveryBtnLabel,
    "bookBtnLabel": (cardData.bookBtnLabel as string) || defaults.bookBtnLabel,
    "bookBtnUrl": (cardData.bookBtnUrl as string) || cardData.bookingUrl || defaults.bookBtnUrl,
    "quoteBtnLabel": (cardData.quoteBtnLabel as string) || defaults.quoteBtnLabel,
    "quoteBtnUrl": (cardData.quoteBtnUrl as string) || defaults.quoteBtnUrl,
    "scheduleBtnUrl": (cardData.scheduleBtnUrl as string) || defaults.scheduleBtnUrl,
    
    // CTA Buttons - User values override defaults
    "ctaButtonText": getValue("ctaButtonText", cardData.ctaButtonText),
    "ctaButtonUrl": cardData.cta?.url || defaults.ctaButtonUrl,
    "ctaUrl": cardData.cta?.url || defaults.ctaButtonUrl,
    "ctaText": cardData.cta?.text || defaults.ctaButtonText,
    "ctaBtnUrl": (cardData.ctaBtnUrl as string) || defaults.ctaBtnUrl,
    "ctaBtnIcon": (cardData.ctaBtnIcon as string) || defaults.ctaBtnIcon,
    "ctaBtnLabel": (cardData.ctaBtnLabel as string) || defaults.ctaBtnLabel,
    "bookingUrl": cardData.bookingUrl || defaults.reservationUrl,
    "bookingOnClick": bookingOnClick,
    "deliveryUrl": defaults.deliveryUrl,
    "reservationUrl": cardData.bookingUrl || defaults.reservationUrl,
    
    // View Menu Button - User values override defaults
    "viewMenuBtnUrl": (cardData.viewMenuBtnUrl as string) || defaults.viewMenuBtnUrl,
    "fullMenuBtnUrl": (cardData.fullMenuBtnUrl as string) || defaults.fullMenuBtnUrl,
    "fullMenuBtnLabel": (cardData.fullMenuBtnLabel as string) || defaults.fullMenuBtnLabel,
    
    // Section titles - User values override defaults
    "sectionTitle": getValue("sectionTitle", cardData.sectionTitle),
    "menuSectionTitle": (cardData.menuSectionTitle as string) || defaults.menuSectionTitle,
    "hoursSectionTitle": (cardData.hoursSectionTitle as string) || defaults.hoursSectionTitle,
    "servicesSectionTitle": (cardData.servicesSectionTitle as string) || defaults.servicesSectionTitle,
    "experienceSectionTitle": (cardData.experienceSectionTitle as string) || defaults.experienceSectionTitle,
    "experienceText": (cardData.experienceText as string) || defaults.experienceText,
    "experienceCtaBtnUrl": (cardData.experienceCtaBtnUrl as string) || defaults.experienceCtaBtnUrl,
    "experienceCtaBtnIcon": (cardData.experienceCtaBtnIcon as string) || defaults.experienceCtaBtnIcon,
    "experienceCtaBtnLabel": (cardData.experienceCtaBtnLabel as string) || defaults.experienceCtaBtnLabel,
    "testimonialsTitle": defaults.testimonialsTitle,
    "testimonialsSectionTitle": (cardData.testimonialsSectionTitle as string) || defaults.testimonialsSectionTitle,
    "leaveReviewUrl": (cardData.leaveReviewUrl as string) || defaults.leaveReviewUrl,
    "leaveReviewBtnLabel": (cardData.leaveReviewBtnLabel as string) || defaults.leaveReviewBtnLabel,
    "galleryTitle": defaults.galleryTitle,
    "gallerySectionTitle": (cardData.gallerySectionTitle as string) || defaults.gallerySectionTitle,
    "shareInfoBtnLabel": (cardData.shareInfoBtnLabel as string) || defaults.shareInfoBtnLabel,
    "getCardUrl": (cardData.getCardUrl as string) || defaults.getCardUrl,
    "getCardBtnLabel": (cardData.getCardBtnLabel as string) || defaults.getCardBtnLabel,
    
    // Hours (individual)
    "hours1Day": defaults.hours1Day,
    "hours1Time": defaults.hours1Time,
    "hours1Status": defaults.hours1Status,
    "hours2Day": defaults.hours2Day,
    "hours2Time": defaults.hours2Time,
    "hours2Status": defaults.hours2Status,
    "hours3Day": defaults.hours3Day,
    "hours3Time": defaults.hours3Time,
    "hours3Status": defaults.hours3Status,
    "hours4Day": defaults.hours4Day,
    "hours4Time": defaults.hours4Time,
    "hours4Status": defaults.hours4Status,
    "hours5Day": defaults.hours5Day,
    "hours5Time": defaults.hours5Time,
    "hours5Status": defaults.hours5Status,
    
    // Menu Items (individual)
    "menuItem1Image": defaults.menuItem1Image,
    "menuItem1Name": defaults.menuItem1Name,
    "menuItem1Desc": defaults.menuItem1Desc,
    "menuItem1Price": defaults.menuItem1Price,
    "menuItem2Image": defaults.menuItem2Image,
    "menuItem2Name": defaults.menuItem2Name,
    "menuItem2Desc": defaults.menuItem2Desc,
    "menuItem2Price": defaults.menuItem2Price,
    "menuItem3Image": defaults.menuItem3Image,
    "menuItem3Name": defaults.menuItem3Name,
    "menuItem3Desc": defaults.menuItem3Desc,
    "menuItem3Price": defaults.menuItem3Price,
    
    // Video
    "videoUrl": cardData.videoUrl || defaults.videoUrl,
    "testimonialsVideoUrl": defaults.testimonialsVideoUrl,
    
    // Certifications (individual)
    "cert1Icon": defaults.cert1Icon,
    "cert1Line1": defaults.cert1Line1,
    "cert1Line2": defaults.cert1Line2,
    "cert2Icon": defaults.cert2Icon,
    "cert2Line1": defaults.cert2Line1,
    "cert2Line2": defaults.cert2Line2,
    "cert3Icon": defaults.cert3Icon,
    "cert3Line1": defaults.cert3Line1,
    "cert3Line2": defaults.cert3Line2,
    
    // Testimonials (individual)
    "testimonial1Text": defaults.testimonial1Text,
    "testimonial1Author": defaults.testimonial1Author,
    "testimonial1Source": defaults.testimonial1Source,
    "testimonial2Text": defaults.testimonial2Text,
    "testimonial2Author": defaults.testimonial2Author,
    "testimonial2Source": defaults.testimonial2Source,
    "testimonial3Text": defaults.testimonial3Text,
    "testimonial3Author": defaults.testimonial3Author,
    "testimonial3Source": defaults.testimonial3Source,
    "testimonial4Text": defaults.testimonial4Text,
    "testimonial4Author": defaults.testimonial4Author,
    "testimonial4Source": defaults.testimonial4Source,
    
    // Gallery (individual)
    "gallery1Image": defaults.gallery1Image,
    "gallery2Image": defaults.gallery2Image,
    "gallery3Image": defaults.gallery3Image,
    "gallery4Image": defaults.gallery4Image,
    "gallery5Image": defaults.gallery5Image,
    "gallery6Image": defaults.gallery6Image,
    "gallery7Image": defaults.gallery7Image,
    "gallery8Image": defaults.gallery8Image,
    "gallery9Image": defaults.gallery9Image,
    "gallery10Image": defaults.gallery10Image,
    "gallery11Image": defaults.gallery11Image,
    "gallery12Image": defaults.gallery12Image,
    
    // Services (individual)
    "service1Name": defaults.service1Name,
    "service2Name": defaults.service2Name,
    "service3Name": defaults.service3Name,
    "service4Name": defaults.service4Name,
    "service5Name": defaults.service5Name,
    "service6Name": defaults.service6Name,
    "service7Name": defaults.service7Name,
    "service8Name": defaults.service8Name,
    "service9Name": defaults.service9Name,
    
    // Realtor-specific
    "buyerCategoryTitle": defaults.buyerCategoryTitle,
    "buyerService1Name": defaults.buyerService1Name,
    "buyerService2Name": defaults.buyerService2Name,
    "buyerService3Name": defaults.buyerService3Name,
    "buyerService4Name": defaults.buyerService4Name,
    "buyerService5Name": defaults.buyerService5Name,
    "buyerService6Name": defaults.buyerService6Name,
    "sellerCategoryTitle": defaults.sellerCategoryTitle,
    "sellerService1Name": defaults.sellerService1Name,
    "sellerService2Name": defaults.sellerService2Name,
    "sellerService3Name": defaults.sellerService3Name,
    "sellerService4Name": defaults.sellerService4Name,
    "sellerService5Name": defaults.sellerService5Name,
    "sellerService6Name": defaults.sellerService6Name,
    "stat1Value": defaults.stat1Value,
    "stat1Label": defaults.stat1Label,
    "stat2Value": defaults.stat2Value,
    "stat2Label": defaults.stat2Label,
    "stat3Value": defaults.stat3Value,
    "stat3Label": defaults.stat3Label,
    "feature1Icon": defaults.feature1Icon,
    "feature1Text": defaults.feature1Text,
    "feature2Icon": defaults.feature2Icon,
    "feature2Text": defaults.feature2Text,
    "feature3Icon": defaults.feature3Icon,
    "feature3Text": defaults.feature3Text,
    "feature4Icon": defaults.feature4Icon,
    "feature4Text": defaults.feature4Text,
    "listing1Image": defaults.listing1Image,
    "listing1Price": defaults.listing1Price,
    "listing2Image": defaults.listing2Image,
    "listing2Price": defaults.listing2Price,
    "listing3Image": defaults.listing3Image,
    "listing3Price": defaults.listing3Price,
    "listing4Image": defaults.listing4Image,
    "listing4Price": defaults.listing4Price,
    
    // Footer
    "footerTagline": defaults.footerTagline,
    "footerAddress": defaults.footerAddress,
    "footerBadge": defaults.footerBadge,
    "footerBadgeIcon": defaults.footerBadgeIcon,
    "footerBadgeTitle": defaults.footerBadgeTitle,
    "footerBadgeSubtitle": defaults.footerBadgeSubtitle,
  };

  // ===== GENERATE DYNAMIC HTML SECTIONS =====
  
  // Services/Menu HTML
  const menuItems = (cardData.services && cardData.services.length > 0) 
    ? cardData.services.map(s => ({ name: s.name, description: "", price: "", icon: s.icon }))
    : defaults.menuItems;
  
  const servicesHTML = menuItems.map(item => `
    <div class="service-card">
      <i class="fas ${(item as { icon?: string }).icon || 'fa-check'}"></i>
      <span>${item.name}</span>
    </div>
  `).join('');

  const menuItemsHTML = menuItems.map(item => `
    <div class="menu-item">
      ${item.image ? `<img src="${item.image}" alt="${item.name}" class="menu-item-image">` : ''}
      <div class="menu-item-content">
        <h4 class="menu-item-name">${item.name}</h4>
        ${item.description ? `<p class="menu-item-description">${item.description}</p>` : ''}
      </div>
      ${item.price ? `<span class="menu-item-price">${item.price}</span>` : ''}
    </div>
  `).join('');

  // Testimonials HTML
  const testimonials = (cardData.testimonials && cardData.testimonials.length > 0)
    ? cardData.testimonials
    : defaults.testimonials;
  
  const testimonialsHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.rating || 5)}${'☆'.repeat(5 - (t.rating || 5))}</div>
      <div class="testimonial-text">"${(t as { content?: string; text?: string }).content || (t as { text?: string }).text || ''}"</div>
      <div class="testimonial-author">— ${(t as { name?: string; author?: string }).name || (t as { author?: string }).author || ''}</div>
      ${(t as { source?: string }).source ? `<div class="testimonial-source">${(t as { source?: string }).source}</div>` : ''}
    </div>
  `).join('');

  const testimonialsTrackHTML = testimonialsHTML + testimonialsHTML;

  // Gallery HTML
  const galleryImages = (cardData.gallery && cardData.gallery.length > 0)
    ? cardData.gallery
    : defaults.galleryImages;
  
  const galleryHTML = galleryImages.map(img => `
    <div class="gallery-item">
      <img src="${(img as { imageUrl?: string; image?: string }).imageUrl || (img as { image?: string }).image || ''}" alt="${(img as { caption?: string }).caption || 'Gallery image'}">
    </div>
  `).join('');

  // Certificates HTML
  const certificates = (cardData.certificates && cardData.certificates.length > 0)
    ? cardData.certificates
    : defaults.certificates;
  
  const certificatesHTML = certificates.map(cert => `
    <div class="cert-badge">
      <i class="fas ${(cert as { icon?: string }).icon || 'fa-certificate'}" style="color: #D97706;"></i>
      <div>
        ${(cert as { name?: string }).name || ''}
        ${(cert as { licenseNumber?: string; subtitle?: string }).licenseNumber || (cert as { subtitle?: string }).subtitle 
          ? `<br><small>${(cert as { licenseNumber?: string }).licenseNumber || (cert as { subtitle?: string }).subtitle}</small>` 
          : ''}
      </div>
    </div>
  `).join('');

  // Schedule HTML
  const scheduleHTML = defaults.scheduleItems.map(s => `
    <div class="schedule-row ${s.status}">
      <span class="schedule-day">${s.day}</span>
      <span class="schedule-hours">${s.hours}</span>
    </div>
  `).join('');

  // Add dynamic HTML sections to replacements
  replacements["servicesHTML"] = servicesHTML;
  replacements["menuItemsHTML"] = menuItemsHTML;
  replacements["testimonialsHTML"] = testimonialsTrackHTML;
  replacements["galleryHTML"] = galleryHTML;
  replacements["certificatesHTML"] = certificatesHTML;
  replacements["scheduleHTML"] = scheduleHTML;

  // ===== PERFORM ALL REPLACEMENTS =====
  // Replace all {{placeholder}} patterns with sanitized values
  Object.entries(replacements).forEach(([key, value]) => {
    // Replace {{key}} pattern with sanitized value to prevent XSS
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    const sanitized = sanitizeValue(value || "");
    html = html.replace(regex, sanitized);
  });

  // ===== HIDE REFER US FOR NON-PRO =====
  if (!isPro) {
    html = html.replace(
      /<button[^>]*class="[^"]*refer-btn[^"]*"[^>]*>[\s\S]*?<\/button>/gi,
      ''
    );
    // Also hide elements with refer-button class
    html = html.replace(
      /<[^>]*class="[^"]*refer-button[^"]*"[^>]*>[\s\S]*?<\/[^>]*>/gi,
      ''
    );
  }

  // ===== CLEAN UP ANY REMAINING PLACEHOLDERS =====
  // Remove any {{placeholder}} that wasn't replaced to prevent them showing in preview
  html = html.replace(/\{\{[a-zA-Z0-9_]+\}\}/g, "");

  return html;
}

export function CardPreview({ template, cardData, customStyles, isPro = false }: CardPreviewProps) {
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");
  
  const data = { ...DEFAULT_CARD_DATA, ...cardData };

  const previewKey = useMemo(() => {
    return JSON.stringify({
      templateId: template?.id ?? null,
      cardData,
      customStyles,
      isPro,
    });
  }, [template?.id, cardData, customStyles, isPro]);

  const renderTemplate = () => {
    if (!template) return null;
    
    // Get sector defaults
    const defaults = getSectorDefaults(template.sector);
    
    // Process template with comprehensive placeholder replacement
    let html = processTemplate(template.html_content, data, defaults, isPro);

    // CSS Variables injection (ONLY colors, no !important)
    const accentColor = customStyles.primaryColor || defaults.accentColor;
    const colorOverrides = `
      <style>
        :root {
          --accent: ${accentColor};
          --accent-hover: ${customStyles.secondaryColor || defaults.accentColorHover};
          --accent-light: ${defaults.accentColorLight};
        }
      </style>
    `;

    // Booking modal (functionality only)
    const bookingModal = `
      <style>
        .booking-modal-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          z-index: 9999;
          align-items: center;
          justify-content: center;
        }
        .booking-modal-overlay.active {
          display: flex;
        }
        .booking-modal-content {
          background: #fff;
          border-radius: 16px;
          width: 90%;
          max-width: 500px;
          height: 80vh;
          max-height: 700px;
          overflow: hidden;
          position: relative;
        }
        .booking-modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.7);
          color: #fff;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          z-index: 10;
        }
        .booking-modal-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      </style>
      <div class="booking-modal-overlay" id="bookingModal">
        <div class="booking-modal-content">
          <button class="booking-modal-close" onclick="closeBookingModal()">×</button>
          <iframe class="booking-modal-iframe" id="bookingIframe" src=""></iframe>
        </div>
      </div>
      <script>
        function openBookingModal(url) {
          document.getElementById('bookingIframe').src = url;
          document.getElementById('bookingModal').classList.add('active');
        }
        function closeBookingModal() {
          document.getElementById('bookingModal').classList.remove('active');
          document.getElementById('bookingIframe').src = '';
        }
        document.getElementById('bookingModal')?.addEventListener('click', function(e) {
          if (e.target === this) closeBookingModal();
        });
      </script>
    `;

    // Inject color overrides after <head> and booking modal before </body>
    html = html.replace('<head>', '<head>' + colorOverrides);
    html = html.replace('</body>', bookingModal + '</body>');

    return html;
  };

  const previewContent = useMemo(() => {
    return renderTemplate();
  }, [template, cardData, customStyles, isPro]);

  return (
    <div className="flex flex-col h-full">
      {/* View Mode Tabs */}
      <div className="p-4 border-b border-border bg-card/50">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "mobile" | "desktop")}>
          <TabsList className="grid w-full max-w-[200px] grid-cols-2">
            <TabsTrigger value="mobile" className="gap-2">
              <Smartphone className="w-4 h-4" />
              Mobile
            </TabsTrigger>
            <TabsTrigger value="desktop" className="gap-2">
              <Monitor className="w-4 h-4" />
              Web
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto bg-muted/20">
        {template ? (
          viewMode === "mobile" ? (
            /* Mobile Phone Frame */
            <div className="relative bg-[#1E1E1E] rounded-[40px] p-3 shadow-2xl border border-border/50 w-[375px] h-[750px] flex-shrink-0">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1E1E1E] rounded-b-2xl z-20 pointer-events-none" />

              {/* Screen */}
              <div className="bg-white rounded-[32px] overflow-hidden h-full">
                <iframe
                  key={previewKey}
                  srcDoc={previewContent || ""}
                  className="w-full h-full border-0"
                  title="Card Preview Mobile"
                  sandbox="allow-scripts"
                />
              </div>

              {/* Reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-[40px] pointer-events-none" />
            </div>
          ) : (
            /* Desktop Frame */
            <div className="bg-white rounded-lg shadow-lg border border-border overflow-hidden w-full h-full max-w-[1200px]">
              {/* Browser Bar */}
              <div className="h-10 bg-gray-100 border-b flex items-center px-3 gap-2 flex-shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-500 border">
                    tu-tarjeta.biztec.com
                  </div>
                </div>
              </div>
              <iframe
                key={previewKey}
                srcDoc={previewContent || ""}
                className="w-full border-0"
                style={{ height: 'calc(100% - 40px)' }}
                title="Card Preview Desktop"
                sandbox="allow-scripts"
              />
            </div>
          )
        ) : (
          /* No Template Selected */
          <div className="flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Layout className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Selecciona una plantilla
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Elige una plantilla del panel de la izquierda para ver cómo se verá tu tarjeta digital.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
