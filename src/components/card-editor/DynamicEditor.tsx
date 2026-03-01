import { useMemo } from "react";
import { Accordion } from "@/components/ui/accordion";
import { getSectorSections, EditorSectionConfig } from "@/config/sectorSchemas";
import { TemplateSector } from "@/hooks/useTemplates";
import { 
  EditorSection,
  ProfileSection,
  ContactButtonsSection,
  SocialLinksSection,
  BioSection,
  VideoSection,
  TestimonialsSection,
  CertificatesSection,
  GallerySection,
  CTASection,
  BookingSection,
  ReviewWebsiteSection,
  ServicesSection,
  BackgroundSection,
  StyleEditorSection,
  ColorsSection,
  MainButtonsSection,
  CertificationsEditorSection,
  ExperienceEditorSection,
  BottomButtonsSection,
  GalleryEditorSection,
  TestimonialsEditorSection,
  SingleBackgroundSection,
  // Restaurant
  BackgroundImagesSection,
  MenuSection,
  HoursSection,
  RestaurantCTASection,
  RestaurantFooterSection,
  // Realtor
  RealtorServicesSection,
  StatsSection,
  RealtorFeaturesSection,
  ListingsSection,
  RealtorCTASection,
  RealtorFooterSection,
  // Construction
  Services9Section,
  FeaturesWithIconsSection,
  ConstructionCTASection,
  BadgeFooterSection,
  // General
  TestimonialsVideoSection,
  GeneralFooterSection,
  GeneralCTASection,
} from "@/components/card-editor";
import { useCardData } from "@/hooks/useCardData";
import {
  User,
  Phone,
  Share2,
  FileText,
  Video,
  MessageSquareQuote,
  Award,
  Images,
  MousePointer2,
  Calendar,
  Globe,
  Wrench,
  ImageIcon,
  Palette,
  BookOpen,
  Gift,
  Star,
  Clock,
  BarChart3,
  Home,
  CheckCircle,
  HardHat,
  Sparkles,
  MapPin,
} from "lucide-react";

// Map component types to actual React components
const SECTION_COMPONENTS: Record<string, React.FC<any>> = {
  profile: ProfileSection,
  contact: ContactButtonsSection,
  social: SocialLinksSection,
  bio: BioSection,
  video: VideoSection,
  testimonials: TestimonialsSection,
  certificates: CertificatesSection,
  gallery: GallerySection,
  galleryEditor: GalleryEditorSection,
  cta: CTASection,
  booking: BookingSection,
  website: ReviewWebsiteSection,
  services: ServicesSection,
  menu: ServicesSection,
  properties: ServicesSection,
  background: BackgroundSection,
  styles: StyleEditorSection,
  colors: ColorsSection,
  mainButtons: MainButtonsSection,
  certifications: CertificationsEditorSection,
  experience: ExperienceEditorSection,
  bottomButtons: BottomButtonsSection,
  // Sector-specific
  bgImages: BackgroundImagesSection,
  restaurantMenu: MenuSection,
  hours: HoursSection,
  restaurantCta: RestaurantCTASection,
  restaurantFooter: RestaurantFooterSection,
  realtorServices: RealtorServicesSection,
  stats: StatsSection,
  realtorFeatures: RealtorFeaturesSection,
  listings: ListingsSection,
  realtorCta: RealtorCTASection,
  realtorFooter: RealtorFooterSection,
  services9: Services9Section,
  featuresWithIcons: FeaturesWithIconsSection,
  constructionCta: ConstructionCTASection,
  badgeFooter: BadgeFooterSection,
  testimonialsVideo: TestimonialsVideoSection,
  generalFooter: GeneralFooterSection,
  generalCta: GeneralCTASection,
  testimonialsEditor: TestimonialsEditorSection,
  testimonialsWithSource: () => <TestimonialsEditorSection showSource />,
  singleBackground: SingleBackgroundSection,
};

