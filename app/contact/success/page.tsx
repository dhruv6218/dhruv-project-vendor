"use client";

import Link from "next/link";

export default function ContactSuccess() {
  return (
    <div className="mx-auto max-w-xl px-4 md:px-6 py-16 text-center">
      <h1 className="text-2xl font-medium">Thanks! Your message has been sent.</h1>
      <p className="text-sm text-[#475569] mt-2">Our team will get back to you shortly.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link href="/" className="px-4 py-2 rounded-full text-sm border border-neutral-200/70">Go Home</Link>
        <Link href="/pricing" className="px-4 py-2 rounded-full text-sm text-white" style={{ background: "linear-gradient(135deg, #F97316, #1E3A8A)" }}>View Pricing</Link>
      </div>
    </div>
  );
}
