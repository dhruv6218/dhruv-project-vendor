"use client";

import React from "react";
import Link from "next/link";
import ElectricBorder from "@/app/components/ElectricBorder";

const ORANGE = "#F97316";
const NAVY = "#1E3A8A";

export default function ServicePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <header className="max-w-3xl">
        <h1 className="text-3xl" style={{ fontFamily: "var(--font-geist)", fontWeight: 600 }}>Ravono Vendor Compliance — Services & Pricing</h1>
        <p className="text-sm text-[#475569] mt-2"><span>Transparent, professional services with expert human support and modern automation.</span></p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/contact" className="text-sm px-4 py-2 rounded-full text-white" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${NAVY})` }}>
            <span>Get a Free Consultation</span>
          </Link>
          <Link href="/pricing" className="text-sm px-4 py-2 rounded-full border border-neutral-200/70">
            <span>See SaaS Plans</span>
          </Link>
        </div>
      </header>

      {/* 1. Vendor Verification */}
      <section className="mt-10 grid md:grid-cols-2 gap-6">
        <ElectricBorder color={ORANGE} speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
          <div className="p-5">
            <h2 className="text-lg" style={{ fontFamily: "var(--font-geist)", fontWeight: 600 }}>1. Vendor Verification (Manual + Digital)</h2>
            <p className="text-xs text-[#475569] mt-2"><span>Complete Vendor Compliance, Delivered Professionally</span></p>
            <ul className="mt-3 text-xs text-[#475569] space-y-2">
              <li><span>GSTIN, PAN, Aadhaar, bank account, passport, MCA/CIN, DIN verification</span></li>
              <li><span>Data checked via official APIs + trained compliance team — accuracy guaranteed</span></li>
              <li><span>Timely fraud flagging, audit trails, and action-ready reports (PDF included)</span></li>
              <li><span>End-to-end onboarding, KYC, and compliance for businesses and consultants</span></li>
            </ul>
            <div className="mt-4">
              <p className="text-sm font-medium"><span>Pricing</span></p>
              <ul className="text-xs text-[#475569] mt-1 space-y-1">
                <li><span>Just ₹15000 per vendor verification</span></li>
                <li><span>Transparent, pay-per-verification—no hidden charges.</span></li>
                <li><span>Bulk onboarding or monthly commitments attract volume discounts.</span></li>
                <li><span>Perfect for startups, SMBs, CAs, agencies, or procurement teams.</span></li>
                <li><span>Pack of 100 verification in ₹1,299,999 — save ₹200,000. 40% advance; remaining before delivery after service-taker review.</span></li>
              </ul>
              <div className="mt-3 flex gap-2">
                <Link href="/pricing" className="text-xs px-3 py-1.5 rounded-full text-white" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${NAVY})` }}>Start</Link>
                <Link href="/contact" className="text-xs px-3 py-1.5 rounded-full border border-neutral-200/70">Talk to Sales</Link>
              </div>
            </div>
          </div>
        </ElectricBorder>
        <ElectricBorder color={ORANGE} speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
          <div className="p-5">
            <h2 className="text-lg" style={{ fontFamily: "var(--font-geist)", fontWeight: 600 }}>2. Custom AI Chatbots</h2>
            <p className="text-xs text-[#475569] mt-2"><span>Conversational Automation for Your Brand</span></p>
            <ul className="mt-3 text-xs text-[#475569] space-y-2">
              <li><span>Intelligent chatbots for support, queries, sales, knowledge base, and lead generation</span></li>
              <li><span>Multi-platform deployment: WhatsApp, website, app, and more</span></li>
              <li><span>Advanced NLP, multilingual support</span></li>
              <li><span>Integrated with your forms, tickets, feedback, live chat, CRM</span></li>
              <li><span>Full analytics and training included</span></li>
              <li><span>Proactive bot upgrades with your business needs</span></li>
            </ul>
            <div className="mt-3">
              <p className="text-sm font-medium"><span>Pricing</span></p>
              <p className="text-xs text-[#475569] mt-1"><span>Custom, project-based — tailored to your exact requirements. Contact us for a quick scoping and demo. (Basic bots start at ₹5,000; complex AI + integrations priced by specification and user volume.)</span></p>
            </div>
          </div>
        </ElectricBorder>
      </section>

      {/* 3 & 4 */}
      <section className="mt-6 grid md:grid-cols-2 gap-6">
        <ElectricBorder color={ORANGE} speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
          <div className="p-5">
            <h2 className="text-lg" style={{ fontFamily: "var(--font-geist)", fontWeight: 600 }}>3. Professional Website Design & Development</h2>
            <p className="text-xs text-[#475569] mt-2"><span>Build Your Online Presence with Confidence</span></p>
            <ul className="mt-3 text-xs text-[#475569] space-y-2">
              <li><span>Fully responsive, mobile-first business websites, B2B portals, and landing pages</span></li>
              <li><span>Includes custom forms, chatbot integration, secure login, dashboard, payment gateway</span></li>
              <li><span>SEO-optimized, blazing fast, high conversion UI/UX</span></li>
              <li><span>Pixel-perfect design, branded for your business</span></li>
              <li><span>Complete deployment — from ideation to launch</span></li>
            </ul>
            <p className="text-xs text-[#475569] mt-2"><span>Pricing: Custom, project-based — designed for your vision and scale. Complimentary consultation for scope and budget. (Small business sites from ₹10,000; advanced portals and enterprise sites vary.)</span></p>
          </div>
        </ElectricBorder>
        <ElectricBorder color={ORANGE} speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
          <div className="p-5">
            <h2 className="text-lg" style={{ fontFamily: "var(--font-geist)", fontWeight: 600 }}>4. Smart AI Agents & Automation</h2>
            <p className="text-xs text-[#475569] mt-2"><span>Let AI Handle Your Routine Tasks</span></p>
            <ul className="mt-3 text-xs text-[#475569] space-y-2">
              <li><span>Automate support, bookings, onboarding, and operations</span></li>
              <li><span>Custom workflows — CRM, ERP, and database connectivity</span></li>
              <li><span>Always-on assistance, real-time data capture</span></li>
              <li><span>Continuous training to match your unique business logic</span></li>
              <li><span>Fully secure, aligned with GDPR and Indian data compliance</span></li>
            </ul>
            <p className="text-xs text-[#475569] mt-2"><span>Pricing: Custom — scope-driven automation packages. Request an audit and get a proposal for your use case.</span></p>
          </div>
        </ElectricBorder>
      </section>

      {/* Why Ravono */}
      <section className="mt-10 rounded-2xl border border-neutral-200/70 bg-white/60 backdrop-blur p-5">
        <h2 className="text-lg" style={{ fontFamily: "var(--font-geist)", fontWeight: 600 }}>Why Ravono?</h2>
        <ul className="mt-2 text-xs text-[#475569] space-y-1">
          <li><span>Latest technology, expert human support</span></li>
          <li><span>All pricing transparent and fair, updated to October 2025</span></li>
          <li><span>Project onboarding, migration, and after-sale support included</span></li>
          <li><span>Pay for what you need, scale any time</span></li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/contact" className="text-xs px-3 py-1.5 rounded-full text-white" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${NAVY})` }}>
            <span>Chat / Email / WhatsApp us</span>
          </Link>
          <Link href="/pricing" className="text-xs px-3 py-1.5 rounded-full border border-neutral-200/70">
            <span>Get Started</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
