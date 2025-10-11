"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import DataTable from "@/app/components/ui/DataTable";

interface Row { user: string; vendor: string; check: string; status: string; date: string; }

export default function TeamVerifications() {
  const columns = [
    { key: "user", header: "User" },
    { key: "vendor", header: "Vendor" },
    { key: "check", header: "Check" },
    { key: "status", header: "Status" },
    { key: "date", header: "Date" },
  ] as const;

  const data: Row[] = [
    { user: "Ananya", vendor: "Neo Components", check: "PAN", status: "Flagged", date: "2025-10-01 19:05" },
    { user: "Rohit", vendor: "Shree Logistics Pvt Ltd", check: "All-in-One", status: "Clean", date: "2025-10-02 09:20" },
    { user: "Meera", vendor: "Apex Supplies", check: "Bank", status: "Clean", date: "2025-10-01 15:50" },
  ];

  return (
    <Protected allowedRoles={["manager"]}>
      <PageShell title="Team Verifications" subtitle="Monitor checks done by your team">
        <DataTable<Row> columns={columns as unknown as { key: keyof Row; header: string }[]} data={data} />
      </PageShell>
    </Protected>
  );
}
