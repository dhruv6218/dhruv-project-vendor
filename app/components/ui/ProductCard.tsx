"use client";

import React from "react";
import { motion } from "framer-motion";

export type ProductCardProps = {
  name: string;
  price: string;
  description: string;
  onClick?: () => void;
  href?: string;
};

export default function ProductCard({ name, price, description, onClick, href }: ProductCardProps) {
  const card = (
    <motion.article whileHover={{ y: -3 }} transition={{ duration: 0.15 }} className="rounded-2xl border border-neutral-200/70 bg-white/70 backdrop-blur p-4">
      <div className="h-24 rounded-xl bg-gradient-to-br from-orange-200 via-white to-blue-200" aria-hidden />
      <h4 className="text-sm mt-3" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}><span>{name}</span></h4>
      <p className="text-xs text-[#475569] mt-1"><span>{description}</span></p>
      <div className="mt-2 text-xs text-[#0F172A]"><span>{price}</span></div>
    </motion.article>
  );
  if (href) return <a href={href}>{card}</a>;
  if (onClick) return <button onClick={onClick} className="text-left w-full">{card}</button>;
  return card;
}
