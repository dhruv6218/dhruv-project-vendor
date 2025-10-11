"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import DataTable from "@/app/components/ui/DataTable";
import React, { useState } from "react";

interface Row { pan: string; holder: string; status: string; risk: number; }

export default function VerifyPAN() {
  const [pan, setPan] = useState("");
  const [holder, setHolder] = useState("");
  const [rows, setRows] = useState<Row[]>([
    { pan: "AAECS1234F", holder: "Kamal Traders", status: "Match", risk: 10 },
  ]);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    { key: "pan", header: "PAN" },
    { key: "holder", header: "Holder Name" },
    { key: "status", header: "Status" },
    { key: "risk", header: "Risk" },
  ] as const;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await new Promise((res) => setTimeout(res, 600));
      const status = holder ? "Match" : "Verified";
      const risk = holder ? 8 : 14;
      setRows((cur) => [{ pan: pan.toUpperCase(), holder: holder || "—", status, risk }, ...cur]);
      setMsg("PAN verification simulated successfully.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected allowedRoles={["user"]}>
      <PageShell title="PAN Verification" subtitle="Verify PAN holder name alignment and status">
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
          <div>
            <label className="text-xs text-neutral-600">PAN</label>
            <input value={pan} onChange={(e)=>setPan(e.target.value.toUpperCase())} required minLength={10} maxLength={10} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" placeholder="AAECS1234F" className="w-full px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-neutral-600">Holder Name (optional)</label>
            <input value={holder} onChange={(e)=>setHolder(e.target.value)} placeholder="Registered business or person" className="w-full px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
          </div>
          <div className="flex items-end">
            <button disabled={loading} type="submit" className="w-full px-3 py-2 rounded-md text-white bg-orange-600 disabled:opacity-50">{loading ? "Checking…" : "Check"}</button>
          </div>
        </form>

        {msg && <p className="text-xs mb-2">{msg}</p>}
        <p className="text-sm mb-2" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>Recent PAN checks</p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <DataTable columns={columns as unknown as any} data={rows as unknown as any} />
      </PageShell>
    </Protected>
  );
}
