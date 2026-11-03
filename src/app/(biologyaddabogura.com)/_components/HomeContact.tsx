"use client";

import React from "react";
import { motion } from "motion/react";
import ContactForm from "@/components/contact/ContactForm";

const HomeContact = () => (
  <section id="contact" className="relative py-10 lg:py-16">
    <div className="hr-container">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-hr-white font-hr-800 mb-8 text-center"
          style={{ fontSize: "var(--text-hr-regular-40)" }}
        >
          আমাদের <span className="text-hr-green-toxic">বার্তা পাঠান</span>
        </h2>
        <ContactForm />
      </motion.div>
    </div>
  </section>
);

export default HomeContact;
