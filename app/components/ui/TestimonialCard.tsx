"use client";

import React from "react";
import { motion } from "framer-motion";

export type TestimonialCardProps = {
  name: string;
  role: string;
  quote: string;
  rating?: number; // 0-5
};

export default function TestimonialCard({ name, role, quote, rating = 5 }: TestimonialCardProps) {
  return (
    <motion.article whileHover={{ y: -3 }} transition={{ duration: 0.15 }} className="rounded-2xl border border-neutral-200/70 bg-white/70 backdrop-blur p-4">
      <div>
        <p className="text-sm" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}><span>{name}</span></p>
        <p className="text-[11px] text-[#64748B]"><span>{role}</span></p>
      </div>
      <div className="mt-2 text-[#F59E0B] text-sm" aria-label={`Rating ${rating} of 5`}>
        {"★".repeat(Math.max(0, Math.min(5, rating)))}
        {"☆".repeat(5 - Math.max(0, Math.min(5, rating)))}
      </div>
      <p className="text-xs text-[#475569] mt-2"><span>“{quote}”</span></p>
    </motion.article>
  );
}
