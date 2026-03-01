import { RestaurantSections } from "./sectors/RestaurantSections";
import { RealEstateSections } from "./sectors/RealEstateSections";
import { ConstructionSections } from "./sectors/ConstructionSections";
import { CleaningSections } from "./sectors/CleaningSections";
import { GeneralSections } from "./sectors/GeneralSections";

export interface SectorRendererProps {
  sector: string;
  profile: {
    services?: Array<{ icon: string; name: string }>;
    custom_data?: Record<string, unknown>;
    custom_styles?: Record<string, string>;
    video_url?: string | null;
    bio?: string | null;
  };
  gallery?: Array<{ id: string; url: string }>;
  testimonials?: Array<{ id: string; quote: string; author: string; rating: number }>;
  isPro?: boolean;
}

export function SectorRenderer({ sector, profile, gallery, testimonials, isPro = false }: SectorRendererProps) {
  const customData = (profile.custom_data || {}) as Record<string, string>;
  const services = profile.services || [];
  
  switch (sector) {
    case "restaurant":
      return (
        <RestaurantSections
          customData={customData}
          videoUrl={profile.video_url}
          isPro={isPro}
        />
      );
    case "real-estate":
      return (
        <RealEstateSections
          customData={customData}
          services={services}
          isPro={isPro}
        />
      );
    case "construction":
      return (
        <ConstructionSections
          customData={customData}
          services={services}
          isPro={isPro}
        />
      );
    case "cleaning":
      return (
        <CleaningSections
          customData={customData}
          services={services}
          gallery={gallery}
          isPro={isPro}
        />
      );
    default:
      return (
        <GeneralSections
          bio={profile.bio}
          videoUrl={profile.video_url}
          gallery={gallery}
          testimonials={testimonials}
          isPro={isPro}
        />
      );
  }
}
