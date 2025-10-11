"use client";

import React from "react";
import ElectricBorder from "@/app/components/ElectricBorder";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10">
      <ElectricBorder color="#F97316" speed={1} chaos={0.4} thickness={2}>
        <article className="p-4 rounded-[14px]">
          <h1 className="text-3xl font-medium">Terms & Conditions</h1>
          <p className="text-sm text-[#64748B] mt-2">Effective Date: 01 October 2025</p>

          <section className="mt-6 space-y-6 text-base leading-7 text-[#0F172A]">
            <div>
              <h2 className="text-xl font-medium">1. Account Eligibility</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Users must be 18+ years old.</li>
                <li>Accurate and up-to-date personal information is required.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium">2. Subscription & Payments</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Plans: Free, Freelancer ₹249, Basic ₹999, Mid ₹2199, Advanced ₹2999, Enterprise Custom.</li>
                <li>Payments are processed via Cosmic Payments; subscriptions renew automatically unless canceled.</li>
                <li>No proration for mid-cycle upgrades. See our Refund Policy for details.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium">3. Platform Usage</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use the platform solely for lawful verification purposes.</li>
                <li>Unauthorized sharing of API keys, credentials, or reverse engineering is prohibited.</li>
                <li>Service limits apply per plan (e.g., 5 verifications/month for Free plan).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium">4. Intellectual Property</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All platform content, branding, AI outputs, and reports are property of Ravono or licensed partners.</li>
                <li>Users may not copy, redistribute, or resell platform content without permission.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium">5. Service Modifications</h2>
              <p>We may add, remove, or modify features. Users will be notified for major changes.</p>
            </div>

            <div>
              <h2 className="text-xl font-medium">6. Dispute Resolution</h2>
              <p>Any disputes are governed by Indian law, jurisdiction of Delhi courts. Please contact support first for resolution.</p>
            </div>

            <div>
              <h2 className="text-xl font-medium">7. Limitation of Liability</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ravono is not responsible for direct/indirect damages arising from platform use.</li>
                <li>AI verification outputs are probabilistic; human review is recommended for critical decisions.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium">8. Termination</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Accounts may be suspended or terminated for violations of these Terms.</li>
                <li>Data may be deleted after termination unless retention is legally required.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium">Contact</h2>
              <p>
                For questions, contact <a className="underline" href="mailto:ravonoagency@gmail.com">ravonoagency@gmail.com</a> or <a className="underline" href="mailto:ravonoagency06@gmail.com">ravonoagency06@gmail.com</a>.
              </p>
            </div>
          </section>
        </article>
      </ElectricBorder>
    </div>
  );
}
