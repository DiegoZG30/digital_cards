"use client";

import { useCallback, useEffect, useRef } from "react";

interface UseAnalyticsTrackingProps {
  profileId: string | null;
}

export function useAnalyticsTracking({ profileId }: UseAnalyticsTrackingProps) {
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!profileId || hasTrackedView.current) return;

    const trackView = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile_id: profileId, event_type: "view" }),
        });
        hasTrackedView.current = true;
      } catch (error) {
        console.error("Error tracking view:", error);
      }
    };

    trackView();
  }, [profileId]);

  const trackClick = useCallback(
    async (buttonName: string) => {
      if (!profileId) return;
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile_id: profileId, event_type: "click", button_name: buttonName }),
        });
      } catch (error) {
        console.error("Error tracking click:", error);
      }
    },
    [profileId]
  );

  return { trackClick };
}
