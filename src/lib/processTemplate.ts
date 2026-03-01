/**
 * Server-safe template processing utility.
 * Extracted from CardPreview.tsx so it can run both server-side and client-side.
 * No React, no DOMPurify -- all data comes from our own DB so sanitization is skipped.
 */

import {
  getSectorDefaults,
  type TemplateDefaults,
} from "@/config/templateDefaults";

// ─── Types (subset of CardData, kept lean for the public-card use case) ───────

export interface ProcessableCardData {
  profile: {
    fullName: string;
    title: string;
    company: string;
    profileImage?: string;
  };
  slug?: string;
  contact: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };
  bio?: string;
  videoUrl?: string;
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
    price?: string;
  }>;
  cta?: { text: string; url: string };
  bookingUrl?: string;
  bookingType?: "popup" | "external";
  websiteUrl?: string;
  reviewUrl?: string;
  backgroundImage?: string;
  sectionTitle?: string;
  services?: Array<{ icon: string; name: string }>;
  ctaButtonText?: string;
  // Dynamic index for anything stored in custom_data
  [key: string]: unknown;
}

// ─── Core processing function ─────────────────────────────────────────────────

/**
 * Replace ALL {{placeholders}} in the template HTML with actual values.
 * This is a pure function with no browser/React dependencies.
 */
