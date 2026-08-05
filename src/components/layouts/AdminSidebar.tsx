"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ADMIN_SIDEBAR_ROUTES } from "@/lib/config";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, MenuIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminSidebarItemProps {
  route: (typeof ADMIN_SIDEBAR_ROUTES)[number];
  isCollapsed: boolean;
  isMobile?: boolean;
  onNavigate?: () => void;
}

const AdminSidebarItem: React.FC<AdminSidebarItemProps> = ({
  route,
  isCollapsed,
  isMobile = false,
  onNavigate,
}) => {
  const pathname = usePathname();
  const isActive = pathname === route.path;
  const Icon = route.icon;

  const itemContent = (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg p-2.5 font-hr-500 text-hr-gray transition-colors hover:bg-hr-white/5 hover:text-hr-white",
        isActive && "bg-hr-green-toxic/10 text-hr-green-toxic hover:bg-hr-green-toxic/10 hover:text-hr-green-toxic"
      )}
      style={{ fontSize: "var(--text-hr-regular-14)" }}
    >
      <Icon size={route.iconSize} className="shrink-0" />
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap transition-all duration-300",
          isCollapsed && !isMobile ? "w-0 opacity-0" : "w-auto opacity-100"
        )}
      >
        {route.title}
      </span>
    </div>
  );

  const link = (
    <Link href={route.path} className="block" onClick={onNavigate}>
      {itemContent}
    </Link>
  );

  if (isCollapsed && !isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent
          side="right"
          className="border-hr-white/10 bg-hr-green-dark text-hr-white"
        >
          {route.title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
};

export const AdminSidebarContent: React.FC<{
  isCollapsed: boolean;
  isMobile?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
}> = ({ isCollapsed, isMobile = false, onToggleCollapse, onNavigate }) => {
  return (
    <div className="flex h-full flex-col bg-hr-green-dark">
      <div className="flex h-16 items-center gap-3 border-b border-hr-white/10 px-4">
        {!isMobile && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden shrink-0 cursor-pointer text-hr-gray transition-colors hover:text-hr-green-toxic md:flex"
            aria-label="Toggle sidebar"
          >
            <MenuIcon size={20} />
          </button>
        )}
        <Link
          href="/admin"
          className={cn(
            "flex items-center overflow-hidden transition-all duration-300",
            isCollapsed && !isMobile ? "w-0 opacity-0" : "w-[104px] opacity-100"
          )}
        >
          <Image
            src="/admin_logo1.png"
            alt="Logo"
            width={140}
            height={40}
            priority
            className="h-12 w-auto shrink-0 object-contain"
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {ADMIN_SIDEBAR_ROUTES.map((route) => (
          <AdminSidebarItem
            key={route.id}
            route={route}
            isCollapsed={isCollapsed}
            isMobile={isMobile}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </div>
  );
};

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
}) => {
  return (
    <div
      className={cn(
        "hidden h-full flex-col border-r border-hr-white/10 transition-all duration-300 md:flex",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      <AdminSidebarContent isCollapsed={isCollapsed} onToggleCollapse={onToggleCollapse} />
    </div>
  );
};

export const AdminMobileSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-hr-gray transition-colors hover:text-hr-green-toxic md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 border-hr-white/10 bg-hr-green-dark p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <AdminSidebarContent
          isCollapsed={false}
          isMobile
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};
