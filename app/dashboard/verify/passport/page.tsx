"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import DataTable from "@/app/components/ui/DataTable";
import React, { useState } from "react";

interface Row { passport: string; name: string; status: string; risk: number; }

export default function VerifyPassport() {
  const [passport, setPassport] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [rows, setRows] = useState<Row[]>([
    { passport: "Z1234567", name: "Ananya Gupta", status: "Valid", risk: 6 },
  ]);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    { key: "passport", header: "Passport No." },
    { key: "name", header: "Name" },
    { key: "status", header: "Status" },
    { key: "risk", header: "Risk" },
  ] as const;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await new Promise((res) => setTimeout(res, 600));
      const risk = 9;
      setRows((cur) => [{ passport: passport.toUpperCase(), name: name || "—", status: "Verified", risk }, ...cur]);
      setMsg("Passport verification simulated successfully.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected allowedRoles={["user"]}>
      <PageShell title="Passport Verification" subtitle="Validate Indian passport number and status">
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
          <div>
            <label className="text-xs text-neutral-600">Passport Number</label>
            <input value={passport} onChange={(e)=>setPassport(e.target.value.toUpperCase())} required placeholder="Z1234567" className="w-full px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-neutral-600">Full Name (optional)</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="As per passport" className="w-full px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
          </div>
          <div>
            <label className="text-xs text-neutral-600">DOB (DD-MM-YYYY)</label>
            <input value={dob} onChange={(e)=>setDob(e.target.value)} placeholder="01-12-2000" className="w-full px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
          </div>
          <div className="flex items-end">
            <button disabled={loading} type="submit" className="w-full px-3 py-2 rounded-md text-white bg-orange-600 disabled:opacity-50">{loading ? "Verifying…" : "Verify"}</button>
          </div>
        </form>

        {msg && <p className="text-xs mb-2">{msg}</p>}
        <p className="text-sm mb-2" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>Recent passport checks</p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <DataTable columns={columns as unknown as any} data={rows as unknown as any} />
      </PageShell>
    </Protected>
  );
}
