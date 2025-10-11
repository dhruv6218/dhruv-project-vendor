"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import DataTable from "@/app/components/ui/DataTable";
import React, { useState } from "react";

interface Row { masked: string; status: string; method: string; risk: number; }

export default function VerifyAadhaar() {
  const [aadhaar, setAadhaar] = useState("");
  const [vid, setVid] = useState("");
  const [rows, setRows] = useState<Row[]>([
    { masked: "**** **** 1234", status: "Verified", method: "OTP", risk: 9 },
  ]);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [reqId, setReqId] = useState("");

  const columns = [
    { key: "masked", header: "Aadhaar" },
    { key: "status", header: "Status" },
    { key: "method", header: "Method" },
    { key: "risk", header: "Risk" },
  ] as const;

  const onSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await new Promise((res) => setTimeout(res, 500));
      setReqId(`SIM-${Math.floor(Math.random()*900000)+100000}`);
      setMsg("OTP sent to Aadhaar-linked mobile. Enter OTP below to complete.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await new Promise((res) => setTimeout(res, 600));
      const id = vid || aadhaar;
      const masked = id ? String(id).replace(/\d(?=\d{4})/g, "*") : "****";
      setRows((cur) => [{ masked, status: "Verified", method: "OTP", risk: 8 }, ...cur]);
      setOtp("");
      setReqId("");
      setMsg("Aadhaar verified successfully.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected allowedRoles={["user"]}>
      <PageShell title="Aadhaar Verification" subtitle="Use VID or Aadhaar; results are masked for privacy">
        <form onSubmit={onSendOtp} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
          <div className="md:col-span-2">
            <label className="text-xs text-neutral-600">Aadhaar (12 digits)</label>
            <input value={aadhaar} onChange={(e)=>setAadhaar(e.target.value.replace(/[^0-9]/g, "").slice(0,12))} inputMode="numeric" placeholder="123412341234" className="w-full px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-neutral-600">VID (Virtual ID, optional)</label>
            <input value={vid} onChange={(e)=>setVid(e.target.value)} placeholder="XXXX-XXXX-XXXX-XXXX" className="w-full px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
          </div>
          <div className="flex items-end">
            <button disabled={loading} type="submit" className="w-full px-3 py-2 rounded-md text-white bg-orange-600 disabled:opacity-50">{loading ? "Sending…" : "Send OTP"}</button>
          </div>
        </form>

        <form onSubmit={onSubmitOtp} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
          <div className="md:col-span-2">
            <label className="text-xs text-neutral-600">ReqId</label>
            <input value={reqId} onChange={(e)=>setReqId(e.target.value)} placeholder="Auto-filled after Send OTP" className="w-full px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-neutral-600">OTP</label>
            <input value={otp} onChange={(e)=>setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0,6))} inputMode="numeric" placeholder="Enter 6-digit OTP" className="w-full px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
          </div>
          <div className="flex items-end">
            <button disabled={loading || !reqId || !otp} type="submit" className="w-full px-3 py-2 rounded-md text-white bg-orange-600 disabled:opacity-50">{loading ? "Verifying…" : "Submit OTP"}</button>
          </div>
        </form>

        {msg && <p className="text-xs mb-2">{msg}</p>}
        <p className="text-sm mb-2" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>Recent Aadhaar checks</p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <DataTable columns={columns as unknown as any} data={rows as unknown as any} />
      </PageShell>
    </Protected>
  );
}
