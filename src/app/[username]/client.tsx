"use client";

import { useRef, useEffect } from "react";
import {
  CardHeader,
  ContactButtons,
  SocialLinks,
  CertificatesSection,
  CardFooter,
  SectorRenderer,
} from "@/components/public-card";
import type {
  SocialLink,
  GalleryImage,
  Testimonial,
  Certificate,
} from "@/components/public-card";
import { useAnalyticsTracking } from "@/hooks/useAnalyticsTracking";

interface PublicCardClientProps {
  profile: {
    id: string;
    full_name: string | null;
    title: string | null;
    company: string | null;
    bio: string | null;
    profile_image_url: string | null;
    cover_image_url: string | null;
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
    video_url: string | null;
    slug: string | null;
    sector: string | null;
    services: Array<{ icon: string; name: string }> | null;
    custom_data: Record<string, unknown>;
    custom_styles: Record<string, string>;
  };
  socialLinks: Array<{ network: string; url: string }>;
  testimonials: Array<{
    id: string;
    quote: string;
    author: string;
    rating: number;
  }>;
  certificates: Array<{ id: string; title: string; imageUrl: string }>;
  gallery: Array<{ id: string; url: string }>;
  isPro: boolean;
  themeClass: string;
  username: string;
  /** Pre-processed template HTML from the server. When present, renders the
   *  HTML template instead of the React component fallback. */
  processedTemplateHtml?: string | null;
}

export function PublicCardClient({
  profile,
  socialLinks,
  testimonials,
  certificates,
  gallery,
  isPro,
  themeClass,
  username,
  processedTemplateHtml,
}: PublicCardClientProps) {
  const { trackClick } = useAnalyticsTracking({ profileId: profile.id });

  // ─── Template HTML render path ──────────────────────────────────────────────
  // Renders the full template HTML inside an iframe so styles are fully isolated
  // (the template is a self-contained HTML document with its own <head>/<body>).
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!processedTemplateHtml || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(processedTemplateHtml);
    doc.close();
  }, [processedTemplateHtml]);

  if (processedTemplateHtml) {
    return (
      <iframe
        ref={iframeRef}
        title={`${profile.full_name || "Tarjeta"} - Biztec`}
        className="w-full min-h-screen border-0"
        style={{ display: "block", height: "100vh", width: "100%" }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    );
  }

  // ─── React component fallback (no template selected) ────────────────────────
  return (
    <div className={`min-h-screen bg-background ${themeClass}`}>
      <div className="mx-auto max-w-md min-h-screen bg-card shadow-xl">
        <div className="stagger-children">
          <CardHeader
            coverImage={profile.cover_image_url || undefined}
            profileImage={profile.profile_image_url || undefined}
            fullName={profile.full_name || "Sin nombre"}
            jobTitle={profile.title || undefined}
            bio={profile.bio || undefined}
          />

          <ContactButtons
            phone={profile.phone || undefined}
            whatsapp={profile.whatsapp || undefined}
            email={profile.email || undefined}
            onTrackClick={trackClick}
          />

          {socialLinks.length > 0 && (
            <SocialLinks links={socialLinks as SocialLink[]} />
          )}

          <SectorRenderer
            sector={profile.sector || "general"}
            profile={{
              services: profile.services || [],
              custom_data: profile.custom_data || {},
              custom_styles: profile.custom_styles || {},
              video_url: profile.video_url,
              bio: profile.bio,
            }}
            gallery={gallery as GalleryImage[]}
            testimonials={testimonials as Testimonial[]}
            isPro={isPro}
          />

          {isPro && certificates.length > 0 && (
            <CertificatesSection
              certificates={certificates as Certificate[]}
            />
          )}

          <CardFooter
            username={profile.slug || username}
            fullName={profile.full_name || "Sin nombre"}
            phone={profile.phone || undefined}
            email={profile.email || undefined}
            jobTitle={profile.title || undefined}
          />
        </div>
      </div>
    </div>
  );
}
