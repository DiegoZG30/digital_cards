"use client";

import { useEffect, useState, useCallback } from "react";

export type AppRole = "admin" | "user";

interface AuthUser {
  userId: string;
  email: string;
  role: AppRole;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAdmin: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAdmin: false,
  });

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (data.user) {
        setState({
          user: data.user,
          isLoading: false,
          isAdmin: data.user.role === "admin",
        });
      } else {
        setState({ user: null, isLoading: false, isAdmin: false });
      }
    } catch {
      setState({ user: null, isLoading: false, isAdmin: false });
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setState({ user: null, isLoading: false, isAdmin: false });
  };

  return { ...state, signOut, refetch: checkSession };
}
