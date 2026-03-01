import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Github, 
  Globe,
  Music2
} from "lucide-react";
import { Button } from "@/components/ui/button";

type SocialNetwork = 
  | "instagram" 
  | "facebook" 
  | "linkedin" 
  | "twitter" 
  | "youtube" 
  | "github" 
  | "tiktok" 
  | "website";

interface SocialLink {
  network: SocialNetwork;
  url: string;
}

interface SocialLinksProps {
  links?: SocialLink[];
}

const iconMap: Record<SocialNetwork, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  github: Github,
  tiktok: Music2,
  website: Globe,
};

export function SocialLinks({ links }: SocialLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className="px-6 py-4">
      <div className="flex justify-center gap-3 flex-wrap">
        {links.slice(0, 8).map((link, index) => {
          const Icon = iconMap[link.network] || Globe;
          return (
            <Button
              key={index}
              variant="social"
              size="icon-lg"
              asChild
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.network}
              >
                <Icon className="h-5 w-5" />
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export type { SocialLink, SocialNetwork };
