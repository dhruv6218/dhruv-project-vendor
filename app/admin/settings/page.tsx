"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";

export default function AdminSettings() {
  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="Platform Settings" subtitle="Global configuration">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Branding</p>
            <input className="mt-2 px-3 py-2 text-sm rounded-md border border-neutral-200/70 w-full" placeholder="Company name" />
          </div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Verification Limits</p>
            <input className="mt-2 px-3 py-2 text-sm rounded-md border border-neutral-200/70 w-full" placeholder="Free verifications per month" />
          </div>
        </div>
      </PageShell>
    </Protected>
  );
}
