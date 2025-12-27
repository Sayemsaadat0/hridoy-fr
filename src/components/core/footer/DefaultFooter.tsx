"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { ROUTES } from "@/lib/config";

const DefaultFooter = () => {
  const quickLinks = [
    { label: "About Us", href: ROUTES.ABOUT },
    { label: "Our Programs", href: ROUTES.COURSE },
    { label: "Instructors", href: "#instructors" },
    { label: "Success Stories", href: "#stories" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers" },
  ];

  const popularCourses = [
    { label: "Molecular Biology", href: "#molecular-biology" },
    { label: "Cell Biology", href: "#cell-biology" },
    { label: "Genetics", href: "#genetics" },
    { label: "Microbiology", href: "#microbiology" },
    { label: "Biochemistry", href: "#biochemistry" },
    { label: "Ecology", href: "#ecology" },
  ];

  const supportLinks = [
    { label: "Help Center", href: "#help" },
    { label: "Contact Us", href: ROUTES.CONTACT },
    { label: "FAQs", href: "#faq" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Refund Policy", href: "#refund" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-hr-green-dark border-t border-hr-white/10">
      <div className="hr-container py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Company Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-hr-green-toxic rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-hr-green-dark rounded-sm" />
              </div>
              <h3
                className="text-hr-white font-hr-800"
                style={{ fontSize: "var(--text-hr-regular-24)" }}
              >
                Biology Adda Bogura
              </h3>
            </div>

            {/* Tagline */}
            <p
              className="text-hr-gray font-hr-400 leading-relaxed max-w-md"
              style={{ fontSize: "var(--text-hr-regular-16)" }}
            >
              Empowering the next generation of biologists with world-class
              education and cutting-edge research insights.
            </p>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-hr-green-toxic mt-0.5 shrink-0" />
                <p
                  className="text-hr-gray font-hr-400"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  123 Science Avenue, Research District, CA 94102
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-hr-green-toxic shrink-0" />
                <p
                  className="text-hr-gray font-hr-400"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  +1 (555) 123-4567
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-hr-green-toxic shrink-0" />
                <p
                  className="text-hr-gray font-hr-400"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  hello@biologyadda.com
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="text-hr-white font-hr-700 mb-4"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
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

          {/* Popular Courses */}
          <div className="space-y-4">
            <h4
              className="text-hr-white font-hr-700 mb-4"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              Popular Courses
            </h4>
            <ul className="space-y-3">
              {popularCourses.map((course) => (
                <li key={course.label}>
                  <Link
                    href={course.href}
                    className="group flex items-center gap-2 font-hr-400 transition-colors text-hr-gray hover:text-hr-green-toxic"
                    style={{ fontSize: "var(--text-hr-regular-14)" }}
                  >
                    <span className="w-1 h-1 bg-hr-green-toxic rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {course.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Certifications */}
          <div className="space-y-8">
            {/* Support Links */}
            <div className="space-y-4">
              <h4
                className="text-hr-white font-hr-700 mb-4"
                style={{ fontSize: "var(--text-hr-regular-18)" }}
              >
                Support
              </h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
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
                  Trusted by 10K+ Students
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