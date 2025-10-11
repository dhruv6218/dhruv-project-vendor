"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ElectricBorder from "@/app/components/ElectricBorder";

const ORANGE = "#F97316";
const NAVY = "#1E3A8A";

export default function ContactPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("General Question");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function submit() {
    if (!fullName || !email || !message || !/.+@.+\..+/.test(email)) {
      setToast("Please complete the required fields with a valid email.");
      return;
    }
    try {
      setLoading(true);
      // Simulate a successful submit locally (no backend)
      await new Promise((res) => setTimeout(res, 800));
      router.push("/contact/success");
    } catch {
      setToast("There was a problem. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 py-10">
      {/* 1️⃣ Hero / Intro */}
      <div className="flex items-start gap-4">
        <img
          src="/logo.svg"
          alt="Ravono orange phoenix logo"
          className="h-12 w-auto rounded object-contain"
        />
        <div>
          <h1 className="text-3xl" style={{ fontFamily: "var(--font-geist)", fontWeight: 600 }}>Get in Touch with Us</h1>
          <p className="text-sm text-[#475569] mt-1">Have questions, feedback, or need a demo? Our team is ready to assist you. Fill the form below, and we’ll get back to you promptly.</p>
          <div className="mt-2 text-[11px] text-[#64748B] space-y-1">
            <p><span>We operate globally and remotely, so email is the fastest way to reach us.</span></p>
            <p><span>Response time: Typically within 24 hours on business days.</span></p>
          </div>
        </div>
      </div>

      {/* 2️⃣ Contact Form */}
      <div className="mt-6">
        <ElectricBorder color={ORANGE} speed={1} chaos={0.5} thickness={2}>
          <form className="p-4 rounded-[14px] grid grid-cols-1 gap-3" onSubmit={(e) => { e.preventDefault(); void submit(); }}>
            <Field label="Full Name *" value={fullName} onChange={setFullName} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Email Address *" type="email" value={email} onChange={setEmail} required />
              <Field label="Company Name / Organization" value={company} onChange={setCompany} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Phone Number" type="tel" value={phone} onChange={setPhone} />
              <div>
                <label className="block text-xs mb-1"><span>Subject / Inquiry Type</span></label>
                <select value={inquiryType} onChange={(e)=> setInquiryType(e.target.value)} className="w-full text-sm px-4 py-2 rounded-xl border border-neutral-200/70 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40">
                  <option>General Question</option>
                  <option>Product Inquiry</option>
                  <option>Enterprise Demo Request</option>
                  <option>Technical Support</option>
                  <option>Feedback / Suggestion</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1"><span>Message / Description *</span></label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full h-40 text-sm px-4 py-2 rounded-xl border border-neutral-200/70 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40" aria-required required />
              <div className="mt-1 text-[11px] text-[#64748B] space-y-1">
                <p><span>All fields marked with * are required.</span></p>
                <p><span>Your information is safe with us. Read our Privacy Policy for details.</span></p>
                <p><span>After submission, you will receive a confirmation email.</span></p>
              </div>
            </div>
            <div className="mt-1">
              <button type="submit" disabled={loading} className="text-sm px-4 py-2 rounded-full text-white hover:-translate-y-0.5 transition" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${NAVY})` }}>{loading ? "Submitting..." : "Submit Inquiry"}</button>
            </div>
          </form>
        </ElectricBorder>
      </div>

      {/* 3️⃣ Additional Contact Information */}
      <section className="mt-8 rounded-2xl border border-neutral-200/70 bg-white/60 backdrop-blur p-4">
        <h2 className="text-sm font-medium">Additional Contact Information</h2>
        <div className="mt-2 text-xs text-[#475569] space-y-1">
          <p><span>Support: </span><a className="underline" href="mailto:ravonoagency@gmail.com">ravonoagency@gmail.com</a></p>
          <p><span>Sales / Enterprise: </span><a className="underline" href="mailto:ravonoagency06@gmail.com">ravonoagency06@gmail.com</a></p>
          <p><span>Phone support: WhatsApp only</span></p>
          <p><span>We prioritize all enterprise inquiries. For urgent issues, use the email listed above.</span></p>
          <p><span>Follow us on LinkedIn for product updates and news.</span></p>
        </div>
      </section>

      {/* 4️⃣ FAQ / Quick Help */}
      <section className="mt-6 rounded-2xl border border-neutral-200/70 bg-white/60 backdrop-blur p-4">
        <h2 className="text-sm font-medium">Need help faster?</h2>
        <div className="mt-2 text-xs text-[#475569] space-y-1">
          <p><span>Check our </span><a className="underline" href="/help/faq">Help Center or FAQ</a><span>.</span></p>
          <p><span>For integration queries or API documentation, visit our </span><a className="underline" href="/service">Docs Page</a><span>.</span></p>
        </div>
      </section>

      {/* 5️⃣ Security / Trust Note */}
      <section className="mt-6 rounded-2xl border border-neutral-200/70 bg-white/60 backdrop-blur p-4">
        <h2 className="text-sm font-medium">Security & Trust</h2>
        <div className="mt-2 text-xs text-[#475569] space-y-1">
          <p><span>All messages are encrypted in transit.</span></p>
          <p><span>We never share your personal information with third parties.</span></p>
        </div>
      </section>

      <AnimateToast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}

function Field({ label, value, onChange, required, type }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string }) {
  return (
    <div>
      <label className="block text-xs mb-1">{label}</label>
      <input aria-required={required ? true : undefined} required={required} type={type || "text"} value={value} onChange={(e) => onChange(e.target.value)} className="w-full text-sm px-4 py-2 rounded-xl border border-neutral-200/70 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40" />
    </div>
  );
}

function AnimateToast({ message, onDone }: { message: string | null; onDone: () => void }) {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm text-white"
      style={{ background: "#0F172A" }}
      onAnimationComplete={() => setTimeout(onDone, 2000)}
    >
      <span>{message}</span>
    </motion.div>
  );
}
