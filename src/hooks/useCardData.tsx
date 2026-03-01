"use client";

import { useState, useCallback, createContext, useContext, ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { CardData, CustomStyles } from "@/components/card-editor/CardPreview";
import { TemplateSector } from "@/hooks/useTemplates";
import { getSectorDefaults } from "@/config/templateDefaults";

export const DEFAULT_STYLES: CustomStyles = {
  primaryColor: "#D4AF37",
  secondaryColor: "#1E1E1E",
  backgroundColor: "#FFFFFF",
  textColor: "#1E1E1E",
  fontFamily: "'Inter', sans-serif",
  borderRadius: "12px",
};

export const DEFAULT_CARD_DATA: CardData = {
  // Profile
  profile: {
    fullName: "",
    title: "",
    company: "",
    profileImage: "",
  },
  // Slug for public URL
  slug: "",
  // Contact
  contact: {
    phone: "",
    whatsapp: "",
    email: "",
  },
  // Social
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    tiktok: "",
    youtube: "",
  },
  // Content
  bio: "",
  videoUrl: "",
  // Arrays
  testimonials: [],
  certificates: [],
  gallery: [],
  // CTA
  cta: undefined,
  bookingUrl: "",
  bookingType: "external",
  websiteUrl: "",
  reviewUrl: "",
  // Background & Images
  backgroundImage: "",
  bgImage1: "",
  bgImage2: "",
  bgImage3: "",
  bgImage4: "",
  // Section titles
  sectionTitle: "",
  menuSectionTitle: "",
  hoursSectionTitle: "",
  servicesSectionTitle: "",
  experienceSectionTitle: "",
  experienceText: "",
  testimonialsSectionTitle: "",
  gallerySectionTitle: "",
  // Services
  services: [],
  ctaButtonText: "",
  // Top buttons
  referBtnUrl: "",
  referBtnIcon: "",
  referBtnLabel: "",
  reviewBtnUrl: "",
  reviewBtnIcon: "",
  reviewBtnLabel: "",
  // Main buttons
  reserveBtnLabel: "",
  reserveBtnUrl: "",
  saveContactBtnLabel: "",
  bookBtnLabel: "",
  bookBtnUrl: "",
  quoteBtnLabel: "",
  quoteBtnUrl: "",
  // Bottom buttons
  websiteBtnLabel: "",
  shareBtnLabel: "",
  shareInfoBtnLabel: "",
  getCardUrl: "",
  getCardBtnLabel: "",
  // Experience/CTA buttons
  experienceCtaBtnUrl: "",
  experienceCtaBtnIcon: "",
  experienceCtaBtnLabel: "",
  ctaBtnUrl: "",
  ctaBtnIcon: "",
  ctaBtnLabel: "",
  leaveReviewUrl: "",
  leaveReviewBtnLabel: "",
  // Certifications
  cert1Icon: "",
  cert1Line1: "",
  cert1Line2: "",
  cert2Icon: "",
  cert2Line1: "",
  cert2Line2: "",
  cert3Icon: "",
  cert3Line1: "",
  cert3Line2: "",
  // Hours
  hours1Day: "",
  hours1Time: "",
  hours1Status: "",
  hours2Day: "",
  hours2Time: "",
  hours2Status: "",
  hours3Day: "",
  hours3Time: "",
  hours3Status: "",
  hours4Day: "",
  hours4Time: "",
  hours4Status: "",
  hours5Day: "",
  hours5Time: "",
  hours5Status: "",
  // Menu items
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
  // Gallery individual
  gallery1Image: "",
  gallery2Image: "",
  gallery3Image: "",
  gallery4Image: "",
  gallery5Image: "",
  gallery6Image: "",
  gallery7Image: "",
  gallery8Image: "",
  gallery9Image: "",
  gallery10Image: "",
  gallery11Image: "",
  gallery12Image: "",
  // Testimonials individual
  testimonial1Text: "",
  testimonial1Author: "",
  testimonial1Source: "",
  testimonial2Text: "",
  testimonial2Author: "",
  testimonial2Source: "",
  testimonial3Text: "",
  testimonial3Author: "",
  testimonial3Source: "",
  testimonial4Text: "",
  testimonial4Author: "",
  testimonial4Source: "",
  // Realtor-specific
  listing1Image: "",
  listing1Price: "",
  listing2Image: "",
  listing2Price: "",
  listing3Image: "",
  listing3Price: "",
  listing4Image: "",
  listing4Price: "",
  stat1Value: "",
  stat1Label: "",
  stat2Value: "",
  stat2Label: "",
  stat3Value: "",
  stat3Label: "",
  // Footer
  footerTagline: "",
  footerAddress: "",
  footerBadge: "",
};

