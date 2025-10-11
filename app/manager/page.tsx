"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";

export default function ManagerOverview() {
  return (
    <Protected allowedRoles={["manager"]}>
      <PageShell title="Manager Overview" subtitle="Team performance and recent activity">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4"><p className="text-sm font-medium">Team verifications (7d)</p><p className="text-2xl mt-1" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>1,340</p></div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4"><p className="text-sm font-medium">Avg. SLA</p><p className="text-2xl mt-1" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>3m 12s</p></div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4"><p className="text-sm font-medium">High-risk flags</p><p className="text-2xl mt-1" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>12</p></div>
        </div>
      </PageShell>
    </Protected>
  );
}
