"use client";

import React from "react";
import ElectricBorder from "@/app/components/ElectricBorder";

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10">
      <ElectricBorder color="#F97316" speed={1} chaos={0.4} thickness={2}>
        <article className="p-4 rounded-[14px]">
          <h1 className="text-3xl font-medium">Disclaimer</h1>
          <p className="text-sm text-[#64748B] mt-2">Effective Date: 01 October 2025</p>

          <section className="mt-6 space-y-6 text-base leading-7 text-[#0F172A]">
            <div>
              <h2 className="text-xl font-medium">AI Verification Limitations</h2>
              <p>Verification results are based on AI reasoning and integrated government/third-party APIs. While Ravono strives for high accuracy, errors, omissions, or discrepancies may occur.</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">No Liability for Decisions</h2>
              <p>Users are responsible for confirming results before taking critical business actions. Ravono is not liable for business or financial decisions based on verification reports.</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">No Legal Advice</h2>
              <p>Reports are informational and should be used with professional judgment. They do not constitute legal advice.</p>
            </div>
          </section>
        </article>
      </ElectricBorder>
    </div>
  );
}
