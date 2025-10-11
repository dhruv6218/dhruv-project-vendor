"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ElectricBorder from "@/app/components/ElectricBorder";

const ORANGE = "#F97316";
const NAVY = "#1E3A8A";

export default function BlogSubmitPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function submit() {
    try {
      if (!title) {
        setToast("Please add a title.");
        return;
      }
      setLoading(true);
      // Simulate success locally (no uploads or API calls)
      await new Promise((res) => setTimeout(res, 700));
      router.push("/blog/submit/success");
    } catch {
      setToast("There was a problem. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 md:px-6 py-10">
      <header>
        <h1 className="text-3xl" style={{ fontFamily: "var(--font-geist)", fontWeight: 600 }}>Submit a Blog Idea</h1>
        <p className="text-sm text-[#475569] mt-2">Add a title, subject, name, company, and image. We&apos;ll review and publish.</p>
      </header>

      <div className="mt-6">
        <ElectricBorder color={ORANGE} speed={1} chaos={0.4} thickness={2}>
          <form className="p-4 rounded-[14px]" onSubmit={(e) => { e.preventDefault(); void submit(); }}>
            <Field label="Title *" value={title} onChange={setTitle} required />
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Subject" value={subject} onChange={setSubject} />
              <Field label="Name" value={name} onChange={setName} />
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Company" value={company} onChange={setCompany} />
              <div />
            </div>
            <div className="mt-3">
              <label className="block text-xs mb-1"><span>Image Upload (optional)</span></label>
              <input type="file" accept="image/*" onChange={(e)=> setFile(e.target.files?.[0] ?? null)} className="w-full text-sm px-3 py-2 rounded-xl border border-neutral-200/70" />
              {file && <p className="text-[11px] text-[#64748B] mt-1"><span>Selected: {file.name}</span></p>}
              <p className="text-[11px] text-[#64748B] mt-1"><span>Optional. JPG/PNG up to 5MB. This demo does not upload files.</span></p>
            </div>
            <button type="submit" disabled={loading} className="mt-4 text-sm px-4 py-2 rounded-full text-white hover:-translate-y-0.5 transition" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${NAVY})` }}>
              <span>{loading ? "Submitting..." : "Submit"}</span>
            </button>
          </form>
        </ElectricBorder>
      </div>

      <AnimateToast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}

function Field({ label, value, onChange, required, type, placeholder }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs mb-1">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full text-sm px-4 py-2 rounded-xl border border-neutral-200/70 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40" type={type||"text"} aria-required={required ? true : undefined} required={required} placeholder={placeholder} />
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
