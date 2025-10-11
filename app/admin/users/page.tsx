"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import DataTable from "@/app/components/ui/DataTable";

interface Row { email: string; role: string; status: string; lastLogin: string; }

export default function AdminUsers() {
  const columns = [
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    { key: "status", header: "Status" },
    { key: "lastLogin", header: "Last Login" },
  ] as const;

  const data: Row[] = [
    { email: "ananya@fintechco.com", role: "manager", status: "active", lastLogin: "2025-10-02 09:00" },
    { email: "ops@retailcorp.com", role: "user", status: "active", lastLogin: "2025-10-02 08:10" },
    { email: "meera@startupx.io", role: "user", status: "suspended", lastLogin: "2025-09-20 17:20" },
  ];

  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="Users" subtitle="Manage user roles and statuses">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <DataTable columns={columns as unknown as any} data={data as unknown as any} />
      </PageShell>
    </Protected>
  );
}
