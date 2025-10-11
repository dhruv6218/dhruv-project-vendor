"use client";

import { motion } from "framer-motion";
import React from "react";
import { Icon } from "@iconify/react";

export type FeatureCardProps = {
  icon?: string;
  title: string;
  description: string;
  href?: string;
};

export default function FeatureCard({ icon = "mdi:star-outline", title, description, href }: FeatureCardProps) {
  const content = (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="p-4 rounded-2xl border border-neutral-200/70 bg-white/70 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-white border border-neutral-200/70">
          <Icon icon={icon} width={20} />
        </div>
        <p className="text-sm" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}><span>{title}</span></p>
      </div>
      <p className="text-xs text-[#475569] mt-2"><span>{description}</span></p>
      {href && <span className="inline-block mt-3 text-xs text-[#1E3A8A] underline">Learn more</span>}
    </motion.div>
  );
  if (href) {
    return <a href={href} className="block">{content}</a>;
  }
  return content;
}
