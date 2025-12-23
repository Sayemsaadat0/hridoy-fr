"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { site_navigation_items } from "@/lib/config";
import { cn } from "@/lib/utils";

const DefaultNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = site_navigation_items.defaultMenuItems;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-hr-green-dark border-b border-hr-fiord/20 backdrop-blur-sm">
      <div className="hr-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center font-hr-700 text-hr-white hover:opacity-80 transition-opacity"
            style={{ fontSize: "var(--text-hr-regular-24)" }}
          >
            <span>Logo</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-hr-500 transition-all relative group",
                    isActive
                      ? "text-hr-green-toxic font-hr-600"
                      : "text-hr-catskill-white hover:text-hr-green-toxic"
                  )}
                  style={{ fontSize: "var(--text-hr-regular-16)" }}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-hr-green-toxic" />
                  ) : (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hr-green-toxic transition-all group-hover:w-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="text-hr-white hover:text-hr-catskill-white transition-colors p-2"
                  aria-label="Open menu"
                >
                  <Menu className="size-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[320px] bg-hr-green-dark border-l border-hr-fiord/20"
              >
                <SheetHeader className="absolute -top-96 right-0">
                  <SheetTitle>
                    <X className="size-6" />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex  flex-col gap-6 ">
                  <div className="flex p-5 items-center justify-between mb-4">
                    <Link
                      href="/"
                      className="font-hr-700 text-hr-white"
                      style={{ fontSize: "var(--text-hr-regular-20)" }}
                      onClick={() => setIsOpen(false)}
                    >
                      Logo
                    </Link>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "font-hr-500 py-3 px-4 rounded-md transition-all relative",
                            isActive
                              ? "text-hr-white bg-hr-green-toxic/20 font-hr-600"
                              : "text-hr-catskill-white hover:text-hr-white hover:bg-hr-green-toxic/10"
                          )}
                          style={{ fontSize: "var(--text-hr-regular-16)" }}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-0 bottom-0 w-1 bg-hr-green-toxic rounded-r-md" />
                          )}
                          <span className="relative z-10">{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DefaultNavbar;
