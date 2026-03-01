import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
}

interface ImageGalleryProps {
  images?: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="py-4">
      <h3 className="px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Galería
      </h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 px-6">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image.url)}
              className="flex-shrink-0 rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
            >
              <img
                src={image.url}
                alt=""
                className="h-24 w-24 object-cover"
              />
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 bg-transparent border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt=""
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export type { GalleryImage };