interface CardDataContextType {
  cardData: CardData;
  customStyles: CustomStyles;
  selectedTemplateId: string | null;
  previewTemplateId: string | null;
  selectedSector: TemplateSector | null;
  isPublished: boolean;
  profileId: string | null;
  hasChanges: boolean;
  isLoading: boolean;
  isSaving: boolean;

  // Generic field update - for any cardData field
  updateField: (field: string, value: unknown) => void;

  // Profile actions
  updateProfile: (field: keyof CardData["profile"], value: string) => void;

  // Contact actions
  updateContact: (field: keyof CardData["contact"], value: string) => void;

  // Social actions
  updateSocial: (field: keyof CardData["social"], value: string) => void;

  // Bio action
  updateBio: (value: string) => void;

  // Video action
  updateVideoUrl: (value: string) => void;

  // Booking actions
  updateBookingUrl: (value: string) => void;
  updateBookingType: (value: "popup" | "external") => void;

  // Website/Review actions
  updateWebsiteUrl: (value: string) => void;
  updateReviewUrl: (value: string) => void;

  // Slug action
  updateSlug: (value: string) => void;

  // Publish action
  updateIsPublished: (value: boolean) => void;

  // Dynamic content actions
  updateBackgroundImage: (value: string) => void;
  updateSectionTitle: (value: string) => void;
  updateServices: (services: CardData["services"]) => void;
  updateCtaButtonText: (value: string) => void;

  // CTA actions
  updateCta: (cta: CardData["cta"]) => void;

  // Testimonials actions
  addTestimonial: (testimonial: CardData["testimonials"][0]) => void;
  removeTestimonial: (index: number) => void;
  updateTestimonial: (index: number, testimonial: CardData["testimonials"][0]) => void;

  // Certificates actions
  addCertificate: (certificate: CardData["certificates"][0]) => void;
  removeCertificate: (index: number) => void;
  updateCertificate: (index: number, certificate: CardData["certificates"][0]) => void;

  // Gallery actions
  addGalleryImage: (image: CardData["gallery"][0]) => void;
  removeGalleryImage: (index: number) => void;
  updateGalleryImage: (index: number, image: CardData["gallery"][0]) => void;

  // Style actions
  updateStyles: (styles: CustomStyles) => void;

  // Template actions
  selectTemplate: (templateId: string | null) => void;
  previewTemplate: (templateId: string | null) => void;
  selectSector: (sector: TemplateSector | null) => void;

  // Save/Reset
  saveToDatabase: () => Promise<void>;
  markAsSaved: () => void;
  resetChanges: () => void;
  refetch: () => Promise<void>;
}

const CardDataContext = createContext<CardDataContextType | undefined>(undefined);

interface CardDataProviderProps {
  children: ReactNode;
}

