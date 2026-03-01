"use client";

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

interface PlanContextType {
  plan: "standard" | "pro";
  isPro: boolean;
  isLoading: boolean;
  refetch: () => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [plan, setPlan] = useState<"standard" | "pro">("standard");
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlan = useCallback(async () => {
    if (!user) {
      setPlan("standard");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/subscriptions");
      if (!res.ok) throw new Error("Failed to fetch plan");
      const data = await res.json();
      setPlan((data.plan as "standard" | "pro") || "standard");
    } catch (err) {
      console.error("Error fetching plan:", err);
      setPlan("standard");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  const isPro = plan === "pro";

  return (
    <PlanContext.Provider value={{ plan, isPro, isLoading, refetch: fetchPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan(): PlanContextType {
  const context = useContext(PlanContext);
  if (context === undefined) {
    return { plan: "standard", isPro: false, isLoading: false, refetch: () => {} };
  }
  return context;
}
