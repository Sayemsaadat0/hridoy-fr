"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Youtube,
} from "lucide-react";
import { ROUTES } from "@/lib/config";
import Image from "next/image";

const DefaultFooter = () => {
  const essentialLinks = [
    { label: "About Us", href: ROUTES.ABOUT },
    { label: "Contact", href: ROUTES.CONTACT },
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: "https://www.facebook.com/p/Biology-adda-Bogura-official-61563992620656/", 
      label: "Facebook" 
    },
    { 
      icon: Youtube, 
      href: "https://www.youtube.com/@Biology_Adda_Bogura", 
      label: "YouTube" 
    },
  ];

  return (
    <footer className="relative bg-hr-green-dark border-t border-hr-white/10">
      <div className="hr-container py-8 lg:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* Company Information */}
          <div className="space-y-6">
            {/* Logo and Name */}
            <Image
              src="/logo2.png"
              alt="Biology Adda Bogura"
              width={200}
              height={100}
            />
            {/* <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-hr-green-toxic rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-hr-green-dark rounded-sm" />
              </div>
              <h3
                className="text-hr-white font-hr-800"
                style={{ fontSize: "var(--text-hr-regular-24)" }}
              >
                Biology Adda Bogura
              </h3>
            </div> */}

            {/* Tagline */}
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-14)" }}
            >
              Empowering the next generation of biologists with world-class
              education and cutting-edge research insights.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4
              className="text-hr-white font-hr-700 mb-4"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-hr-green-toxic mt-0.5 shrink-0" />
                <p
                  className="text-hr-gray font-hr-400"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  Biology adda Bogura, Near Bogura City College
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-hr-green-toxic shrink-0" />
                <a
                  href="tel:+8801518390674"
                  className="text-hr-gray font-hr-400 hover:text-hr-green-toxic transition-colors"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  01518390674
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-hr-green-toxic shrink-0" />
                <a
                  href="mailto:info@biologyaddabogura.com"
                  className="text-hr-gray font-hr-400 hover:text-hr-green-toxic transition-colors"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  info@biologyaddabogura.com
                </a>
              </div>
            </div>
          </div>

          {/* Essential Links */}
          <div className="space-y-4">
            <h4
              className="text-hr-white font-hr-700 mb-4"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              Links
            </h4>
            <ul className="space-y-3">
              {essentialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 font-hr-400 transition-colors text-hr-gray hover:text-hr-green-toxic"
                    style={{ fontSize: "var(--text-hr-regular-14)" }}
                  >
                    <span className="w-1 h-1 bg-hr-green-toxic rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="border-t border-hr-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p
              className="text-hr-gray font-hr-400 text-center md:text-left"
              style={{ fontSize: "var(--text-hr-regular-14)" }}
            >
              © 2025 Biology Adda. All rights reserved. Made with passion for
              science education.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg border border-hr-white/20 bg-hr-green-dark/50 hover:border-hr-green-toxic hover:bg-hr-green-toxic/10 flex items-center justify-center transition-all"
                  >
                    <Icon className="w-5 h-5 text-hr-white" />
                  </a>
                );
              })}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-hr-green-toxic rounded-full" />
                <span
                  className="text-hr-gray font-hr-500"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  Trusted by 20K+ Students
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DefaultFooter;