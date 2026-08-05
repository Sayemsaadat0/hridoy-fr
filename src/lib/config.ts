import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Phone,
  Bell,
  Images,
} from "lucide-react";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  NOTICE: "/notice",
  COURSE: "/courses",
  GALLERY: "/gallery",
  ADMIN: "/admin",
  ADMIN_LOGIN: "/admin/login",
  ADMIN_PROGRAMS: "/admin/programs",
  ADMIN_FAQS: "/admin/faqs",
  ADMIN_CONTACTS: "/admin/contacts",
  ADMIN_NOTICE: "/admin/notice",
  ADMIN_GALLERY: "/admin/gallery",
};

export const ADMIN_SIDEBAR_ROUTES = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: ROUTES.ADMIN,
    icon: LayoutDashboard,
    iconSize: 18,
  },
  {
    id: "programs",
    title: "Programs",
    path: ROUTES.ADMIN_PROGRAMS,
    icon: BookOpen,
    iconSize: 18,
  },
  {
    id: "faqs",
    title: "FAQs",
    path: ROUTES.ADMIN_FAQS,
    icon: HelpCircle,
    iconSize: 18,
  },
  {
    id: "contacts",
    title: "Contacts",
    path: ROUTES.ADMIN_CONTACTS,
    icon: Phone,
    iconSize: 18,
  },
  {
    id: "notice",
    title: "Notice",
    path: ROUTES.ADMIN_NOTICE,
    icon: Bell,
    iconSize: 18,
  },
  {
    id: "gallery",
    title: "Gallery",
    path: ROUTES.ADMIN_GALLERY,
    icon: Images,
    iconSize: 18,
  },
];

export const site_navigation_items = {
  defaultMenuItems: [
    {
      label: "Home",
      href: ROUTES.HOME,
    },
    // {
    //   label: "Course",
    //   href: ROUTES.COURSE,
    // },
    {
      label: "About",
      href: ROUTES.ABOUT,
    },
    {
      label: "Contact",
      href: ROUTES.CONTACT,
    },
    {
      label: "Notice",
      href: ROUTES.NOTICE,
    },
    {
      label: "Gallery",
      href: ROUTES.GALLERY,
    },
  ],
};
