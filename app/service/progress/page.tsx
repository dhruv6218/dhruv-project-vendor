"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";

export default function ServiceProgress() {
  const jobs = [
    { id: "SO-310", total: 100, done: 36, status: "In Progress" },
    { id: "SO-309", total: 200, done: 200, status: "Completed" },
  ];
  return (
    <Protected allowedRoles={["service"]}>
      <PageShell title="Progress" subtitle="Track job completion and statuses">
        <ul className="text-sm space-y-2">
          {jobs.map(j => (
            <li key={j.id} className="rounded-md border border-neutral-200/70 bg-white/80 px-3 py-2">
              <div className="flex items-center justify-between"><span>{j.id} • {j.status}</span><span>{j.done}/{j.total}</span></div>
              <div className="mt-1 h-2 w-full rounded bg-neutral-200 overflow-hidden"><div className="h-2 bg-orange-500" style={{ width: `${Math.round((j.done/j.total)*100)}%` }} /></div>
            </li>
          ))}
        </ul>
      </PageShell>
    </Protected>
  );
}
