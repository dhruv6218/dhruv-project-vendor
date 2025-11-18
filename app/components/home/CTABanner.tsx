"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "../ui/Button";

export default function CTABanner() {
  return (
    <section aria-label="Primary call to action" className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <div className="rounded-2xl border border-neutral-200/70 bg-white/80 backdrop-blur p-6 text-center shadow-[0_20px_60px_rgba(30,58,138,0.15)]">
        <p className="text-sm" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>
          <span>Ready to experience hassle-free vendor compliance?</span>
        </p>
        <Button asChild className="mt-4" size="default">
          <Link
            href="/dashboard"
            aria-label="Get Started Free"
          >
            <Icon icon="mdi:rocket-launch" width={18} className="mr-2" />
            Get Started Free
          </Link>
        </Button>
      </div>
    </section>
  );
}
