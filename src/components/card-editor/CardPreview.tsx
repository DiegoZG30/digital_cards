import { useState, useMemo } from "react";
import { Template } from "@/hooks/useTemplates";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Layout } from "lucide-react";
import { processTemplateFull } from "@/lib/processTemplate";

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

    const html = processTemplateFull({
      htmlContent: template.htmlContent || template.html_content,
      cardData: {
        profile: data.profile,
        contact: data.contact,
        social: data.social,
        bio: data.bio,
        videoUrl: data.videoUrl,
        testimonials: data.testimonials,
        certificates: data.certificates,
        gallery: data.gallery,
        cta: data.cta,
        bookingUrl: data.bookingUrl,
        bookingType: data.bookingType,
        websiteUrl: data.websiteUrl,
        reviewUrl: data.reviewUrl,
        backgroundImage: data.backgroundImage,
        sectionTitle: data.sectionTitle,
        services: data.services,
        ctaButtonText: data.ctaButtonText,
        ...Object.fromEntries(
          Object.entries(data).filter(([key]) =>
            !['profile', 'contact', 'social', 'bio', 'videoUrl', 'testimonials',
             'certificates', 'gallery', 'cta', 'bookingUrl', 'bookingType',
             'websiteUrl', 'reviewUrl', 'backgroundImage', 'sectionTitle',
             'services', 'ctaButtonText'].includes(key)
          )
        ),
      },
      sector: template.sector,
      isPro,
      customStyles: {
        primaryColor: customStyles.primaryColor,
        secondaryColor: customStyles.secondaryColor,
      },
    });

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
