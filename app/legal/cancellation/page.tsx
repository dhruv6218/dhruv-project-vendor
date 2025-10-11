"use client";

import React from "react";
import ElectricBorder from "@/app/components/ElectricBorder";

export default function CancellationPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10">
      <ElectricBorder color="#F97316" speed={1} chaos={0.4} thickness={2}>
        <article className="p-4 rounded-[14px]">
          <h1 className="text-3xl font-medium">Cancellation Policy</h1>
          <p className="text-sm text-[#64748B] mt-2">Effective Date: 01 October 2025</p>

          <section className="mt-6 space-y-6 text-base leading-7 text-[#0F172A]">
            <div>
              <h2 className="text-xl font-medium">Subscription Cancellation Terms</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cancel anytime via dashboard.</li>
                <li>Cancellation takes effect at the end of the current billing cycle; no prorated refunds unless specified.</li>
                <li>All reports generated before cancellation remain accessible for the plan duration.</li>
                <li>Enterprise/Manual service cancellations are handled per agreement.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-medium">Contact</h2>
              <p>
                Need help? Email <a className="underline" href="mailto:ravonoagency@gmail.com">ravonoagency@gmail.com</a> or <a className="underline" href="mailto:ravonoagency06@gmail.com">ravonoagency06@gmail.com</a>.
              </p>
            </div>
          </section>
        </article>
      </ElectricBorder>
    </div>
  );
}
