"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import api from "@/lib/axios";

export interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: "student" | "tutor" | "admin";
  plan: "free" | "pro";
  phone?: string;
  bio?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [jwtLoading, setJwtLoading] = useState(true);

  const syncTokenAndUser = useCallback(async () => {
    if (!session?.user) {
      localStorage.removeItem("mentorlagbe_token");
      setUser(null);
      setJwtLoading(false);
      return;
    }

    try {
      const { data } = await api.post("/api/jwt");
      localStorage.setItem("mentorlagbe_token", data.token);
      setUser({
        ...data.user,
        image: data.user.image || session.user.image || "",
      });
    } catch {
      setUser(null);
    } finally {
      setJwtLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!isPending) {
      syncTokenAndUser();
    }
  }, [isPending, syncTokenAndUser]);

  const signOut = async () => {
    await authClient.signOut();
    localStorage.removeItem("mentorlagbe_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isPending || jwtLoading,
        refreshUser: syncTokenAndUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};