"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";

export default function AdminJobs() {
  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="Background Jobs" subtitle="Monitor queues and tasks">
        <ul className="text-sm space-y-1">
          <li>bulk-1023 • processing • 1,200 rows</li>
          <li>email-#INV-2042 • completed</li>
          <li>report-RPT-1022 • completed</li>
        </ul>
      </PageShell>
    </Protected>
  );
}
