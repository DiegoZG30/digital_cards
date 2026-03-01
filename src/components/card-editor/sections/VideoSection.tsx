import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, AlertCircle, CheckCircle2 } from "lucide-react";

const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/;

export function VideoSection() {
  const [url, setUrl] = useState("");
  const [touched, setTouched] = useState(false);

  const isValidYouTube = url === "" || YOUTUBE_REGEX.test(url);
  const hasValidUrl = url !== "" && isValidYouTube;

  // Extract video ID for preview
  const getVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(url);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="youtubeUrl" className="text-foreground">
          URL de YouTube
        </Label>
        <div className="relative">
          <Input
            id="youtubeUrl"
            placeholder="https://youtube.com/watch?v=..."
            className={`bg-background border-border pr-10 ${
              touched && !isValidYouTube ? 'border-destructive focus-visible:ring-destructive' : ''
            }`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          {touched && url !== "" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isValidYouTube ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-destructive" />
              )}
            </div>
          )}
        </div>
        {touched && !isValidYouTube && (
          <p className="text-xs text-destructive">
            Por favor ingresa una URL válida de YouTube
          </p>
        )}
        {!touched && (
          <p className="text-xs text-muted-foreground">
            Pega el enlace de tu video de YouTube para mostrarlo en tu tarjeta
          </p>
        )}
      </div>

      {/* Preview */}
      <div className="aspect-video rounded-lg bg-muted border border-border overflow-hidden">
        {hasValidUrl && videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video preview"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Video className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Vista previa del video
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
