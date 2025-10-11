"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";

export default function AdminOverview() {
  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="Admin Overview" subtitle="Platform-wide metrics and system health">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4"><p className="text-sm font-medium">Total Users</p><p className="text-2xl mt-1" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>4,812</p></div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4"><p className="text-sm font-medium">Monthly Revenue</p><p className="text-2xl mt-1" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>₹7.2M</p></div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4"><p className="text-sm font-medium">API Requests (24h)</p><p className="text-2xl mt-1" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>1.9M</p></div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4"><p className="text-sm font-medium">Uptime</p><p className="text-2xl mt-1" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>99.98%</p></div>
        </div>
      </PageShell>
    </Protected>
  );
}
