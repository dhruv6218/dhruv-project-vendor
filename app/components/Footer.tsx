"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTheme } from "@/app/components/ThemeProvider";

// color tokens available globally via inline styles where needed

export default function Footer() {
  const { theme } = useTheme();
  const baseBg = theme === "light" ? "bg-white" : "bg-[#0B1220]";
  const baseText = theme === "light" ? "text-[#0F172A]" : "text-white";
  const subText = theme === "light" ? "text-[#475569]" : "text-[#CBD5E1]";
  const borderCol = theme === "light" ? "border-neutral-200/70" : "border-white/10";

  return (
    <footer className={`${baseBg} ${baseText} border-t ${borderCol}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="Ravono Phoenix logo"
              className="h-7 w-7 rounded-md object-contain"
            />
            <p className="text-sm font-medium">Ravono Vendor Compliance</p>
          </div>
          <p className={`text-sm ${subText}`}>Vendor compliance made simple with AI and automation.</p>
        </div>

        {/* Company */}
        <div>
          <p className="text-sm font-medium">Company</p>
          <ul className={`mt-3 space-y-2 text-sm ${subText}`}>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <p className="text-sm font-medium">Product</p>
          <ul className={`mt-3 space-y-2 text-sm ${subText}`}>
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/service">Services</Link></li>
            <li><Link href="/manager">Manager</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="text-sm font-medium">Support</p>
          <ul className={`mt-3 space-y-2 text-sm ${subText}`}>
            <li><Link href="/help/faq">FAQ</Link></li>
            <li><Link href="/contact">Support Center</Link></li>
            <li><Link href="/unauthorized">Status & Access</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="text-sm font-medium">Legal</p>
          <ul className={`mt-3 space-y-2 text-sm ${subText}`}>
            <li><Link href="/legal/privacy">Privacy Policy</Link></li>
            <li><Link href="/legal/terms">Terms & Conditions</Link></li>
            <li><Link href="/legal/cookies">Cookies Policy</Link></li>
            <li><Link href="/legal/refund">Refund Policy</Link></li>
            <li><Link href="/legal/cancellation">Cancellation Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className={`border-t ${borderCol}`}>
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex items-center justify-between">
          <p className={`text-xs ${subText}`}>© 2025 Ravono Vendor Compliance. All Rights Reserved.</p>
          <p className={`text-xs ${subText}`}>Made for compliance-first teams.</p>
        </div>
      </div>
    </footer>
  );
}
