"use client";

import { useEffect, useState, useCallback } from "react";

export type AppRole = "admin" | "pro" | "standard";

interface AuthUser {
  userId: string;
  email: string;
  role: AppRole;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (data.user) {
        setState({ user: data.user, isLoading: false });
      } else {
        setState({ user: null, isLoading: false });
      }
    } catch {
      setState({ user: null, isLoading: false });
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setState({ user: null, isLoading: false });
  };

  const user = state.user;
  const isAdmin = user?.role === "admin";
  const isPro = user?.role === "pro" || isAdmin;
  const isStandard = user?.role === "standard";

  return {
    user,
    isLoading: state.isLoading,
    isAdmin,
    isPro,
    isStandard,
    signOut,
    refetch: checkSession,
  };
}
