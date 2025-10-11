"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useEffect, useState } from "react";

export default function AdminStatus() {
  const [data, setData] = useState<{ jobs: { processing: number; completed: number }; verifications: { failed: number; completed: number } } | null>(null);

  useEffect(() => {
    setData({ jobs: { processing: 1, completed: 24 }, verifications: { completed: 312, failed: 4 } });
  }, []);

  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="System Status" subtitle="API uptime, DB health, and service dependencies">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4"><p className="text-sm font-medium">Auth API</p><p className="text-xs text-emerald-700 mt-1">Operational</p></div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4"><p className="text-sm font-medium">Verification API</p><p className="text-xs text-emerald-700 mt-1">Operational</p></div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4"><p className="text-sm font-medium">Database</p><p className="text-xs text-emerald-700 mt-1">Operational</p></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Bulk jobs</p>
            <p className="text-xs mt-1">Processing: {data?.jobs.processing ?? 0}</p>
            <p className="text-xs">Completed: {data?.jobs.completed ?? 0}</p>
          </div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Verifications</p>
            <p className="text-xs mt-1">Completed: {data?.verifications.completed ?? 0}</p>
            <p className="text-xs">Failed: {data?.verifications.failed ?? 0}</p>
          </div>
        </div>
      </PageShell>
    </Protected>
  );
}
