"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";

export default function AdminTestimonials() {
  const items = [
    { id: 1, title: "Great speed!", stars: 5, company: "FintechCo", autoPublish: true },
    { id: 2, title: "Reliable reports", stars: 4, company: "RetailCorp", autoPublish: true },
    { id: 3, title: "Useful for audits", stars: 3, company: "StartupX", autoPublish: false },
  ];
  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="Testimonials" subtitle="Approve or reject submissions (4+ stars auto-publish)">
        <ul className="space-y-2 text-sm">
          {items.map(i => (
            <li key={i.id} className="flex items-center justify-between rounded-md border border-neutral-200/70 bg-white/80 px-3 py-2">
              <span>{i.title} • {i.stars}★ • {i.company}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-md border border-neutral-200/70">Approve</button>
                <button className="px-3 py-1 rounded-md border border-neutral-200/70">Reject</button>
              </div>
            </li>
          ))}
        </ul>
      </PageShell>
    </Protected>
  );
}
