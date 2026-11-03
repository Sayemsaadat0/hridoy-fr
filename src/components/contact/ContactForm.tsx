"use client";

import React, { useId, useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  details: string;
};

const EMPTY_FORM: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  details: "",
};

const labelClass = "text-hr-white font-hr-600 uppercase";
const labelStyle = { fontSize: "var(--text-hr-regular-12)" };
const fieldClass =
  "w-full bg-hr-black/50 border-hr-white/20 text-hr-white placeholder:text-hr-gray focus:border-hr-green-toxic focus:ring-hr-green-toxic/20 transition-all";

/**
 * Contact form that posts to `/api/contacts`. Used on the contact page and the home page;
 * input ids are unique per instance so both can render without clashing.
 */
const ContactForm = ({ className }: { className?: string }) => {
  const idPrefix = useId();
  const id = (name: keyof ContactFormData) => `${idPrefix}-${name}`;

  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await apiRequest("/api/contacts", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      toast.success("বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।");
      setFormData(EMPTY_FORM);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      toast.error(
        message.startsWith("phone")
          ? "সঠিক মোবাইল নম্বর দিন (যেমন 01XXXXXXXXX)।"
          : "বার্তা পাঠানো যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const textField = (
    name: Exclude<keyof ContactFormData, "details">,
    label: string,
    type: "text" | "email" | "tel" = "text"
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id(name)} className={labelClass} style={labelStyle}>
        {label}
      </Label>
      <Input
        id={id(name)}
        name={name}
        type={type}
        required
        value={formData[name]}
        onChange={handleChange}
        className={cn("h-12", fieldClass)}
        placeholder={label}
      />
    </div>
  );

  return (
    <div
      className={cn(
        "rounded-3xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm p-8 lg:p-10 shadow-xl",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {textField("firstName", "নামের প্রথম অংশ")}
          {textField("lastName", "নামের শেষ অংশ")}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {textField("email", "ইমেইল ঠিকানা", "email")}
          {textField("phone", "ফোন নম্বর", "tel")}
        </div>

        {textField("subject", "বিষয়")}

        <div className="space-y-2">
          <Label htmlFor={id("details")} className={labelClass} style={labelStyle}>
            বিস্তারিত
          </Label>
          <Textarea
            id={id("details")}
            name="details"
            required
            value={formData.details}
            onChange={handleChange}
            rows={6}
            className={cn("min-h-40 resize-none", fieldClass)}
            placeholder="বিস্তারিত লিখুন"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-linear-to-r from-hr-green-toxic to-hr-green-light hover:from-hr-green-toxic/95 hover:to-hr-green-light/95 text-hr-white rounded-xl transition-all shadow-lg shadow-hr-green-toxic/10 hover:shadow-hr-green-toxic/20 hover:scale-[1.02] transform font-hr-600 flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
          style={{ fontSize: "var(--text-hr-regular-16)" }}
        >
          {isSubmitting ? "পাঠানো হচ্ছে…" : "পাঠান"}
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
