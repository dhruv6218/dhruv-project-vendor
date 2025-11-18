"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/Button";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-12">
      <div className="rounded-3xl p-6 md:p-10 border border-neutral-200/70 bg-white/60 backdrop-blur" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
        <h3 className="text-xl" style={{ fontFamily: "var(--font-geist)", fontWeight: 600 }}>Start your journey. Work with perfection. Manual relief available.</h3>
        <p className="text-sm mt-1 text-[#475569]">Our service team supports every step.</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link href="/pricing">Get Started Free</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact?type=sales">Talk to Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
