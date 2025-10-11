"use client";

import React from "react";
import { motion } from "framer-motion";

export type PricingCardProps = {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta?: string;
  href?: string;
  popular?: boolean;
};

export default function PricingCard({ name, price, period = "month", features, cta = "Get started", href, popular }: PricingCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="relative p-5 rounded-2xl border border-neutral-200/70 bg-white/70 backdrop-blur">
      {popular && <span className="absolute -top-2 right-4 text-[10px] px-2 py-1 rounded-full text-white" style={{ background: "#F97316" }}>Most popular</span>}
      <p className="text-sm font-medium">{name}</p>
      <p className="text-lg mt-1" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>{price}<span className="text-xs text-[#64748B]">/{period}</span></p>
      <ul className="mt-3 space-y-2 text-xs text-[#0F172A]">
        {features.map(f => (
          <li key={f} className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {href && <a href={href} className="mt-4 w-full text-center block text-sm px-4 py-2 rounded-full text-white" style={{ background: "linear-gradient(135deg, #F97316, #1E3A8A)" }}>{cta}</a>}
    </motion.div>
  );
}
