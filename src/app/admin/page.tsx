"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect straight to dashboard
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdmin = sessionStorage.getItem("zc_admin");
      if (isAdmin === "true") {
        router.push("/admin/dashboard");
      }
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Small delay to simulate check / premium feel
    setTimeout(() => {
      if (email === "zechai.official@gmail.com" && password === "zechai@123") {
        sessionStorage.setItem("zc_admin", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#F2E8C4] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-[#E8401C]/5 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#E8401C]/5 filter blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px] bg-[#fdfaf0] border-4 border-[#E8401C] rounded-[24px] p-8 md:p-10 shadow-warm relative z-10"
      >
        {/* Top Header & Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <Logo />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-[#E8401C] text-center tracking-tight">
            Admin Portal
          </h1>
          <p className="text-sm text-[#1A1A1A]/60 font-semibold mt-1">
            Sign in to manage enquiries
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-500/20 text-red-600 font-bold px-4 py-2.5 rounded-[10px] text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Email Input */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-xs font-extrabold text-[#1A1A1A] mb-1.5 uppercase tracking-wider"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-[#E8401C]/15 focus:border-[#E8401C] focus:border-[1.5px] rounded-[10px] py-3 px-4 outline-none font-medium transition-colors"
              placeholder="admin@zechai.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-xs font-extrabold text-[#1A1A1A] mb-1.5 uppercase tracking-wider"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-[#E8401C]/15 focus:border-[#E8401C] focus:border-[1.5px] rounded-[10px] py-3 px-4 outline-none font-medium transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E8401C] hover:bg-[#cf3515] text-[#F2E8C4] font-display font-extrabold text-lg py-3.5 px-6 rounded-[8px] transition-all hover:scale-102 active:scale-98 disabled:bg-gray-400 disabled:scale-100 disabled:pointer-events-none shadow-[0_4px_12px_rgba(232,64,28,0.15)] cursor-pointer mt-6"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-[#F2E8C4]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
