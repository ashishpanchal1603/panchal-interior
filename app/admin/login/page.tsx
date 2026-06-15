"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sofa, Lock, User, Eye, EyeOff, ArrowLeft, RefreshCw } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  
  // Login input states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Status states
  const [authError, setAuthError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Check if already authenticated on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("admin_username");
    const storedPass = sessionStorage.getItem("admin_password");
    if (storedUser && storedPass) {
      router.replace("/admin/leads");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setAuthError("Please fill in both fields.");
      return;
    }
    
    setIsVerifying(true);
    setAuthError("");
    
    try {
      const response = await fetch("/api/admin/leads", {
        headers: {
          "x-admin-username": username,
          "x-admin-password": password,
        },
      });
      
      if (response.status === 401) {
        setAuthError("Invalid username or password. Access denied.");
        sessionStorage.removeItem("admin_username");
        sessionStorage.removeItem("admin_password");
      } else if (!response.ok) {
        setAuthError("API validation failed. Please try again.");
      } else {
        // Correct credentials -> store in session and redirect to admin panel
        sessionStorage.setItem("admin_username", username);
        sessionStorage.setItem("admin_password", password);
        router.push("/admin/leads");
      }
    } catch (err) {
      console.error(err);
      setAuthError("Connection error. Ensure your local server is running.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased selection:bg-primary selection:text-stone-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up">
        {/* Logo Icon */}
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-300">
            <Sofa className="h-7 w-7" />
          </div>
        </div>
        
        {/* Title */}
        <h2 className="mt-6 text-center font-serif text-3xl font-extrabold text-stone-900 tracking-tight">
          Panchal Interior
        </h2>
        <p className="mt-1.5 text-center text-xs font-bold uppercase tracking-widest text-primary">
          Admin Control Gateway
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-scale-in">
        <div className="bg-white py-8 px-4 shadow-xl shadow-stone-200/50 rounded-2xl border border-stone-100/80 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                Username
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4.5 w-4.5 text-stone-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm tracking-wide placeholder-stone-400 transition"
                  placeholder="Enter admin username"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4.5 w-4.5 text-stone-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-11 py-3 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm tracking-wide font-mono placeholder-stone-400 transition"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                
                {/* Visibility Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5 animate-scale-in" />
                  ) : (
                    <Eye className="h-4.5 w-4.5 animate-scale-in" />
                  )}
                </button>
              </div>
            </div>

            {/* Error state alert */}
            {authError && (
              <div className="text-xs text-red-700 font-semibold bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2 shadow-sm animate-scale-in">
                <span className="mt-0.5 select-none text-red-500">⚠️</span>
                <span>{authError}</span>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md shadow-primary/10 text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none"
              >
                {isVerifying ? (
                  <RefreshCw className="h-5 w-5 animate-spin text-white" />
                ) : (
                  "Unlock Admin Panel"
                )}
              </button>
            </div>
          </form>

          {/* Go Back Link */}
          <div className="mt-6 border-t border-stone-100 pt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-stone-700 transition duration-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