// Map icon names to Lucide components
const ICON_MAP: Record<string, React.ReactNode> = {
  User: <User className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  Share2: <Share2 className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Video: <Video className="w-5 h-5" />,
  MessageSquareQuote: <MessageSquareQuote className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Images: <Images className="w-5 h-5" />,
  MousePointer2: <MousePointer2 className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  ImageIcon: <ImageIcon className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Gift: <Gift className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  HardHat: <HardHat className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
};

interface DynamicEditorProps {
  sector: TemplateSector;
}

export function DynamicEditor({ sector }: DynamicEditorProps) {
  const { cardData } = useCardData();
  
  // Get sorted sections for this sector
  const sections = useMemo(() => getSectorSections(sector), [sector]);

  // Calculate section status for badges
  const getSectionStatus = (sectionId: string): boolean => {
    const data = cardData as Record<string, unknown>;
    switch (sectionId) {
      case "background":
      case "singleBackground":
        return !!cardData.backgroundImage;
      case "bgImages":
        return !!(data.bgImage1 || data.bgImage2 || data.bgImage3 || data.bgImage4);
      case "profile":
        return !!(cardData.profile.fullName || cardData.profile.title || cardData.profile.company);
      case "contact":
        return !!(cardData.contact.phone || cardData.contact.whatsapp || cardData.contact.email);
      case "social":
        return Object.values(cardData.social).some(v => !!v);
      case "bio":
        return !!cardData.bio;
      case "video":
        return !!cardData.videoUrl;
      case "testimonials":
      case "testimonialsEditor":
      case "testimonialsWithSource":
        return !!(data.testimonial1Text || data.testimonial2Text);
      case "testimonialsVideo":
        return !!data.testimonialsVideoUrl;
      case "certificates":
      case "certifications":
        return !!(data.cert1Line1 || data.cert2Line1 || data.cert3Line1);
      case "gallery":
      case "galleryEditor":
        return !!(data.gallery1Image || data.gallery2Image);
      case "listings":
        return !!(data.listing1Image || data.listing2Image);
      case "cta":
        return !!cardData.cta;
      case "booking":
        return !!cardData.bookingUrl;
      case "website":
        return !!cardData.websiteUrl || !!cardData.reviewUrl;
      case "services":
      case "menu":
      case "properties":
        return (cardData.services?.length || 0) > 0;
      case "services9":
      case "realtorServices":
        return !!(data.service1Name || data.buyerService1Name);
      case "restaurantMenu":
        return !!(data.menuItem1Name || data.menuItem2Name);
      case "hours":
        return !!(data.hours1Day || data.hours2Day);
      case "stats":
        return !!(data.stat1Value || data.stat2Value);
      case "mainButtons":
        return !!(data.referBtnLabel || data.reviewBtnLabel);
      case "bottomButtons":
        return !!(data.websiteBtnLabel || data.shareBtnLabel);
      case "experience":
        return !!(data.experienceSectionTitle || data.experienceText);
      case "realtorFeatures":
      case "featuresWithIcons":
        return !!(data.feature1Text || data.feature2Text);
      case "styles":
        return true;
      default:
        return false;
    }
  };

  // Default open sections - first few important ones
  const defaultOpenSections = useMemo(() => {
    return sections.slice(0, 3).map(s => s.id);
  }, [sections]);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <Accordion 
        type="multiple" 
        defaultValue={defaultOpenSections}
        className="divide-y divide-border"
      >
        {sections.map((section) => {
          const SectionComponent = SECTION_COMPONENTS[section.componentType || section.id];
          
          if (!SectionComponent) {
            console.warn(`No component found for section: ${section.id} (componentType: ${section.componentType})`);
            return null;
          }

          return (
            <EditorSection
              key={section.id}
              value={section.id}
              icon={ICON_MAP[section.icon] || <Wrench className="w-5 h-5" />}
              title={section.title}
              hasData={getSectionStatus(section.id)}
            >
              <SectionComponent />
            </EditorSection>
          );
        })}
      </Accordion>
    </div>
  );
}