export function CardDataProvider({ children }: CardDataProviderProps) {
  const { user } = useAuth();

  const [cardData, setCardData] = useState<CardData>(DEFAULT_CARD_DATA);
  const [customStyles, setCustomStyles] = useState<CustomStyles>(DEFAULT_STYLES);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<TemplateSector | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load user profile from database via API
  const loadProfile = useCallback(async () => {
    if (!user?.userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/profiles");

      if (res.status === 404) {
        // No profile yet - the API will need to create one on first save
        // or we can POST to create
        setProfileId(null);
        setIsLoading(false);
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch profile");

      const profile = await res.json();

      if (profile) {
        setProfileId(profile.id);
        setIsPublished(profile.isPublished ?? profile.is_published ?? false);
        setSelectedTemplateId(profile.selectedTemplateId ?? profile.selected_template_id ?? null);
        // Load sector from database
        setSelectedSector((profile.sector as TemplateSector) || null);

        // Map profile data to CardData
        const socialLinks = (profile.socialLinks ?? profile.social_links ?? {}) as Record<string, string>;
        const rawStyles = (profile.customStyles ?? profile.custom_styles ?? null) as Record<string, unknown> | null;
        const styles: CustomStyles = rawStyles ? {
          primaryColor: (rawStyles.primaryColor as string) || DEFAULT_STYLES.primaryColor,
          secondaryColor: (rawStyles.secondaryColor as string) || DEFAULT_STYLES.secondaryColor,
          backgroundColor: (rawStyles.backgroundColor as string) || DEFAULT_STYLES.backgroundColor,
          textColor: (rawStyles.textColor as string) || DEFAULT_STYLES.textColor,
          fontFamily: (rawStyles.fontFamily as string) || DEFAULT_STYLES.fontFamily,
          borderRadius: (rawStyles.borderRadius as string) || DEFAULT_STYLES.borderRadius,
        } : DEFAULT_STYLES;

        // Load custom_data which contains all dynamic template fields
        const customData = (profile.customData ?? profile.custom_data ?? {}) as Record<string, unknown>;

        setCardData({
          profile: {
            fullName: profile.fullName ?? profile.full_name ?? "",
            title: profile.title ?? "",
            company: profile.company ?? "",
            profileImage: profile.profileImageUrl ?? profile.profile_image_url ?? "",
          },
          slug: profile.slug ?? "",
          contact: {
            phone: profile.phone ?? "",
            whatsapp: profile.whatsapp ?? "",
            email: profile.email ?? "",
          },
          social: {
            facebook: socialLinks.facebook ?? "",
            instagram: socialLinks.instagram ?? "",
            linkedin: socialLinks.linkedin ?? "",
            twitter: socialLinks.twitter ?? "",
            tiktok: socialLinks.tiktok ?? "",
            youtube: socialLinks.youtube ?? "",
          },
          bio: profile.bio ?? "",
          videoUrl: profile.videoUrl ?? profile.video_url ?? "",
          testimonials: [],
          certificates: [],
          gallery: [],
          cta: (profile.ctaText ?? profile.cta_text)
            ? { text: profile.ctaText ?? profile.cta_text, url: profile.ctaUrl ?? profile.cta_url ?? "" }
            : undefined,
          bookingUrl: profile.bookingUrl ?? profile.booking_url ?? "",
          bookingType: (profile.bookingType ?? profile.booking_type ?? "external") as "popup" | "external",
          websiteUrl: profile.websiteUrl ?? profile.website_url ?? "",
          reviewUrl: profile.reviewUrl ?? profile.review_url ?? "",
          // Dynamic content
          backgroundImage: profile.backgroundImageUrl ?? profile.background_image_url ?? "",
          sectionTitle: profile.sectionTitle ?? profile.section_title ?? "Servicios",
          services: (profile.services as Array<{icon: string; name: string}>) || [],
          ctaButtonText: profile.ctaButtonText ?? profile.cta_button_text ?? "Book Now",
          // Spread all custom_data fields (button labels, URLs, etc.)
          ...Object.fromEntries(
            Object.entries(customData).map(([key, value]) => [key, value as string])
          ),
        });

        setCustomStyles({
          ...DEFAULT_STYLES,
          ...styles,
        });

        // Process testimonials from the joined API response
        const testimonials = profile.testimonials as Array<Record<string, unknown>> | undefined;
        if (testimonials && testimonials.length > 0) {
          setCardData(prev => ({
            ...prev,
            testimonials: testimonials.map((t) => ({
              name: (t.name as string) ?? "",
              content: (t.content as string) ?? "",
              rating: (t.rating as number) ?? 5,
              videoUrl: (t.videoUrl ?? t.video_url ?? undefined) as string | undefined,
            })),
          }));
        }

        // Process certificates from the joined API response
        const certificates = profile.certificates as Array<Record<string, unknown>> | undefined;
        if (certificates && certificates.length > 0) {
          setCardData(prev => ({
            ...prev,
            certificates: certificates.map((c) => ({
              name: (c.name as string) ?? "",
              imageUrl: (c.imageUrl ?? c.image_url ?? undefined) as string | undefined,
              licenseNumber: (c.licenseNumber ?? c.license_number ?? undefined) as string | undefined,
            })),
          }));
        }

        // Process gallery from the joined API response
        const gallery = profile.gallery_images as Array<Record<string, unknown>> | undefined;
        if (gallery && gallery.length > 0) {
          setCardData(prev => ({
            ...prev,
            gallery: gallery.map((g) => ({
              imageUrl: (g.imageUrl ?? g.image_url) as string,
              caption: (g.caption ?? undefined) as string | undefined,
            })),
          }));
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Error al cargar tu perfil");
    } finally {
      setIsLoading(false);
    }
  }, [user?.userId]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Save to database via API
  const saveToDatabase = useCallback(async () => {
    if (!user?.userId) {
      toast.error("Debes iniciar sesión para guardar");
      return;
    }

    setIsSaving(true);
    try {
      // Extract dynamic template fields to save in custom_data
      // These are all the button labels, URLs, and other template-specific fields
      const dynamicFields = [
        // Button labels
        'referBtnUrl', 'referBtnIcon', 'referBtnLabel',
        'reviewBtnUrl', 'reviewBtnIcon', 'reviewBtnLabel',
        'reserveBtnLabel', 'reserveBtnUrl',
        'saveContactBtnLabel',
        'bookBtnLabel', 'bookBtnUrl',
        'quoteBtnLabel', 'quoteBtnUrl',
        'websiteBtnLabel', 'shareBtnLabel', 'shareInfoBtnLabel',
        'getCardUrl', 'getCardBtnLabel',
        'experienceCtaBtnUrl', 'experienceCtaBtnIcon', 'experienceCtaBtnLabel',
        'ctaBtnUrl', 'ctaBtnIcon', 'ctaBtnLabel',
        'leaveReviewUrl', 'leaveReviewBtnLabel',
        'fullMenuBtnLabel', 'fullMenuBtnUrl',
        // Section titles
        'menuSectionTitle', 'hoursSectionTitle', 'servicesSectionTitle',
        'experienceSectionTitle', 'experienceText',
        'testimonialsSectionTitle', 'gallerySectionTitle',
        // Background images
        'bgImage1', 'bgImage2', 'bgImage3', 'bgImage4',
        // Certifications
        'cert1Icon', 'cert1Line1', 'cert1Line2',
        'cert2Icon', 'cert2Line1', 'cert2Line2',
        'cert3Icon', 'cert3Line1', 'cert3Line2',
        // Hours
        'hours1Day', 'hours1Time', 'hours1Status',
        'hours2Day', 'hours2Time', 'hours2Status',
        'hours3Day', 'hours3Time', 'hours3Status',
        'hours4Day', 'hours4Time', 'hours4Status',
        'hours5Day', 'hours5Time', 'hours5Status',
        // Menu items
        'menuItem1Image', 'menuItem1Name', 'menuItem1Desc', 'menuItem1Price',
        'menuItem2Image', 'menuItem2Name', 'menuItem2Desc', 'menuItem2Price',
        'menuItem3Image', 'menuItem3Name', 'menuItem3Desc', 'menuItem3Price',
        // Gallery
        'gallery1Image', 'gallery2Image', 'gallery3Image', 'gallery4Image',
        'gallery5Image', 'gallery6Image', 'gallery7Image', 'gallery8Image',
        'gallery9Image', 'gallery10Image', 'gallery11Image', 'gallery12Image',
        // Testimonials
        'testimonial1Text', 'testimonial1Author', 'testimonial1Source',
        'testimonial2Text', 'testimonial2Author', 'testimonial2Source',
        'testimonial3Text', 'testimonial3Author', 'testimonial3Source',
        'testimonial4Text', 'testimonial4Author', 'testimonial4Source',
        // Realtor listings
        'listing1Image', 'listing1Price',
        'listing2Image', 'listing2Price',
        'listing3Image', 'listing3Price',
        'listing4Image', 'listing4Price',
        // Stats
        'stat1Value', 'stat1Label',
        'stat2Value', 'stat2Label',
        'stat3Value', 'stat3Label',
        // Footer
        'footerTagline', 'footerAddress', 'footerBadge',
        // Cuisine badge
        'cuisineBadge',
      ];

      // Build custom_data object with only non-empty values
      const customData: Record<string, string> = {};
      const cardDataRecord = cardData as Record<string, unknown>;
      dynamicFields.forEach(field => {
        const value = cardDataRecord[field];
        if (value && typeof value === 'string' && value.trim() !== '') {
          customData[field] = value;
        }
      });

      console.log("Saving profile via API:", { customData });

      // Build the payload for PUT /api/profiles
      const payload = {
        // Profile fields
        selectedTemplateId: selectedTemplateId,
        sector: selectedSector,
        isPublished: isPublished,
        fullName: cardData.profile.fullName,
        title: cardData.profile.title,
        company: cardData.profile.company,
        profileImageUrl: cardData.profile.profileImage,
        phone: cardData.contact.phone,
        whatsapp: cardData.contact.whatsapp,
        email: cardData.contact.email,
        bio: cardData.bio,
        videoUrl: cardData.videoUrl,
        ctaText: cardData.cta?.text || null,
        ctaUrl: cardData.cta?.url || null,
        bookingUrl: cardData.bookingUrl,
        bookingType: cardData.bookingType,
        websiteUrl: cardData.websiteUrl,
        reviewUrl: cardData.reviewUrl,
        // Slug for public URL
        slug: cardData.slug || null,
        // Dynamic content fields
        backgroundImageUrl: cardData.backgroundImage || null,
        sectionTitle: cardData.sectionTitle || "Servicios",
        services: cardData.services || [],
        ctaButtonText: cardData.ctaButtonText || "Book Now",
        // JSON fields
        socialLinks: {
          facebook: cardData.social.facebook,
          instagram: cardData.social.instagram,
          linkedin: cardData.social.linkedin,
          twitter: cardData.social.twitter,
          tiktok: cardData.social.tiktok,
          youtube: cardData.social.youtube,
        },
        customStyles: {
          primaryColor: customStyles.primaryColor,
          secondaryColor: customStyles.secondaryColor,
          backgroundColor: customStyles.backgroundColor,
          textColor: customStyles.textColor,
          fontFamily: customStyles.fontFamily,
          borderRadius: customStyles.borderRadius,
        },
        // Store all dynamic template fields
        customData: customData,

        // Related arrays - the API handles batch delete+insert
        testimonials: cardData.testimonials.map((t, index) => ({
          name: t.name,
          content: t.content,
          rating: t.rating,
          videoUrl: t.videoUrl || null,
          sortOrder: index,
        })),
        certificates: cardData.certificates.map((c, index) => ({
          name: c.name,
          imageUrl: c.imageUrl || null,
          licenseNumber: c.licenseNumber || null,
          sortOrder: index,
        })),
        gallery_images: cardData.gallery.map((g, index) => ({
          imageUrl: g.imageUrl,
          caption: g.caption || null,
          sortOrder: index,
        })),
      };

      const res = await fetch("/api/profiles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save profile");
      }

      setHasChanges(false);
      toast.success("Cambios guardados correctamente");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Error al guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  }, [user?.userId, profileId, selectedTemplateId, selectedSector, cardData, customStyles, isPublished]);

  // Profile updates
  const updateProfile = useCallback((field: keyof CardData["profile"], value: string) => {
    setCardData(prev => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
    setHasChanges(true);
  }, []);

  // Contact updates
  const updateContact = useCallback((field: keyof CardData["contact"], value: string) => {
    setCardData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
    setHasChanges(true);
  }, []);

  // Social updates
  const updateSocial = useCallback((field: keyof CardData["social"], value: string) => {
    setCardData(prev => ({
      ...prev,
      social: { ...prev.social, [field]: value }
    }));
    setHasChanges(true);
  }, []);

  // Bio update
  const updateBio = useCallback((value: string) => {
    setCardData(prev => ({ ...prev, bio: value }));
    setHasChanges(true);
  }, []);

  // Video URL update
  const updateVideoUrl = useCallback((value: string) => {
    setCardData(prev => ({ ...prev, videoUrl: value }));
    setHasChanges(true);
  }, []);

  // Booking updates
  const updateBookingUrl = useCallback((value: string) => {
    setCardData(prev => ({ ...prev, bookingUrl: value }));
    setHasChanges(true);
  }, []);

  const updateBookingType = useCallback((value: "popup" | "external") => {
    setCardData(prev => ({ ...prev, bookingType: value }));
    setHasChanges(true);
  }, []);

  // Website/Review updates
  const updateWebsiteUrl = useCallback((value: string) => {
    setCardData(prev => ({ ...prev, websiteUrl: value }));
    setHasChanges(true);
  }, []);

  const updateReviewUrl = useCallback((value: string) => {
    setCardData(prev => ({ ...prev, reviewUrl: value }));
    setHasChanges(true);
  }, []);

  // Slug update
  const updateSlug = useCallback((value: string) => {
    setCardData(prev => ({ ...prev, slug: value }));
    setHasChanges(true);
  }, []);

  // Publish toggle
  const updateIsPublished = useCallback((value: boolean) => {
    setIsPublished(value);
    setHasChanges(true);
  }, []);

  // Dynamic content updates
  const updateBackgroundImage = useCallback((value: string) => {
    setCardData(prev => ({ ...prev, backgroundImage: value }));
    setHasChanges(true);
  }, []);

  const updateSectionTitle = useCallback((value: string) => {
    setCardData(prev => ({ ...prev, sectionTitle: value }));
    setHasChanges(true);
  }, []);

  const updateServices = useCallback((services: CardData["services"]) => {
    setCardData(prev => ({ ...prev, services }));
    setHasChanges(true);
  }, []);

  const updateCtaButtonText = useCallback((value: string) => {
    setCardData(prev => ({ ...prev, ctaButtonText: value }));
    setHasChanges(true);
  }, []);

  // CTA update
  const updateCta = useCallback((cta: CardData["cta"]) => {
    setCardData(prev => ({ ...prev, cta }));
    setHasChanges(true);
  }, []);

  // Testimonials actions
  const addTestimonial = useCallback((testimonial: CardData["testimonials"][0]) => {
    setCardData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, testimonial]
    }));
    setHasChanges(true);
  }, []);

  const removeTestimonial = useCallback((index: number) => {
    setCardData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  }, []);

  const updateTestimonial = useCallback((index: number, testimonial: CardData["testimonials"][0]) => {
    setCardData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((t, i) => i === index ? testimonial : t)
    }));
    setHasChanges(true);
  }, []);

  // Certificates actions
  const addCertificate = useCallback((certificate: CardData["certificates"][0]) => {
    setCardData(prev => ({
      ...prev,
      certificates: [...prev.certificates, certificate]
    }));
    setHasChanges(true);
  }, []);

  const removeCertificate = useCallback((index: number) => {
    setCardData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  }, []);

  const updateCertificate = useCallback((index: number, certificate: CardData["certificates"][0]) => {
    setCardData(prev => ({
      ...prev,
      certificates: prev.certificates.map((c, i) => i === index ? certificate : c)
    }));
    setHasChanges(true);
  }, []);

  // Gallery actions
  const addGalleryImage = useCallback((image: CardData["gallery"][0]) => {
    setCardData(prev => ({
      ...prev,
      gallery: [...prev.gallery, image]
    }));
    setHasChanges(true);
  }, []);

  const removeGalleryImage = useCallback((index: number) => {
    setCardData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  }, []);

  const updateGalleryImage = useCallback((index: number, image: CardData["gallery"][0]) => {
    setCardData(prev => ({
      ...prev,
      gallery: prev.gallery.map((g, i) => i === index ? image : g)
    }));
    setHasChanges(true);
  }, []);

  // Generic field update - for any cardData field
  const updateField = useCallback((field: string, value: unknown) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  }, []);

  // Styles update
  const updateStyles = useCallback((styles: CustomStyles) => {
    setCustomStyles(styles);
    setHasChanges(true);
  }, []);

  // Template selection
  const selectTemplate = useCallback((templateId: string | null) => {
    setSelectedTemplateId(templateId);
    setHasChanges(true);
  }, []);

  // Template preview (does NOT persist)
  const previewTemplate = useCallback((templateId: string | null) => {
    setPreviewTemplateId(templateId);
  }, []);

  // Sector selection - preserves common fields, resets sector-specific fields with new sector defaults
  const selectSector = useCallback((sector: TemplateSector | null) => {
    if (!sector) {
      setSelectedSector(null);
      return;
    }

    // Get defaults for the NEW sector
    const newSectorDefaults = getSectorDefaults(sector);

    // Preserve common fields that should NOT be lost when changing sector
    // Reset sector-specific fields with defaults from the new sector
    setCardData(prev => ({
      // Start with base defaults
      ...DEFAULT_CARD_DATA,

      // PRESERVE: Profile data (always common)
      profile: { ...prev.profile },

      // PRESERVE: Contact data (always common)
      contact: { ...prev.contact },

      // PRESERVE: Social links (always common)
      social: { ...prev.social },

      // PRESERVE: Bio and video (always common)
      bio: prev.bio,
      videoUrl: prev.videoUrl,

      // PRESERVE: Booking/Website/Review URLs (always common)
      bookingUrl: prev.bookingUrl,
      bookingType: prev.bookingType,
      websiteUrl: prev.websiteUrl,
      reviewUrl: prev.reviewUrl,

      // PRESERVE: Arrays from related tables (testimonials, certificates, gallery)
      // These are in separate DB tables and don't get reset
      testimonials: prev.testimonials,
      certificates: prev.certificates,
      gallery: prev.gallery,

      // RESET with NEW SECTOR DEFAULTS: Sector-specific fields
      sectionTitle: newSectorDefaults.sectionTitle || "",
      ctaButtonText: newSectorDefaults.ctaButtonText || "",
      // Services will be empty - user fills in their own
      services: [],
    }));

    setSelectedSector(sector);
    setSelectedTemplateId(null); // Reset template when sector changes
    setHasChanges(true);
  }, []);

  // Mark as saved
  const markAsSaved = useCallback(() => {
    setHasChanges(false);
  }, []);

  // Reset changes
  const resetChanges = useCallback(() => {
    loadProfile();
    setHasChanges(false);
  }, [loadProfile]);

  const value: CardDataContextType = {
    cardData,
    customStyles,
    selectedTemplateId,
    previewTemplateId,
    selectedSector,
    isPublished,
    profileId,
    hasChanges,
    isLoading,
    isSaving,
    updateField,
    updateProfile,
    updateContact,
    updateSocial,
    updateBio,
    updateVideoUrl,
    updateBookingUrl,
    updateBookingType,
    updateWebsiteUrl,
    updateReviewUrl,
    updateSlug,
    updateIsPublished,
    updateBackgroundImage,
    updateSectionTitle,
    updateServices,
    updateCtaButtonText,
    updateCta,
    addTestimonial,
    removeTestimonial,
    updateTestimonial,
    addCertificate,
    removeCertificate,
    updateCertificate,
    addGalleryImage,
    removeGalleryImage,
    updateGalleryImage,
    updateStyles,
    selectTemplate,
    previewTemplate,
    selectSector,
    saveToDatabase,
    markAsSaved,
    resetChanges,
    refetch: loadProfile,
  };

  return (
    <CardDataContext.Provider value={value}>
      {children}
    </CardDataContext.Provider>
  );
}

export function useCardData() {
  const context = useContext(CardDataContext);
  if (context === undefined) {
    throw new Error("useCardData must be used within a CardDataProvider");
  }
  return context;
}
