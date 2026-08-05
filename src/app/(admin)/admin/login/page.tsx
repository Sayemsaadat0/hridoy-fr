"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/config";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "Unable to sign in");
        return;
      }

      router.push(ROUTES.ADMIN);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-hr-green-dark">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hr-green-toxic/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-hr-green-light/4 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p
              className="text-hr-green-toxic font-hr-700 uppercase tracking-wide"
              style={{ fontSize: "var(--text-hr-regular-14)" }}
            >
              Admin Panel
            </p>
            <h1
              className="text-hr-white font-hr-800 mt-2"
              style={{ fontSize: "var(--text-hr-regular-32)" }}
            >
              Welcome <span className="text-hr-green-toxic">Back</span>
            </h1>
            <p
              className="text-hr-gray font-hr-400 mt-2"
              style={{ fontSize: "var(--text-hr-regular-14)" }}
            >
              Sign in to manage the site
            </p>
          </div>

          <div className="rounded-3xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-hr-white font-hr-600 uppercase"
                  style={{ fontSize: "var(--text-hr-regular-12)" }}
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-gray" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-10 bg-hr-black/50 border-hr-white/20 text-hr-white placeholder:text-hr-gray focus-visible:border-hr-green-toxic focus-visible:ring-hr-green-toxic/20 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-hr-white font-hr-600 uppercase"
                  style={{ fontSize: "var(--text-hr-regular-12)" }}
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hr-gray" />
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-10 bg-hr-black/50 border-hr-white/20 text-hr-white placeholder:text-hr-gray focus-visible:border-hr-green-toxic focus-visible:ring-hr-green-toxic/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <p
                  className="text-destructive font-hr-500 bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-linear-to-r from-hr-green-toxic to-hr-green-light hover:from-hr-green-toxic/95 hover:to-hr-green-light/95 disabled:opacity-60 disabled:hover:scale-100 text-hr-white rounded-xl transition-all shadow-lg shadow-hr-green-toxic/10 hover:shadow-hr-green-toxic/20 hover:scale-[1.02] transform font-hr-600 flex items-center justify-center gap-2"
                style={{ fontSize: "var(--text-hr-regular-16)" }}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
                <LogIn className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
