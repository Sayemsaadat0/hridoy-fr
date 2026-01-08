"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Send,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const ContactPageContainer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    
    // Show success toast
    toast.success("Message sent successfully! We'll get back to you soon.");
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      details: "",
    });
  };

  // Multiple locations - commented out for now
  // const offices = [
  //   {
  //     id: "1",
  //     location: "Bogura",
  //     title: "BANGLADESH OFFICE",
  //     address: "123, Education Street, Bogura, Bangladesh",
  //     phone: "+880 1234 567 890",
  //     email: "bogura@biologyaddabogura.com",
  //     mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.123456789!2d89.3700!3d24.8500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdfb8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sBogura!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd",
  //   },
  //   {
  //     id: "2",
  //     location: "Dhaka",
  //     title: "DHAKA OFFICE",
  //     address: "456, Academic Avenue, Dhaka, Bangladesh",
  //     phone: "+880 1234 567 891",
  //     email: "dhaka@biologyaddabogura.com",
  //     mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.123456789!2d90.4000!3d23.8100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sDhaka!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd",
  //   },
  //   {
  //     id: "3",
  //     location: "Chittagong",
  //     title: "CHITTAGONG OFFICE",
  //     address: "789, Learning Lane, Chittagong, Bangladesh",
  //     phone: "+880 1234 567 892",
  //     email: "chittagong@biologyaddabogura.com",
  //     mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.123456789!2d91.8300!3d22.3300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad27b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sChittagong!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd",
  //   },
  //   {
  //     id: "4",
  //     location: "Sylhet",
  //     title: "SYLHET OFFICE",
  //     address: "321, Study Street, Sylhet, Bangladesh",
  //     phone: "+880 1234 567 893",
  //     email: "sylhet@biologyaddabogura.com",
  //     mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.123456789!2d91.8700!3d24.9000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375055b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sSylhet!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd",
  //   },
  // ];

  // Single location details
  const location = {
    name: "Biology adda Bogura",
    address: "Near Bogura City College",
    phone: "01518390674",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d640.0361150940422!2d89.37502741344126!3d24.84365631153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc55c94cdd406f%3A0x9cd198efb4bb8937!2sBiology%20adda%20Bogura!5e0!3m2!1sen!2sbd!4v1767867879841!5m2!1sen!2sbd",
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hr-green-toxic/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-hr-green-light/4 rounded-full blur-[80px]" />
      </div>

      {/* Section 1: Hero Section */}
      <section className="relative pt-20">
        <div className="hr-container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className="text-hr-white font-hr-800 "
              style={{ fontSize: "var(--text-hr-regular-50)" }}
            >
              <span className="text-hr-green-toxic">Contact</span> Us
            </h1>
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              Get in touch with us. We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Contact Form and Details */}
      <section className="relative py-10 lg:py-16">
        <div className="hr-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
        
              {/* Contact Info Cards */}
              <div className="space-y-4 mb-8">
              <h2
                className="text-hr-white font-hr-800 mb-8"
                style={{ fontSize: "var(--text-hr-regular-40)" }}
              >
                Get in <span className="text-hr-green-toxic">Touch</span>
              </h2>
                {/* Location */}
                <div className="rounded-2xl border border-hr-white/15 bg-hr-black/50 backdrop-blur-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-hr-green-toxic/10 border border-hr-green-toxic/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-hr-green-toxic" />
                    </div>
                    <div>
                      <p
                        className="text-hr-white font-hr-700 block mb-1"
                        style={{ fontSize: "var(--text-hr-regular-18)" }}
                      >
                        {location.name}
                      </p>
                      <p
                        className="text-hr-gray font-hr-400"
                        style={{ fontSize: "var(--text-hr-regular-14)" }}
                      >
                        {location.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="rounded-2xl border border-hr-white/15 bg-hr-black/50 backdrop-blur-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-hr-green-toxic/10 border border-hr-green-toxic/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-hr-green-toxic" />
                    </div>
                    <div>
                      <a
                        href="tel:+8801518390674"
                        className="text-hr-white font-hr-700 block mb-1 hover:text-hr-green-toxic transition-colors"
                        style={{ fontSize: "var(--text-hr-regular-18)" }}
                      >
                        {location.phone}
                      </a>
                      <p
                        className="text-hr-gray font-hr-400"
                        style={{ fontSize: "var(--text-hr-regular-14)" }}
                      >
                        TALK TO AN EXPERT
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-hr-white/15 bg-hr-black/50 backdrop-blur-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-hr-green-toxic/10 border border-hr-green-toxic/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-hr-green-toxic" />
                    </div>
                    <div>
                      <a
                        href="mailto:info@biologyaddabogura.com"
                        className="text-hr-white font-hr-700 block mb-1 hover:text-hr-green-toxic transition-colors"
                        style={{ fontSize: "var(--text-hr-regular-18)" }}
                      >
                        info@biologyaddabogura.com
                      </a>
                      <p
                        className="text-hr-gray font-hr-400"
                        style={{ fontSize: "var(--text-hr-regular-14)" }}
                      >
                        SEND AN EMAIL
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="rounded-2xl border border-hr-white/15 bg-hr-black/50 backdrop-blur-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-hr-green-toxic/10 border border-hr-green-toxic/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-hr-green-toxic" />
                    </div>
                    <div>
                      <p
                        className="text-hr-white font-hr-700 mb-1"
                        style={{ fontSize: "var(--text-hr-regular-18)" }}
                      >
                        Mon - Fri: 9:00am - 7:00pm
                      </p>
                      <p
                        className="text-hr-gray font-hr-400"
                        style={{ fontSize: "var(--text-hr-regular-14)" }}
                      >
                        BUSINESS HOUR
                      </p>
                    </div>
                  </div>
                </div>
              </div>

         
              {/* Social Media */}
              <div className="flex items-center gap-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Instagram, href: "#" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 rounded-lg border border-hr-white/20 bg-hr-black/50 flex items-center justify-center text-hr-gray hover:text-hr-green-toxic hover:border-hr-green-toxic/30 transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2
                className="text-hr-white font-hr-800 mb-8"
                style={{ fontSize: "var(--text-hr-regular-40)" }}
              >
                Send us a <span className="text-hr-green-toxic">message</span>
              </h2>
              <div className="rounded-3xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm p-8 lg:p-10 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name & Last Name */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-hr-white font-hr-600 uppercase"
                        style={{ fontSize: "var(--text-hr-regular-12)" }}
                      >
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full h-12 bg-hr-black/50 border-hr-white/20 text-hr-white placeholder:text-hr-gray focus:border-hr-green-toxic focus:ring-hr-green-toxic/20 transition-all"
                        placeholder="FIRST NAME"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-hr-white font-hr-600 uppercase"
                        style={{ fontSize: "var(--text-hr-regular-12)" }}
                      >
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full h-12 bg-hr-black/50 border-hr-white/20 text-hr-white placeholder:text-hr-gray focus:border-hr-green-toxic focus:ring-hr-green-toxic/20 transition-all"
                        placeholder="LAST NAME"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-hr-white font-hr-600 uppercase"
                        style={{ fontSize: "var(--text-hr-regular-12)" }}
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-12 bg-hr-black/50 border-hr-white/20 text-hr-white placeholder:text-hr-gray focus:border-hr-green-toxic focus:ring-hr-green-toxic/20 transition-all"
                        placeholder="EMAIL ADDRESS"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-hr-white font-hr-600 uppercase"
                        style={{ fontSize: "var(--text-hr-regular-12)" }}
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full h-12 bg-hr-black/50 border-hr-white/20 text-hr-white placeholder:text-hr-gray focus:border-hr-green-toxic focus:ring-hr-green-toxic/20 transition-all"
                        placeholder="PHONE NUMBER"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-hr-white font-hr-600 uppercase"
                      style={{ fontSize: "var(--text-hr-regular-12)" }}
                    >
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full h-12 bg-hr-black/50 border-hr-white/20 text-hr-white placeholder:text-hr-gray focus:border-hr-green-toxic focus:ring-hr-green-toxic/20 transition-all"
                      placeholder="SUBJECT"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="details"
                      className="text-hr-white font-hr-600 uppercase"
                      style={{ fontSize: "var(--text-hr-regular-12)" }}
                    >
                      Details
                    </Label>
                    <Textarea
                      id="details"
                      name="details"
                      required
                      value={formData.details}
                      onChange={handleChange}
                      rows={6}
                      className="w-full bg-hr-black/50 min-h-40 border-hr-white/20 text-hr-white placeholder:text-hr-gray focus:border-hr-green-toxic focus:ring-hr-green-toxic/20 resize-none transition-all"
                      placeholder="DETAILS"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-linear-to-r from-hr-green-toxic to-hr-green-light hover:from-hr-green-toxic/95 hover:to-hr-green-light/95 text-hr-white rounded-xl transition-all shadow-lg shadow-hr-green-toxic/10 hover:shadow-hr-green-toxic/20 hover:scale-[1.02] transform font-hr-600 flex items-center justify-center gap-2"
                    style={{ fontSize: "var(--text-hr-regular-16)" }}
                  >
                    SUBMIT
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Full Width Map */}
      <section className="relative py-10 lg:py-16">
        <div className="hr-container relative z-10">
          {/* Map - Full Width */}
          <motion.div
            className="rounded-2xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <iframe
                src={location.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </motion.div>

          {/* Multiple locations - commented out for now */}
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={office.id}
                className="rounded-2xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm overflow-hidden hover:border-hr-green-toxic/30 transition-all shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48 w-full">
                  <iframe
                    src={office.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-hr-green-toxic" />
                    <h3
                      className="text-hr-white font-hr-700"
                      style={{ fontSize: "var(--text-hr-regular-18)" }}
                    >
                      {office.title}
                    </h3>
                  </div>
                  
                  <p
                    className="text-hr-gray font-hr-400 mb-4 leading-relaxed"
                    style={{ fontSize: "var(--text-hr-regular-14)" }}
                  >
                    {office.address}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-hr-green-toxic flex-shrink-0" />
                      <a
                        href={`tel:${office.phone}`}
                        className="text-hr-gray font-hr-400 hover:text-hr-green-toxic transition-colors"
                        style={{ fontSize: "var(--text-hr-regular-14)" }}
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-hr-green-toxic flex-shrink-0" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-hr-gray font-hr-400 hover:text-hr-green-toxic transition-colors break-all"
                        style={{ fontSize: "var(--text-hr-regular-14)" }}
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default ContactPageContainer;

