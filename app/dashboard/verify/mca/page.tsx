"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import DataTable from "@/app/components/ui/DataTable";
import React, { useState } from "react";

interface Row { cin: string; company: string; status: string; directors: number; risk: number; }

export default function VerifyMCA() {
  const [cin, setCin] = useState("");
  const [rows, setRows] = useState<Row[]>([
    { cin: "U74999MH2018PTC123456", company: "Neo Components Pvt Ltd", status: "Active", directors: 2, risk: 20 },
  ]);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    { key: "cin", header: "CIN" },
    { key: "company", header: "Company" },
    { key: "status", header: "Status" },
    { key: "directors", header: "Directors" },
    { key: "risk", header: "Risk" },
  ] as const;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await new Promise((res) => setTimeout(res, 600));
      setRows((cur) => [{ cin: cin || "—", company: "Example Co.", status: "Found", directors: 2, risk: 18 }, ...cur]);
      setMsg("MCA search simulated successfully.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected allowedRoles={["user"]}>
      <PageShell title="MCA Verification" subtitle="Fetch CIN/DIN details, status, charges, and directors">
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
          <div className="md:col-span-4">
            <label className="text-xs text-neutral-600">CIN / Company Name</label>
            <input value={cin} onChange={(e)=>setCin(e.target.value)} placeholder="U74999MH2018PTC123456 or Company Name" className="w-full px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
          </div>
          <div className="flex items-end">
            <button disabled={loading} type="submit" className="w-full px-3 py-2 rounded-md text-white bg-orange-600 disabled:opacity-50">{loading ? "Searching…" : "Search"}</button>
          </div>
        </form>

        {msg && <p className="text-xs mb-2">{msg}</p>}
        <p className="text-sm mb-2" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>Recent MCA checks</p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <DataTable columns={columns as unknown as any} data={rows as unknown as any} />
      </PageShell>
    </Protected>
  );
}
