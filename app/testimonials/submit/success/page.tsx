"use client";

import Link from "next/link";

export default function TestimonialSubmitSuccess() {
  return (
    <div className="mx-auto max-w-xl px-4 md:px-6 py-16 text-center">
      <h1 className="text-2xl font-medium">Thank you for your testimonial!</h1>
      <p className="text-sm text-[#475569] mt-2">We’ve received your feedback. 4+ star testimonials are typically published after review.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link href="/testimonials" className="px-4 py-2 rounded-full text-sm border border-neutral-200/70">Back to Testimonials</Link>
        <Link href="/" className="px-4 py-2 rounded-full text-sm text-white" style={{ background: "linear-gradient(135deg, #F97316, #1E3A8A)" }}>Go Home</Link>
      </div>
    </div>
  );
}
