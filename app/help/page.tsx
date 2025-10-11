"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = { q: string; a: React.ReactNode };

const FAQS: FAQItem[] = [
  {
    q: "What is Ravono Vendor Compliance?",
    a: (
      <div className="space-y-2 text-[#475569]">
        <p className="text-sm">
          Ravono Vendor Compliance is a SaaS platform that helps businesses validate the authenticity and credibility of vendors and partners. It combines
          official data sources with AI-driven reasoning to produce accurate reports across PAN, GST, Aadhaar, Passport, MCA/CIN/DIN, and Bank verifications.
        </p>
        <p className="text-sm">Ideal for reducing fraud risk, ensuring compliance, and streamlining vendor onboarding.</p>
      </div>
    ),
  },
  {
    q: "How does the All-in-One verification process work?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Data upload: add CSV/ZIP or individual files in the Verification Hub.</li>
          <li>Processing: background jobs run for each verification type needed.</li>
          <li>AI reasoning: Perplexity analyzes raw outputs to produce a fraud score and reasoning summary.</li>
          <li>Report generation: COMPDFKIT builds a polished, branded PDF with consolidated results.</li>
          <li>Delivery: reports appear in your dashboard, support secure share links, and optional Google Drive export.</li>
        </ol>
        <p>One streamlined workflow for complete vendor validation.</p>
      </div>
    ),
  },
  {
    q: "What types of verifications does Ravono support?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>PAN Verification</li>
          <li>GST Verification</li>
          <li>Aadhaar Verification</li>
          <li>Passport Verification</li>
          <li>MCA/CIN/DIN Verification</li>
          <li>Bank Account Verification</li>
        </ul>
        <p className="text-xs">White‑label reports are available on plans priced at or above ₹2199.</p>
      </div>
    ),
  },
  {
    q: "How accurate are the verification reports?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Official API outputs from government or trusted third parties.</li>
          <li>AI reasoning flags inconsistencies and highlights risk indicators.</li>
          <li>Each report includes a 0–100 fraud score and a reasoning summary.</li>
        </ul>
        <p>While highly reliable, we recommend human review for critical decisions.</p>
      </div>
    ),
  },
  {
    q: "Can I share verification reports with clients or partners?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Secure, signed, expiring share links.</li>
          <li>Configurable permissions (view‑only, download enabled).</li>
          <li>White‑labeled PDFs on eligible plans replace Ravono branding with yours.</li>
        </ul>
      </div>
    ),
  },
  {
    q: "What are the plan limits for verifications?",
    a: (
      <div className="space-y-3 text-[#475569] text-sm">
        <table className="w-full text-left border-separate border-spacing-y-1">
          <thead>
            <tr className="text-xs text-[#0F172A]/70">
              <th className="px-3 py-1">Plan</th>
              <th className="px-3 py-1">Monthly Verifications</th>
              <th className="px-3 py-1">Features</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white/60 backdrop-blur">
              <td className="px-3 py-2">Free</td>
              <td className="px-3 py-2">5</td>
              <td className="px-3 py-2">Email‑only reports</td>
            </tr>
            <tr className="bg-white/60 backdrop-blur">
              <td className="px-3 py-2">Freelancer ₹249</td>
              <td className="px-3 py-2">50</td>
              <td className="px-3 py-2">Full dashboard, PDF reports</td>
            </tr>
            <tr className="bg-white/60 backdrop-blur">
              <td className="px-3 py-2">Basic ₹999</td>
              <td className="px-3 py-2">250</td>
              <td className="px-3 py-2">Bulk upload, AI insights</td>
            </tr>
            <tr className="bg-white/60 backdrop-blur">
              <td className="px-3 py-2">Mid ₹2199</td>
              <td className="px-3 py-2">500</td>
              <td className="px-3 py-2">White‑label PDF, team management</td>
            </tr>
            <tr className="bg-white/60 backdrop-blur">
              <td className="px-3 py-2">Advanced ₹2999</td>
              <td className="px-3 py-2">1000</td>
              <td className="px-3 py-2">Priority support, API access</td>
            </tr>
            <tr className="bg-white/60 backdrop-blur">
              <td className="px-3 py-2">Enterprise</td>
              <td className="px-3 py-2">Custom</td>
              <td className="px-3 py-2">Multi‑tenant, SLA, admin controls</td>
            </tr>
          </tbody>
        </table>
        <p>Exceeding limits prompts an upgrade or add‑on credits.</p>
      </div>
    ),
  },
  {
    q: "How does Bulk Upload work?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Upload CSV/ZIP with multiple vendor records.</li>
          <li>Map your columns to required verification inputs.</li>
          <li>Enqueue jobs in bulk.</li>
          <li>Track progress and statuses in the dashboard.</li>
          <li>Download a consolidated summary or batch PDF.</li>
        </ol>
        <p className="text-xs">Automatic retries with backoff are applied. Failures appear for review in a dead‑letter queue.</p>
      </div>
    ),
  },
  {
    q: "What payment methods are supported?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <p>Subscriptions and payments are processed via Cosmic Payments.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Major cards and supported local payment methods where available.</li>
          <li>Invoices and receipts are accessible in your billing dashboard.</li>
        </ul>
      </div>
    ),
  },
  {
    q: "How secure is my data on Ravono?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>RBAC with least‑privilege access.</li>
          <li>Optional 2FA for admins and high‑security users.</li>
          <li>Encryption in transit and at rest for sensitive data.</li>
          <li>Comprehensive audit logs and monitoring.</li>
          <li>Optional IP allowlisting and session controls for enterprise tenants.</li>
        </ul>
      </div>
    ),
  },
  {
    q: "Can I integrate Ravono with other tools?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Google Drive: auto‑export reports to a connected folder.</li>
          <li>Email & webhooks: notifications when reports are ready.</li>
          <li>API access: available on Advanced/Enterprise plans.</li>
          <li>Chatbot: optional support bot on the public site.</li>
        </ul>
      </div>
    ),
  },
  {
    q: "How do I submit feedback, blogs, or testimonials?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Blog: submit via the Blog Submit page for moderation.</li>
          <li>Testimonials: 4+ star ratings appear publicly; others are reviewed internally.</li>
          <li>General feedback: use the contact form or support widget.</li>
        </ul>
      </div>
    ),
  },
  {
    q: "What is the SLA for manual verification orders?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <p>
          The ₹24,999 service order (100 manual verifications) typically completes in 5–7 business days. Track progress in the Service Team Dashboard. You&apos;ll be
          notified of delays or escalations via email and in‑app notifications.
        </p>
      </div>
    ),
  },
  {
    q: "How does Ravono handle errors or failed verifications?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>Automatic retries with exponential backoff and jitter.</li>
          <li>Persistent failures go to a dead‑letter queue for service‑team review.</li>
          <li>Clear notifications and guidance are provided to users.</li>
        </ul>
      </div>
    ),
  },
  {
    q: "Can I customize reports for my brand?",
    a: (
      <div className="space-y-2 text-[#475569] text-sm">
        <p>
          Yes. Plans priced at or above ₹2199 include white‑labeling with your logo, company name, and footer details. Shareable links remain secure and signed even
          with white‑label branding.
        </p>
      </div>
    ),
  },
];

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => FAQS.filter((f) => f.q.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-medium">Help Center</h1>
      <p className="text-sm text-[#475569] mt-2">Search our FAQs or browse common topics.</p>

      <div className="mt-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search questions" className="w-full text-sm px-4 py-2 rounded-xl border border-neutral-200/70" />
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((f, idx) => (
          <Accordion key={idx} title={f.q}>
            {typeof f.a === "string" ? <p className="text-sm text-[#475569]">{f.a}</p> : f.a}
          </Accordion>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-2xl border border-neutral-200/70 bg-white/60 backdrop-blur">
        <p className="text-sm text-[#0F172A]">
          <span>Still need help? Email </span>
          <a className="underline" href="mailto:ravonoagency@gmail.com">ravonoagency@gmail.com</a>
          <span> or </span>
          <a className="underline" href="mailto:ravonoagency06@gmail.com">ravonoagency06@gmail.com</a>
          <span>. Urgent? WhatsApp </span>
          <a className="underline" href="https://wa.me/919034950792" target="_blank" rel="noopener noreferrer">+91 90349 50792</a>
          <span>.</span>
        </p>
      </div>
    </div>
  );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-neutral-200/70 bg-white/60 backdrop-blur">
      <button onClick={() => setOpen((o) => !o)} className="w-full text-left px-4 py-3" aria-expanded={open} aria-controls={`panel-${title}`}>
        <span className="text-sm font-medium">{title}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={`panel-${title}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.2, 0.9, 0.35, 1] }}>
            <div className="px-4 pb-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
