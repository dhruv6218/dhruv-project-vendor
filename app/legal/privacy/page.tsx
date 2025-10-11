"use client";

import React from "react";
import ElectricBorder from "@/app/components/ElectricBorder";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10">
      <ElectricBorder color="#F97316" speed={1} chaos={0.4} thickness={2}>
        <article className="p-4 rounded-[14px]">
          <h1 className="text-3xl font-medium">Privacy Policy</h1>
          <p className="text-sm text-[#64748B] mt-2">Effective Date: 01 October 2025</p>

          <nav aria-label="Table of contents" className="mt-6 rounded-xl border border-neutral-200/70 bg-white/60 backdrop-blur p-4">
            <ul className="text-sm space-y-2">
              <li><a href="#scope" className="text-[#1E3A8A] hover:underline">1. Scope</a></li>
              <li><a href="#info" className="text-[#1E3A8A] hover:underline">2. Information We Collect</a></li>
              <li><a href="#use" className="text-[#1E3A8A] hover:underline">3. How We Use Your Information</a></li>
              <li><a href="#sharing" className="text-[#1E3A8A] hover:underline">4. Data Sharing</a></li>
              <li><a href="#retention" className="text-[#1E3A8A] hover:underline">5. Data Retention</a></li>
              <li><a href="#security" className="text-[#1E3A8A] hover:underline">6. Security Measures</a></li>
              <li><a href="#rights" className="text-[#1E3A8A] hover:underline">7. Your Rights</a></li>
              <li><a href="#cookies" className="text-[#1E3A8A] hover:underline">8. Cookies & Tracking</a></li>
              <li><a href="#children" className="text-[#1E3A8A] hover:underline">9. Children</a></li>
              <li><a href="#changes" className="text-[#1E3A8A] hover:underline">10. Changes to this Policy</a></li>
              <li><a href="#contact" className="text-[#1E3A8A] hover:underline">11. Contact</a></li>
            </ul>
          </nav>

          <section className="mt-8 space-y-6 text-base leading-7 text-[#0F172A]">
            <div id="scope">
              <h2 className="text-xl font-medium">1. Scope</h2>
              <p>
                This Privacy Policy describes how Ravono Vendor Compliance (&apos;Ravono&apos;, &apos;we&apos;, &apos;our&apos;, &apos;us&apos;) collects, uses, stores, and
                protects information when you use our SaaS platform, websites, and related services.
              </p>
            </div>

            <div id="info">
              <h2 className="text-xl font-medium">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Personal Information:</span> name, email, phone number, company, role, payment details (processed by our payment provider),
                  and identification documents submitted for verification (e.g., PAN, Aadhaar, GST, Passport, MCA/CIN/DIN, bank details as applicable).
                </li>
                <li>
                  <span className="font-medium">Verification Data:</span> inputs you provide for checks, raw provider outputs, AI reasoning, fraud scores, and generated reports.
                </li>
                <li>
                  <span className="font-medium">Usage Data:</span> IP address, device and browser type, pages visited, actions taken, timestamps, and session duration.
                </li>
                <li>
                  <span className="font-medium">Cookies & Tracking:</span> cookies, web beacons, and analytics scripts used for functionality, performance, and marketing (see Cookies section).
                </li>
                <li>
                  <span className="font-medium">Third‑Party Integrations:</span> data shared via integrations you enable (e.g., Google OAuth/Drive), email providers, PDF generation, and AI fraud analysis providers.
                </li>
              </ul>
            </div>

            <div id="use">
              <h2 className="text-xl font-medium">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide and operate the platform (verifications, AI reasoning, PDF/online reports, notifications).</li>
                <li>Process payments and manage subscriptions.</li>
                <li>Improve features, security, and user experience, including analytics and troubleshooting.</li>
                <li>Send transactional communications and, where permitted, product updates and offers (you can opt out of marketing).</li>
                <li>Comply with legal and regulatory obligations and enforce our terms.</li>
              </ul>
            </div>

            <div id="sharing">
              <h2 className="text-xl font-medium">4. Data Sharing</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Internal Access:</span> only authorized personnel (admins, service team) with role‑based permissions may access data for
                  legitimate business purposes.
                </li>
                <li>
                  <span className="font-medium">Service Providers:</span> payment processors, email services, cloud storage, AI providers, and PDF generation vendors under
                  contractual obligations and appropriate safeguards.
                </li>
                <li>
                  <span className="font-medium">Legal:</span> disclosed where required by law, legal process, or to prevent fraud, abuse, or security incidents.
                </li>
                <li>We do not sell personal data.</li>
              </ul>
            </div>

            <div id="retention">
              <h2 className="text-xl font-medium">5. Data Retention</h2>
              <p>
                We retain personal and verification data for as long as your account is active or as required by law and our retention policies. Audit logs and
                transactional/financial records are typically retained for 5–7 years to meet compliance obligations. Tenant‑level retention settings may apply.
              </p>
            </div>

            <div id="security">
              <h2 className="text-xl font-medium">6. Security Measures</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Encryption in transit (TLS) and encryption at rest for sensitive data.</li>
                <li>Role‑based access controls (RBAC) and principle of least privilege.</li>
                <li>Admin 2FA support and optional IP allowlisting for enterprise tenants.</li>
                <li>Regular backups and disaster recovery processes.</li>
                <li>Audit logging of access and key actions.</li>
              </ul>
            </div>

            <div id="rights">
              <h2 className="text-xl font-medium">7. Your Rights</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access, correct, delete, or export your personal data, subject to verification and applicable law.</li>
                <li>Object to or restrict certain processing and withdraw consent to marketing.</li>
                <li>Appeal or raise concerns with a supervisory authority where applicable.</li>
              </ul>
            </div>

            <div id="cookies">
              <h2 className="text-xl font-medium">8. Cookies & Tracking</h2>
              <p>
                We use functional, performance/analytics, and marketing cookies. You can manage cookies via your browser settings. Some features may not function
                properly if certain cookies are disabled.
              </p>
            </div>

            <div id="children">
              <h2 className="text-xl font-medium">9. Children</h2>
              <p>
                Our services are not directed to individuals under 18. We do not knowingly collect children’s data. If you believe a child has provided personal data,
                contact us to request deletion.
              </p>
            </div>

            <div id="changes">
              <h2 className="text-xl font-medium">10. Changes to this Policy</h2>
              <p>
                We may update this policy from time to time. Changes will be posted here with an updated effective date. Material changes will be communicated through
                reasonable notices.
              </p>
            </div>

            <div id="contact">
              <h2 className="text-xl font-medium">11. Contact</h2>
              <p><span>For privacy requests or questions, contact us at </span><a className="underline" href="mailto:ravonoagency@gmail.com">ravonoagency@gmail.com</a><span> or </span><a className="underline" href="mailto:ravonoagency06@gmail.com">ravonoagency06@gmail.com</a><span>. For urgent issues, WhatsApp </span><a className="underline" href="https://wa.me/919034950792" target="_blank" rel="noopener noreferrer">+91 90349 50792</a><span>.</span></p>
            </div>
          </section>
        </article>
      </ElectricBorder>
    </div>
  );
}
