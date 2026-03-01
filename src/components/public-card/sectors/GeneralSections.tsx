import { VideoSection } from "../VideoSection";
import { ImageGallery } from "../ImageGallery";
import { TestimonialsSection } from "../TestimonialsSection";

interface GeneralSectionsProps {
  bio?: string | null;
  videoUrl?: string | null;
  gallery?: Array<{ id: string; url: string }>;
  testimonials?: Array<{ id: string; quote: string; author: string; rating: number }>;
  isPro?: boolean;
}

export function GeneralSections({ bio, videoUrl, gallery, testimonials, isPro = false }: GeneralSectionsProps) {
  return (
    <div className="space-y-6">
      {/* Bio Section (if not already shown in header) */}
      {bio && (
        <section className="px-6 py-4">
          <p className="text-muted-foreground text-center text-sm leading-relaxed">{bio}</p>
        </section>
      )}

      {/* Video */}
      {isPro && videoUrl && <VideoSection youtubeUrl={videoUrl} />}

      {/* Gallery */}
      {isPro && gallery && gallery.length > 0 && <ImageGallery images={gallery} />}

      {/* Testimonials */}
      {isPro && testimonials && testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}
    </div>
  );
}
