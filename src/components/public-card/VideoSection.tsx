import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoSectionProps {
  youtubeUrl?: string;
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function VideoSection({ youtubeUrl }: VideoSectionProps) {
  if (!youtubeUrl) return null;

  const videoId = extractYouTubeId(youtubeUrl);
  if (!videoId) return null;

  return (
    <div className="px-6 py-4">
      <div className="rounded-lg overflow-hidden border border-border">
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </AspectRatio>
      </div>
    </div>
  );
}
