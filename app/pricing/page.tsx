"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ElectricBorder from "@/app/components/ElectricBorder";
import { useI18n } from "@/app/components/i18n/LanguageProvider";

type Billing = "monthly" | "yearly";

type PlanItem = {
  key: "freelancer" | "basic" | "manager" | "admin" | "service";
  name: string;
  priceM: number | string;
  priceY: number | string;
  desc: string;
  features: string[];
  cta: string;
};

const PLANS: PlanItem[] = [
  { key: "freelancer", name: "Freelancer Plan – ₹399/month", priceM: 399, priceY: 399 * 12, desc: "Best for: Freelancers, solo professionals, consultants.", features: [
    "Get 25 verifications per month for all document types (GST, PAN, Aadhaar, Bank, Passport, MCA/CIN, DIN).",
    "Instant branded PDF report downloads for every verification.",
    "Basic AI fraud analysis to spot common compliance risks and mismatches.",
    "Email support with 24–48h response.",
    "1 user login (ideal for individuals).",
    "No hidden fees, no setup cost. Cancel anytime, upgrade instantly.",
    "Data securely stored; access history anytime."
  ], cta: "Choose Freelancer" },
  { key: "basic", name: "Small Business Plan – ₹1,199/month", priceM: 1199, priceY: 1199 * 12, desc: "Best for: Startups, small teams, growing agencies.", features: [
    "100 verifications/month, all document types supported.",
    "Advanced AI fraud analysis and risk scoring.",
    "Bulk upload via CSV (up to 100 rows in one click).",
    "White-label report with your own logo branding.",
    "3 team members included. Role management enabled.",
    "Priority email support (same/next business day).",
    "Longer data retention for your records (1 year)."
  ], cta: "Choose Small Business" },
  { key: "manager", name: "Professional Plan – ₹2,199/month", priceM: 2199, priceY: 2199 * 12, desc: "Best for: Businesses with multi-person compliance, regular onboarding/workflow needs.", features: [
    "Up to 300 verifications/month.",
    "Bulk upload up to 500 rows at once. Fast turnaround.",
    "Full branding: change logo, company name, and colors on all reports.",
    "Team collaboration with 5 users. Assign roles and monitor activity.",
    "API access (1,000 calls/month) for integration with your own systems.",
    "Advanced analytics dashboard for tracking usage and risks.",
    "Email & phone support with expert guidance.",
    "2 years of data retention."
  ], cta: "Choose Professional" },
  { key: "admin", name: "Business Plan – ₹3,999/month", priceM: 3999, priceY: 3999 * 12, desc: "Best for: Large organizations, consultancies, BPOs.", features: [
    "1,000 verifications/month. All document types, compliance checks.",
    "Highest-level AI fraud detection algorithms.",
    "Bulk upload: up to 2,000 rows.",
    "Team feature: 15 members, advanced permissions, centralized credit pool.",
    "Complete white-labeling (logo, footer, custom disclaimers, domain).",
    "Webhook integrations for automated workflows.",
    "Dedicated account manager & phone priority support.",
    "3 years data retention for audits and legal needs."
  ], cta: "Choose Business" },
  { key: "service", name: "Enterprise Plan – Custom Pricing", priceM: "Custom", priceY: "Custom", desc: "Made for: MNCs, multi-office firms, banks, enterprise procurement.", features: [
    "Unlimited verifications, infinite team members, custom onboarding, and reporting process.",
    "All document types, compliance modules, custom field mapping.",
    "Dedicated, advanced integrations (SSO, SAML, custom API/webhook, ERP).",
    "Dedicated SLA, security certifications, and audit logs.",
    "Dedicated support team, 24x7, escalation protocols.",
    "Custom data retention and compliance options as per your need.",
    "Custom white-labeling, advanced analytics, full automation."
  ], cta: "Talk to Sales" },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      {/* Hero */}
      <h1 className="text-3xl font-medium">{t("pricing.title")}</h1>
      <p className="text-base text-[#475569] mt-2">{t("pricing.subtitle")}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <Link href="#plans" className="text-sm px-4 py-2 rounded-full text-white" style={{ background: "linear-gradient(135deg, #F97316, #1E3A8A)" }}>{t("pricing.tryFree")}</Link>
        <Link href="/contact" className="text-sm px-4 py-2 rounded-full border border-neutral-200/70">{t("pricing.contactSales")}</Link>
      </div>
      <div className="mt-3 text-xs text-[#64748B] space-y-1">
        <p><span>All plans include AI-powered verification, secure reports, and access to our dashboard.</span></p>
        <p><span>No hidden fees, monthly & yearly options available.</span></p>
      </div>

      {/* Toggle */}
      <div className="mt-6 inline-flex items-center rounded-full border border-neutral-200/70 p-1">
        <Toggle onClick={() => setBilling("monthly")} active={billing === "monthly"}>{t("pricing.monthly")}</Toggle>
        <Toggle onClick={() => setBilling("yearly")} active={billing === "yearly"}>{t("pricing.yearly")} <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-[#1E3A8A] text-white">{t("pricing.save")}</span></Toggle>
      </div>

      {/* Plans */}
      <div id="plans" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {PLANS.map((p) => {
          const inr = billing === "monthly" ? p.priceM : p.priceY;
          return (
            <ElectricBorder key={p.name} color="#F97316" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="p-5 rounded-[14px]">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-[#475569] mt-1">{p.desc}</p>
                <div className="mt-3 space-y-1">
                  <div className="text-sm"><span className="text-[#64748B] mr-1">INR:</span><span className="text-lg font-semibold">{typeof inr === 'number' ? `₹${inr}` : String(inr)}</span> <span className="text-xs text-[#475569]">/ {billing === "monthly" ? "month" : "year"}</span></div>
                  <div className="text-sm"><span className="text-[#64748B] mr-1">USD:</span><span className="text-lg font-semibold">—</span> <span className="text-xs text-[#475569]">/ {billing === "monthly" ? "month" : "year"}</span></div>
                </div>
                <ul className="mt-3 space-y-2 text-xs text-[#0F172A]">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {p.key === "service" ? (
                  <Link href="/contact" className="mt-4 w-full text-center block text-sm px-4 py-2 rounded-full text-white" style={{ background: "linear-gradient(135deg, #F97316, #FB923C)" }}>{p.cta}</Link>
                ) : (
                  <Link href="/dashboard" className="mt-4 w-full text-center block text-sm px-4 py-2 rounded-full text-white" style={{ background: "linear-gradient(135deg, #F97316, #FB923C)" }}>{p.cta}</Link>
                )}
              </motion.div>
            </ElectricBorder>
          );
        })}
      </div>

      {/* Benefits table */}
      <div className="mt-10 overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="py-2">{t("pricing.benefit")}</th>
              {PLANS.map((p) => (
                <th key={p.name} className="py-2">{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(() => {
              type Row = { label: string; key: string };
              const rows: Row[] = [
                { label: "Verifications/month", key: "verifs" },
                { label: "AI fraud analysis", key: "ai" },
                { label: "Bulk upload max rows", key: "bulk" },
                { label: "Branding / white‑label", key: "brand" },
                { label: "Team members included", key: "team" },
                { label: "API / Webhooks", key: "api" },
                { label: "Support level", key: "support" },
                { label: "Data retention", key: "retention" },
              ];
              const matrix: Record<string, Record<string, string | number>> = {
                freelancer: {
                  verifs: 25,
                  ai: "Basic",
                  bulk: "—",
                  brand: "Branded PDF reports",
                  team: 1,
                  api: "—",
                  support: "Email (24–48h)",
                  retention: "Access history anytime",
                },
                basic: {
                  verifs: 100,
                  ai: "Advanced",
                  bulk: 100,
                  brand: "Logo branding",
                  team: 3,
                  api: "—",
                  support: "Priority email",
                  retention: "1 year",
                },
                manager: {
                  verifs: 300,
                  ai: "Advanced",
                  bulk: 500,
                  brand: "Full branding",
                  team: 5,
                  api: "API (1,000 calls/mo)",
                  support: "Email & phone",
                  retention: "2 years",
                },
                admin: {
                  verifs: 1000,
                  ai: "Highest-level",
                  bulk: 2000,
                  brand: "Complete white‑label",
                  team: 15,
                  api: "Webhooks",
                  support: "Dedicated manager & phone priority",
                  retention: "3 years",
                },
                service: {
                  verifs: "Unlimited",
                  ai: "Enterprise‑grade",
                  bulk: "Custom",
                  brand: "Custom white‑labeling",
                  team: "Unlimited",
                  api: "SSO, SAML, custom API/webhook, ERP",
                  support: "Dedicated 24×7",
                  retention: "Custom",
                },
              };

              return rows.map((r) => (
                <tr key={r.key} className="border-t border-neutral-200/70">
                  <td className="py-2">{r.label}</td>
                  {PLANS.map((p) => (
                    <td key={p.name + r.key} className="py-2">
                      {String(matrix[p.key as keyof typeof matrix]?.[r.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 text-center p-6 rounded-2xl border border-neutral-200/70 bg-white/60 backdrop-blur">
        <h2 className="text-lg font-medium">{t("pricing.bottomCta.title")}</h2>
        <div className="mt-3 flex items-center justify-center gap-3">
          <Link href="#plans" className="text-sm px-4 py-2 rounded-full text-white" style={{ background: "linear-gradient(135deg, #F97316, #1E3A8A)" }}>{t("pricing.tryFree")}</Link>
          <Link href="/contact" className="text-sm px-4 py-2 rounded-full border border-neutral-200/70">{t("pricing.contactSales")}</Link>
        </div>
      </div>
    </div>
  );
}

function Toggle({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`px-4 py-1.5 rounded-full text-sm ${active ? "text-white" : ""}`} style={{ background: active ? "linear-gradient(135deg, #F97316, #1E3A8A)" : "transparent" }}>
      {children}
    </button>
  );
}
