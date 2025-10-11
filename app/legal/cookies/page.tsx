"use client";

import React from "react";
import ElectricBorder from "@/app/components/ElectricBorder";

export default function CookiesPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10">
      <ElectricBorder color="#F97316" speed={1} chaos={0.4} thickness={2}>
        <article className="p-4 rounded-[14px]">
          <h1 className="text-3xl font-medium">Cookies Policy</h1>
          <p className="text-sm text-[#64748B] mt-2">Effective Date: 01 October 2025</p>

          <section className="mt-6 space-y-6 text-base leading-7 text-[#0F172A]">
            <div>
              <h2 className="text-xl font-medium">Purpose</h2>
              <p>Cookies improve user experience, analytics, and personalized communications.</p>
            </div>

            <div>
              <h2 className="text-xl font-medium">Types of Cookies</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-medium">Essential:</span> required for login, session, and core functionality.</li>
                <li><span className="font-medium">Performance:</span> anonymous usage data for analytics.</li>
                <li><span className="font-medium">Functional:</span> preferences such as theme and language.</li>
                <li><span className="font-medium">Marketing:</span> personalized offers and email tracking (opt-in).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium">Management</h2>
              <p>Users can manage or disable cookies in their browser settings. Some features may be affected if certain cookies are disabled.</p>
            </div>

            <div>
              <h2 className="text-xl font-medium">Contact</h2>
              <p>
                For cookie-related questions, contact <a className="underline" href="mailto:ravonoagency@gmail.com">ravonoagency@gmail.com</a> or <a className="underline" href="mailto:ravonoagency06@gmail.com">ravonoagency06@gmail.com</a>.
              </p>
            </div>
          </section>
        </article>
      </ElectricBorder>
    </div>
  );
}
