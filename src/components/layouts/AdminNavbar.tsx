"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { AdminMobileSidebar } from "./AdminSidebar";
import { ROUTES } from "@/lib/config";

interface AdminUser {
  email: string;
  name: string;
}

export const AdminNavbar: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setUser(data));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(ROUTES.ADMIN_LOGIN);
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-hr-white/10 bg-hr-green-dark px-4">
      <div className="flex items-center gap-3">
        <AdminMobileSidebar />
        <p
          className="text-hr-gray font-hr-400"
          style={{ fontSize: "var(--text-hr-regular-14)" }}
        >
          Welcome back
          {user?.name ? (
            <span className="text-hr-white font-hr-600">, {user.name}</span>
          ) : null}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <span
            className="hidden text-hr-gray font-hr-400 sm:inline"
            style={{ fontSize: "var(--text-hr-regular-14)" }}
          >
            {user.email}
          </span>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-hr-white/15 px-3 py-1.5 font-hr-500 text-hr-white transition-all hover:border-hr-green-toxic/40 hover:text-hr-green-toxic"
          style={{ fontSize: "var(--text-hr-regular-14)" }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
};
