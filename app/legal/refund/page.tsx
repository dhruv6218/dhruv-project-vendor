"use client";

import React from "react";
import ElectricBorder from "@/app/components/ElectricBorder";

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10">
      <ElectricBorder color="#F97316" speed={1} chaos={0.4} thickness={2}>
        <article className="p-4 rounded-[14px]">
          <h1 className="text-3xl font-medium">Refund Policy</h1>
          <p className="text-sm text-[#64748B] mt-2">Effective Date: 01 October 2025</p>

          <section className="mt-6 space-y-6 text-base leading-7 text-[#0F172A]">
            <div>
              <h2 className="text-xl font-medium">SaaS Subscription Refunds</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>No refund for monthly subscriptions after payment is processed.</li>
                <li>Refunds may be considered if service is unavailable due to platform downtime exceeding SLA limits (case-by-case).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium">Manual Verification Service Refunds</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Refunds are considered if the ₹24,999/100 verifications order is not completed due to Ravono error.</li>
                <li>Partial refund possible for partially completed orders.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium">Enterprise Custom Deals</h2>
              <p>Refunds follow the terms in the signed contract.</p>
            </div>

            <div>
              <h2 className="text-xl font-medium">Process</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Contact support via email within 7 days of payment.</li>
                <li>Refunds are processed within 14–21 business days.</li>
              </ul>
              <p className="mt-2">Email <a className="underline" href="mailto:ravonoagency@gmail.com">ravonoagency@gmail.com</a> or <a className="underline" href="mailto:ravonoagency06@gmail.com">ravonoagency06@gmail.com</a> for assistance.</p>
            </div>
          </section>
        </article>
      </ElectricBorder>
    </div>
  );
}
