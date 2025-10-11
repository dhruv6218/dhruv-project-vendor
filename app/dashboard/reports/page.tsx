"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import DataTable from "@/app/components/ui/DataTable";
import Link from "next/link";
import React, { useState } from "react";

interface Row { id: string; vendor: string; check: string; risk: number; status: string; date: string; }

export default function Reports() {
  const columns = [
    { key: "id", header: "Report ID" },
    { key: "vendor", header: "Vendor" },
    { key: "check", header: "Check" },
    { key: "risk", header: "Risk" },
    { key: "status", header: "Status" },
    { key: "date", header: "Date" },
  ] as const;

  const [data] = useState<Row[]>([
    { id: "RPT-1023", vendor: "Shree Logistics Pvt Ltd", check: "All-in-One", risk: 18, status: "Clean", date: "2025-10-02 09:20" },
    { id: "RPT-1022", vendor: "Neo Components", check: "PAN", risk: 74, status: "Flagged", date: "2025-10-01 19:05" },
    { id: "RPT-1021", vendor: "Apex Supplies", check: "Bank", risk: 16, status: "Clean", date: "2025-10-01 15:50" },
  ]);

  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<"csv" | "pdf" | null>(null);

  async function exportAs(format: "csv" | "pdf") {
    setLoading(format); setMsg(null);
    try {
      await new Promise((r)=>setTimeout(r, 700));
      setMsg(`${format.toUpperCase()} ready: https://example.com/downloads/reports-demo.${format}`);
    } catch (err) {
      setMsg((err as Error).message);
    } finally {
      setLoading(null);
    }
  }

  return (
    <Protected allowedRoles={["user"]}>
      <PageShell title="Reports" subtitle="Browse and filter verification results">
        <div className="mb-3 flex gap-2">
          <button disabled={loading==="csv"} onClick={() => void exportAs("csv")} className="px-3 py-2 text-sm rounded-md border border-neutral-200/70">{loading==="csv"?"Exporting…":"Export CSV"}</button>
          <button disabled={loading==="pdf"} onClick={() => void exportAs("pdf")} className="px-3 py-2 text-sm rounded-md border border-neutral-200/70">{loading==="pdf"?"Exporting…":"Export PDF"}</button>
        </div>
        {msg && <p className="text-xs mb-2">{msg}</p>}
        <div className="mb-2 text-xs text-neutral-600">Tip: Open a report by appending its ID, e.g., /dashboard/reports/RPT-1023</div>
        <DataTable<Row> columns={columns as unknown as { key: keyof Row; header: string }[]} data={data} />
        <div className="mt-3 text-xs">
          Quick link: <Link href="/dashboard/reports/RPT-1023" className="underline">View RPT-1023</Link>
        </div>
      </PageShell>
    </Protected>
  );
}
