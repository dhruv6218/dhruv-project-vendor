"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ElectricBorder from "@/app/components/ElectricBorder";

const ORANGE = "#F97316";
const NAVY = "#1E3A8A";

export default function TestimonialSubmitPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function submit() {
    if (!title) {
      setToast("Please enter a title.");
      return;
    }
    try {
      setLoading(true);
      // Simulate success locally (no API calls)
      await new Promise((res) => setTimeout(res, 700));
      router.push("/testimonials/submit/success");
    } catch {
      setToast("There was a problem. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 md:px-6 py-10">
      <header>
        <h1 className="text-3xl" style={{ fontFamily: "var(--font-geist)", fontWeight: 600 }}>Submit a Testimonial</h1>
        <p className="text-sm text-[#475569] mt-2">Share your experience. Title, subject, name, company, and rating help us highlight your story.</p>
      </header>

      <div className="mt-6">
        <ElectricBorder color={ORANGE} speed={1} chaos={0.4} thickness={2}>
          <form className="p-4 rounded-[14px] space-y-3" onSubmit={(e) => { e.preventDefault(); void submit(); }}>
            <Field label="Title *" value={title} onChange={setTitle} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Subject" value={subject} onChange={setSubject} />
              <Field label="Name" value={name} onChange={setName} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Company" value={company} onChange={setCompany} />
              <div className="flex items-center gap-2">
                <label className="text-xs">Rating</label>
                <StarPicker value={rating} onChange={setRating} />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1">Review (optional)</label>
              <textarea value={message} onChange={(e)=>setMessage(e.target.value)} className="w-full h-28 text-sm px-4 py-2 rounded-xl border border-neutral-200/70 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40" placeholder="Share a few words about your experience" />
            </div>
            <button type="submit" disabled={loading} className="text-sm px-4 py-2 rounded-full text-white hover:-translate-y-0.5 transition" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${NAVY})` }}>{loading ? "Submitting..." : "Submit"}</button>
          </form>
        </ElectricBorder>
      </div>

      <AnimateToast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}

function Field({ label, value, onChange, required, type }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string }) {
  return (
    <div>
      <label className="block text-xs mb-1">{label}</label>
      <input type={type || "text"} value={value} onChange={(e) => onChange(e.target.value)} className="w-full text-sm px-4 py-2 rounded-xl border border-neutral-200/70 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40" aria-required={required ? true : undefined} required={required} />
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1;
        const active = idx <= value;
        return (
          <button type="button" key={idx} onClick={() => onChange(idx)} aria-label={`Rate ${idx}`}
            className="p-0.5 rounded hover:scale-105 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? ORANGE : "#E2E8F0"} xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </button>
        );
      })}
    </div>
  );
}

function AnimateToast({ message, onDone }: { message: string | null; onDone: () => void }) {
  if (!message) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm text-white" style={{ background: "#0F172A" }} onAnimationComplete={() => setTimeout(onDone, 1800)}>
      <span>{message}</span>
    </motion.div>
  );
}
