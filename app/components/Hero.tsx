"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Lightning from "@/app/components/Lightning";
import { TEXT } from "@/lib/constants";
import { Button } from "./ui/Button";

export default function Hero() {
  const fg = TEXT;
  const sub = "#475569";

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6 pt-20 pb-10 md:pt-28 md:pb-12">
        {/* Hero content: Left copy, Right Phoenix logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl leading-tight tracking-tight"
              style={{ color: fg, fontFamily: "var(--font-geist)", fontWeight: 600 }}
            >
              <span>Vendor Infrastructure for a Trustworthy Future</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-2xl md:text-[28px] max-w-2xl font-medium"
              style={{ color: sub }}
            >
              <span>Prevent fraud. Onboard vendors with confidence. Compliance, speed and trust—powered by AI.</span>
            </motion.p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="/pricing">Start Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact?type=sales">Contact Sales</Link>
              </Button>
            </div>
          </div>

          {/* Right: Phoenix logo area with subline */}
          <div className="justify-self-center md:justify-self-end">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(249,115,22,0.25)" }}
              className="rounded-3xl border border-neutral-200/70 bg-[#0B0B0B] p-5 w-[320px] md:w-[360px] text-center"
              style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.2)" }}
            >
              <img
                src="/logo.svg"
                alt="Phoenix logo"
                className="h-28 w-auto mx-auto object-contain"
              />
              <p className="mt-3 text-[22px] font-semibold tracking-[1.2px]" style={{ color: "#FFFFFF" }}>
                <span>Empowering the Future</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Single Lightning accent (Home only) */}
      <div className="w-full h-[300px] md:h-[360px] relative">
        <Lightning hue={35} xOffset={0} speed={1} intensity={1} size={1} />
      </div>
    </section>
  );
}
