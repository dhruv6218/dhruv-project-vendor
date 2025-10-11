"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";

export default function AdminServiceOrders() {
  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="Service Orders" subtitle="Manage manual verification services (₹24,999/100 verifications)">
        <ul className="text-sm space-y-1">
          <li>#SO-310 • FintechCo • 100 verifications • In Progress</li>
          <li>#SO-309 • RetailCorp • 200 verifications • Completed</li>
          <li>#SO-308 • StartupX • 50 verifications • Pending Payment</li>
        </ul>
      </PageShell>
    </Protected>
  );
}
