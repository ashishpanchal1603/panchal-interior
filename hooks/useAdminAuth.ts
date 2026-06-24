import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState<{ username?: string; password?: string }>({});

  const checkAuth = useCallback(() => {
    if (typeof window === "undefined") return false;
    
    const username = sessionStorage.getItem("admin_username") || "";
    const password = sessionStorage.getItem("admin_password") || "";

    if (!username || !password) {
      return false;
    }
    
    setCredentials({ username, password });
    return true;
  }, []);

  useEffect(() => {
    const authorized = checkAuth();
    if (!authorized) {
      router.replace("/admin/login");
    }
    setLoading(false);
  }, [router, checkAuth]);

  const getAuthHeaders = useCallback(() => {
    if (typeof window === "undefined") return {};
    return {
      "x-admin-username": sessionStorage.getItem("admin_username") || "",
      "x-admin-password": sessionStorage.getItem("admin_password") || "",
    };
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_username");
      sessionStorage.removeItem("admin_password");
    }
    router.replace("/admin/login");
  }, [router]);

  const fetchWithAuth = useCallback(async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers || {});
    const auth = getAuthHeaders();
    if (auth["x-admin-username"]) {
      headers.set("x-admin-username", auth["x-admin-username"]);
    }
    if (auth["x-admin-password"]) {
      headers.set("x-admin-password", auth["x-admin-password"]);
    }

    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      logout();
      throw new Error("Unauthorized access. Redirecting to login...");
    }

    return res;
  }, [getAuthHeaders, logout]);

  return {
    loading,
    credentials,
    getAuthHeaders,
    fetchWithAuth,
    logout,
  };
}
