"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const baseBg = "bg-white";
  const baseText = "text-[#0F172A]";
  const subText = "text-[#475569]";
  const borderCol = "border-neutral-200/70";

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