export function processTemplate(
  htmlContent: string,
  cardData: ProcessableCardData,
  defaults: TemplateDefaults,
  isPro: boolean
): string {
  let html = htmlContent;

  // Helper to get user value or default
  const getValue = (
    key: keyof TemplateDefaults,
    userValue?: string | null
  ): string => {
    if (userValue && userValue.trim() !== "") return userValue;
    const defaultVal = defaults[key];
    return typeof defaultVal === "string" ? defaultVal : "";
  };

  // Build booking onclick handler
  const bookingOnClick =
    cardData.bookingType === "popup" && cardData.bookingUrl
      ? `openBookingModal('${cardData.bookingUrl || defaults.reservationUrl}')`
      : `window.open('${cardData.bookingUrl || defaults.reservationUrl || "#"}', '_blank')`;

  // ===== ALL STRING REPLACEMENTS =====
  const replacements: Record<string, string> = {
    // Profile
    fullName: getValue("fullName", cardData.profile.fullName),
    TITLE: getValue("title", cardData.profile.title),
    title: getValue("title", cardData.profile.title),
    company: getValue("company", cardData.profile.company),
    bio: getValue("bio", cardData.bio),
    profileImage: getValue("profileImage", cardData.profile.profileImage),
    backgroundImage: getValue("backgroundImage", cardData.backgroundImage),
    bgImage1: defaults.bgImage1,
    bgImage2: defaults.bgImage2,
    bgImage3: defaults.bgImage3,
    bgImage4: defaults.bgImage4,

    // Badges
    cuisineBadge:
      (cardData.cuisineBadge as string) || defaults.cuisineBadge,
    specialtyBadge:
      (cardData.specialtyBadge as string) || defaults.specialtyBadge,
    languagesBadge:
      (cardData.languagesBadge as string) || defaults.languagesBadge,

    // Contact
    phone: getValue("phone", cardData.contact.phone),
    whatsapp: getValue("whatsapp", cardData.contact.whatsapp),
    email: getValue("email", cardData.contact.email),
    address: defaults.address,
    mapsUrl: defaults.mapsUrl,

    // Social links
    facebook: cardData.social.facebook || defaults.facebook,
    instagram: cardData.social.instagram || defaults.instagram,
    linkedin: cardData.social.linkedin || defaults.linkedin,
    twitter: cardData.social.twitter || defaults.twitter,
    tiktok: cardData.social.tiktok || defaults.tiktok,
    youtube: cardData.social.youtube || defaults.youtube,
    websiteUrl: cardData.websiteUrl || defaults.websiteUrl,

    // Top Buttons (Refer/Review)
    referBtnUrl:
      (cardData.referBtnUrl as string) || defaults.referBtnUrl,
    referBtnIcon:
      (cardData.referBtnIcon as string) || defaults.referBtnIcon,
    referBtnLabel:
      (cardData.referBtnLabel as string) || defaults.referBtnLabel,
    reviewBtnUrl:
      (cardData.reviewBtnUrl as string) ||
      cardData.reviewUrl ||
      defaults.reviewBtnUrl,
    reviewBtnIcon:
      (cardData.reviewBtnIcon as string) || defaults.reviewBtnIcon,
    reviewBtnLabel:
      (cardData.reviewBtnLabel as string) || defaults.reviewBtnLabel,
    reviewUrl: (cardData.reviewUrl as string) || defaults.reviewBtnUrl,
    referUrl: (cardData.referBtnUrl as string) || defaults.referBtnUrl,

    // Main Buttons
    reserveBtnLabel:
      (cardData.reserveBtnLabel as string) || defaults.reserveBtnLabel,
    reserveBtnUrl:
      (cardData.reserveBtnUrl as string) || defaults.reserveBtnUrl,
    saveContactBtnLabel:
      (cardData.saveContactBtnLabel as string) ||
      defaults.saveContactBtnLabel,
    websiteBtnLabel:
      (cardData.websiteBtnLabel as string) || defaults.websiteBtnLabel,
    shareBtnLabel:
      (cardData.shareBtnLabel as string) || defaults.shareBtnLabel,
    callBtnLabel:
      (cardData.callBtnLabel as string) || defaults.callBtnLabel,
    emailBtnLabel:
      (cardData.emailBtnLabel as string) || defaults.emailBtnLabel,
    textBtnLabel:
      (cardData.textBtnLabel as string) || defaults.textBtnLabel,
    whatsappBtnLabel:
      (cardData.whatsappBtnLabel as string) || defaults.whatsappBtnLabel,
    directionsBtnLabel:
      (cardData.directionsBtnLabel as string) ||
      defaults.directionsBtnLabel,
    deliveryBtnLabel:
      (cardData.deliveryBtnLabel as string) || defaults.deliveryBtnLabel,
    bookBtnLabel:
      (cardData.bookBtnLabel as string) || defaults.bookBtnLabel,
    bookBtnUrl:
      (cardData.bookBtnUrl as string) ||
      cardData.bookingUrl ||
      defaults.bookBtnUrl,
    quoteBtnLabel:
      (cardData.quoteBtnLabel as string) || defaults.quoteBtnLabel,
    quoteBtnUrl:
      (cardData.quoteBtnUrl as string) || defaults.quoteBtnUrl,
    scheduleBtnUrl:
      (cardData.scheduleBtnUrl as string) || defaults.scheduleBtnUrl,

    // CTA Buttons
    ctaButtonText: getValue("ctaButtonText", cardData.ctaButtonText),
    ctaButtonUrl: cardData.cta?.url || defaults.ctaButtonUrl,
    ctaUrl: cardData.cta?.url || defaults.ctaButtonUrl,
    ctaText: cardData.cta?.text || defaults.ctaButtonText,
    ctaBtnUrl: (cardData.ctaBtnUrl as string) || defaults.ctaBtnUrl,
    ctaBtnIcon: (cardData.ctaBtnIcon as string) || defaults.ctaBtnIcon,
    ctaBtnLabel:
      (cardData.ctaBtnLabel as string) || defaults.ctaBtnLabel,
    bookingUrl: cardData.bookingUrl || defaults.reservationUrl,
    bookingOnClick: bookingOnClick,
    deliveryUrl: defaults.deliveryUrl,
    reservationUrl: cardData.bookingUrl || defaults.reservationUrl,

    // View Menu Button
    viewMenuBtnUrl:
      (cardData.viewMenuBtnUrl as string) || defaults.viewMenuBtnUrl,
    fullMenuBtnUrl:
      (cardData.fullMenuBtnUrl as string) || defaults.fullMenuBtnUrl,
    fullMenuBtnLabel:
      (cardData.fullMenuBtnLabel as string) || defaults.fullMenuBtnLabel,

    // Section titles
    sectionTitle: getValue("sectionTitle", cardData.sectionTitle),
    menuSectionTitle:
      (cardData.menuSectionTitle as string) || defaults.menuSectionTitle,
    hoursSectionTitle:
      (cardData.hoursSectionTitle as string) ||
      defaults.hoursSectionTitle,
    servicesSectionTitle:
      (cardData.servicesSectionTitle as string) ||
      defaults.servicesSectionTitle,
    experienceSectionTitle:
      (cardData.experienceSectionTitle as string) ||
      defaults.experienceSectionTitle,
    experienceText:
      (cardData.experienceText as string) || defaults.experienceText,
    experienceCtaBtnUrl:
      (cardData.experienceCtaBtnUrl as string) ||
      defaults.experienceCtaBtnUrl,
    experienceCtaBtnIcon:
      (cardData.experienceCtaBtnIcon as string) ||
      defaults.experienceCtaBtnIcon,
    experienceCtaBtnLabel:
      (cardData.experienceCtaBtnLabel as string) ||
      defaults.experienceCtaBtnLabel,
    testimonialsTitle: defaults.testimonialsTitle,
    testimonialsSectionTitle:
      (cardData.testimonialsSectionTitle as string) ||
      defaults.testimonialsSectionTitle,
    leaveReviewUrl:
      (cardData.leaveReviewUrl as string) || defaults.leaveReviewUrl,
    leaveReviewBtnLabel:
      (cardData.leaveReviewBtnLabel as string) ||
      defaults.leaveReviewBtnLabel,
    galleryTitle: defaults.galleryTitle,
    gallerySectionTitle:
      (cardData.gallerySectionTitle as string) ||
      defaults.gallerySectionTitle,
    shareInfoBtnLabel:
      (cardData.shareInfoBtnLabel as string) ||
      defaults.shareInfoBtnLabel,
    getCardUrl:
      (cardData.getCardUrl as string) || defaults.getCardUrl,
    getCardBtnLabel:
      (cardData.getCardBtnLabel as string) || defaults.getCardBtnLabel,

    // Hours (individual)
    hours1Day: defaults.hours1Day,
    hours1Time: defaults.hours1Time,
    hours1Status: defaults.hours1Status,
    hours2Day: defaults.hours2Day,
    hours2Time: defaults.hours2Time,
    hours2Status: defaults.hours2Status,
    hours3Day: defaults.hours3Day,
    hours3Time: defaults.hours3Time,
    hours3Status: defaults.hours3Status,
    hours4Day: defaults.hours4Day,
    hours4Time: defaults.hours4Time,
    hours4Status: defaults.hours4Status,
    hours5Day: defaults.hours5Day,
    hours5Time: defaults.hours5Time,
    hours5Status: defaults.hours5Status,

    // Menu Items (individual)
    menuItem1Image: defaults.menuItem1Image,
    menuItem1Name: defaults.menuItem1Name,
    menuItem1Desc: defaults.menuItem1Desc,
    menuItem1Price: defaults.menuItem1Price,
    menuItem2Image: defaults.menuItem2Image,
    menuItem2Name: defaults.menuItem2Name,
    menuItem2Desc: defaults.menuItem2Desc,
    menuItem2Price: defaults.menuItem2Price,
    menuItem3Image: defaults.menuItem3Image,
    menuItem3Name: defaults.menuItem3Name,
    menuItem3Desc: defaults.menuItem3Desc,
    menuItem3Price: defaults.menuItem3Price,

    // Video
    videoUrl: cardData.videoUrl || defaults.videoUrl,
    testimonialsVideoUrl: defaults.testimonialsVideoUrl,

    // Certifications (individual)
    cert1Icon: defaults.cert1Icon,
    cert1Line1: defaults.cert1Line1,
    cert1Line2: defaults.cert1Line2,
    cert2Icon: defaults.cert2Icon,
    cert2Line1: defaults.cert2Line1,
    cert2Line2: defaults.cert2Line2,
    cert3Icon: defaults.cert3Icon,
    cert3Line1: defaults.cert3Line1,
    cert3Line2: defaults.cert3Line2,

    // Testimonials (individual)
    testimonial1Text: defaults.testimonial1Text,
    testimonial1Author: defaults.testimonial1Author,
    testimonial1Source: defaults.testimonial1Source,
    testimonial2Text: defaults.testimonial2Text,
    testimonial2Author: defaults.testimonial2Author,
    testimonial2Source: defaults.testimonial2Source,
    testimonial3Text: defaults.testimonial3Text,
    testimonial3Author: defaults.testimonial3Author,
    testimonial3Source: defaults.testimonial3Source,
    testimonial4Text: defaults.testimonial4Text,
    testimonial4Author: defaults.testimonial4Author,
    testimonial4Source: defaults.testimonial4Source,

    // Gallery (individual)
    gallery1Image: defaults.gallery1Image,
    gallery2Image: defaults.gallery2Image,
    gallery3Image: defaults.gallery3Image,
    gallery4Image: defaults.gallery4Image,
    gallery5Image: defaults.gallery5Image,
    gallery6Image: defaults.gallery6Image,
    gallery7Image: defaults.gallery7Image,
    gallery8Image: defaults.gallery8Image,
    gallery9Image: defaults.gallery9Image,
    gallery10Image: defaults.gallery10Image,
    gallery11Image: defaults.gallery11Image,
    gallery12Image: defaults.gallery12Image,

    // Services (individual)
    service1Name: defaults.service1Name,
    service2Name: defaults.service2Name,
    service3Name: defaults.service3Name,
    service4Name: defaults.service4Name,
    service5Name: defaults.service5Name,
    service6Name: defaults.service6Name,
    service7Name: defaults.service7Name,
    service8Name: defaults.service8Name,
    service9Name: defaults.service9Name,

    // Realtor-specific
    buyerCategoryTitle: defaults.buyerCategoryTitle,
    buyerService1Name: defaults.buyerService1Name,
    buyerService2Name: defaults.buyerService2Name,
    buyerService3Name: defaults.buyerService3Name,
    buyerService4Name: defaults.buyerService4Name,
    buyerService5Name: defaults.buyerService5Name,
    buyerService6Name: defaults.buyerService6Name,
    sellerCategoryTitle: defaults.sellerCategoryTitle,
    sellerService1Name: defaults.sellerService1Name,
    sellerService2Name: defaults.sellerService2Name,
    sellerService3Name: defaults.sellerService3Name,
    sellerService4Name: defaults.sellerService4Name,
    sellerService5Name: defaults.sellerService5Name,
    sellerService6Name: defaults.sellerService6Name,
    stat1Value: defaults.stat1Value,
    stat1Label: defaults.stat1Label,
    stat2Value: defaults.stat2Value,
    stat2Label: defaults.stat2Label,
    stat3Value: defaults.stat3Value,
    stat3Label: defaults.stat3Label,
    feature1Icon: defaults.feature1Icon,
    feature1Text: defaults.feature1Text,
    feature2Icon: defaults.feature2Icon,
    feature2Text: defaults.feature2Text,
    feature3Icon: defaults.feature3Icon,
    feature3Text: defaults.feature3Text,
    feature4Icon: defaults.feature4Icon,
    feature4Text: defaults.feature4Text,
    listing1Image: defaults.listing1Image,
    listing1Price: defaults.listing1Price,
    listing2Image: defaults.listing2Image,
    listing2Price: defaults.listing2Price,
    listing3Image: defaults.listing3Image,
    listing3Price: defaults.listing3Price,
    listing4Image: defaults.listing4Image,
    listing4Price: defaults.listing4Price,

    // Footer
    footerTagline: defaults.footerTagline,
    footerAddress: defaults.footerAddress,
    footerBadge: defaults.footerBadge,
    footerBadgeIcon: defaults.footerBadgeIcon,
    footerBadgeTitle: defaults.footerBadgeTitle,
    footerBadgeSubtitle: defaults.footerBadgeSubtitle,
  };

  // ===== GENERATE DYNAMIC HTML SECTIONS =====

  // Services/Menu HTML
  const menuItems =
    cardData.services && cardData.services.length > 0
      ? cardData.services.map((s) => ({
          name: s.name,
          description: "",
          price: "",
          icon: s.icon,
        }))
      : defaults.menuItems;

  const servicesHTML = menuItems
    .map(
      (item) => `
    <div class="service-card">
      <i class="fas ${(item as { icon?: string }).icon || "fa-check"}"></i>
      <span>${item.name}</span>
    </div>
  `
    )
    .join("");

  const menuItemsHTML = menuItems
    .map(
      (item) => `
    <div class="menu-item">
      ${(item as Record<string, unknown>).image ? `<img src="${(item as Record<string, unknown>).image}" alt="${item.name}" class="menu-item-image">` : ""}
      <div class="menu-item-content">
        <h4 class="menu-item-name">${item.name}</h4>
        ${item.description ? `<p class="menu-item-description">${item.description}</p>` : ""}
      </div>
      ${item.price ? `<span class="menu-item-price">${item.price}</span>` : ""}
    </div>
  `
    )
    .join("");

  // Testimonials HTML
  const testimonials =
    cardData.testimonials && cardData.testimonials.length > 0
      ? cardData.testimonials
      : defaults.testimonials;

  const testimonialsHTML = testimonials
    .map(
      (t) => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${"\u2605".repeat(t.rating || 5)}${"\u2606".repeat(5 - (t.rating || 5))}</div>
      <div class="testimonial-text">"${(t as { content?: string; text?: string }).content || (t as { text?: string }).text || ""}"</div>
      <div class="testimonial-author">-- ${(t as { name?: string; author?: string }).name || (t as { author?: string }).author || ""}</div>
      ${(t as { source?: string }).source ? `<div class="testimonial-source">${(t as { source?: string }).source}</div>` : ""}
    </div>
  `
    )
    .join("");

  const testimonialsTrackHTML = testimonialsHTML + testimonialsHTML;

  // Gallery HTML
  const galleryImages =
    cardData.gallery && cardData.gallery.length > 0
      ? cardData.gallery
      : defaults.galleryImages;

  const galleryHTML = galleryImages
    .map(
      (img) => `
    <div class="gallery-item">
      <img src="${(img as { imageUrl?: string; image?: string }).imageUrl || (img as { image?: string }).image || ""}" alt="${(img as { caption?: string }).caption || "Gallery image"}">
    </div>
  `
    )
    .join("");

  // Certificates HTML
  const certificates =
    cardData.certificates && cardData.certificates.length > 0
      ? cardData.certificates
      : defaults.certificates;

  const certificatesHTML = certificates
    .map(
      (cert) => `
    <div class="cert-badge">
      <i class="fas ${(cert as { icon?: string }).icon || "fa-certificate"}" style="color: #D97706;"></i>
      <div>
        ${(cert as { name?: string }).name || ""}
        ${
          (cert as { licenseNumber?: string; subtitle?: string })
            .licenseNumber ||
          (cert as { subtitle?: string }).subtitle
            ? `<br><small>${(cert as { licenseNumber?: string }).licenseNumber || (cert as { subtitle?: string }).subtitle}</small>`
            : ""
        }
      </div>
    </div>
  `
    )
    .join("");

  // Schedule HTML
  const scheduleHTML = defaults.scheduleItems
    .map(
      (s) => `
    <div class="schedule-row ${s.status}">
      <span class="schedule-day">${s.day}</span>
      <span class="schedule-hours">${s.hours}</span>
    </div>
  `
    )
    .join("");

  // Add dynamic HTML sections to replacements
  replacements["servicesHTML"] = servicesHTML;
  replacements["menuItemsHTML"] = menuItemsHTML;
  replacements["testimonialsHTML"] = testimonialsTrackHTML;
  replacements["galleryHTML"] = galleryHTML;
  replacements["certificatesHTML"] = certificatesHTML;
  replacements["scheduleHTML"] = scheduleHTML;

  // ===== PERFORM ALL REPLACEMENTS =====
  // Server-side: skip DOMPurify since data comes from our own DB
  Object.entries(replacements).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    html = html.replace(regex, value || "");
  });

  // ===== HIDE REFER US FOR NON-PRO =====
  if (!isPro) {
    html = html.replace(
      /<button[^>]*class="[^"]*refer-btn[^"]*"[^>]*>[\s\S]*?<\/button>/gi,
      ""
    );
    html = html.replace(
      /<[^>]*class="[^"]*refer-button[^"]*"[^>]*>[\s\S]*?<\/[^>]*>/gi,
      ""
    );
  }

  // ===== CLEAN UP ANY REMAINING PLACEHOLDERS =====
  html = html.replace(/\{\{[a-zA-Z0-9_]+\}\}/g, "");

  return html;
}

// ─── Full processing with color overrides & booking modal ─────────────────────

export interface ProcessTemplateFullOptions {
  htmlContent: string;
  cardData: ProcessableCardData;
  sector: string | null;
  isPro: boolean;
  customStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
}

/**
 * Full end-to-end template processing:
 * 1. Replace all {{placeholders}}
 * 2. Inject CSS color overrides
 * 3. Inject booking modal markup + script
 *
 * Returns a complete, self-contained HTML document string.
 */
export function processTemplateFull(
  opts: ProcessTemplateFullOptions
): string {
  const { htmlContent, cardData, sector, isPro, customStyles } = opts;
  const defaults = getSectorDefaults(sector);

  // 1. Replace placeholders
  let html = processTemplate(htmlContent, cardData, defaults, isPro);

  // 2. CSS color overrides
  const accentColor = customStyles?.primaryColor || defaults.accentColor;
  const colorOverrides = `
    <style>
      :root {
        --accent: ${accentColor};
        --accent-hover: ${customStyles?.secondaryColor || defaults.accentColorHover};
        --accent-light: ${defaults.accentColorLight};
      }
    </style>
  `;

  // 3. Booking modal (functionality only)
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
        <button class="booking-modal-close" onclick="closeBookingModal()">&times;</button>
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

  // Inject after <head> and before </body>
  html = html.replace("<head>", "<head>" + colorOverrides);
  html = html.replace("</body>", bookingModal + "</body>");

  return html;
}
