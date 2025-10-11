"use client";

import React, { useMemo, useState } from "react";
import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";

interface ApprovalItem {
  id: string;
  title: string;
  requester: string;
  type: string;
  risk: "low" | "medium" | "high";
}

export default function ApprovalsPage() {
  const [items, setItems] = useState<ApprovalItem[]>([
    { id: "APP-2301", title: "Vendor ABC – GST + PAN", requester: "Sanya", type: "Verification", risk: "medium" },
    { id: "APP-2302", title: "Director DIN Check – XYZ Pvt Ltd", requester: "Rohit", type: "DIN", risk: "low" },
    { id: "APP-2303", title: "Bank Account Ownership – KLM Retail", requester: "Neha", type: "Bank", risk: "high" },
  ]);
  const [assignOpen, setAssignOpen] = useState<string | null>(null);
  const [assignee, setAssignee] = useState<string>("");

  function approve(id: string) {
    setItems((cur) => cur.filter((x) => x.id !== id));
  }
  function reject(id: string) {
    setItems((cur) => cur.filter((x) => x.id !== id));
  }
  function reassign(id: string) {
    setAssignOpen(id);
    setAssignee("");
  }
  function confirmReassign() {
    setAssignOpen(null);
  }

  return (
    <Protected allowedRoles={["manager", "admin"]}>
      <PageShell title="Approvals & Task Reassignment" subtitle="Review pending items and route work to the right teammate">
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.id} className="rounded-lg border border-neutral-200/70 bg-white/80 p-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium"><span>{it.title}</span></p>
                  <p className="text-xs text-neutral-600"><span>{it.id}</span> <span>•</span> <span>Requested by {it.requester}</span> <span>•</span> <span>Type: {it.type}</span></p>
                </div>
                <RiskBadge risk={it.risk} />
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => approve(it.id)} className="px-3 py-1.5 text-xs rounded-md text-white" style={{ background: "linear-gradient(135deg,#10B981,#059669)" }}>
                  <span>Approve</span>
                </button>
                <button onClick={() => reject(it.id)} className="px-3 py-1.5 text-xs rounded-md text-white" style={{ background: "linear-gradient(135deg,#EF4444,#DC2626)" }}>
                  <span>Reject</span>
                </button>
                <button onClick={() => reassign(it.id)} className="px-3 py-1.5 text-xs rounded-md border border-neutral-200/70">
                  <span>Reassign</span>
                </button>
              </div>

              {assignOpen === it.id && (
                <div className="mt-3 rounded-md border border-neutral-200/70 bg-white/70 p-3">
                  <p className="text-xs font-medium"><span>Reassign task</span></p>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <select value={assignee} onChange={(e) => setAssignee(e.target.value)} className="px-3 py-2 rounded-md border border-neutral-200/70">
                      <option value="">Select teammate</option>
                      <option value="ananya">Ananya – Verifier</option>
                      <option value="rohit">Rohit – Verifier</option>
                      <option value="vihaan">Vihaan – Approver</option>
                      <option value="isha">Isha – Approver</option>
                    </select>
                    <input placeholder="Notes (optional)" className="md:col-span-2 px-3 py-2 rounded-md border border-neutral-200/70" />
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button disabled={!assignee} onClick={confirmReassign} className="px-3 py-1.5 text-xs rounded-md text-white disabled:opacity-60" style={{ background: "linear-gradient(135deg,#F97316,#1E3A8A)" }}>
                      <span>Confirm</span>
                    </button>
                    <button onClick={() => setAssignOpen(null)} className="px-3 py-1.5 text-xs rounded-md border border-neutral-200/70">
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {items.length === 0 && (
            <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-6 text-sm text-center">
              <p><span>All caught up. No pending approvals.</span></p>
            </div>
          )}
        </div>
      </PageShell>
    </Protected>
  );
}

function RiskBadge({ risk }: { risk: "low" | "medium" | "high" }) {
  const text = useMemo(() => (risk === "high" ? "High Risk" : risk === "medium" ? "Medium Risk" : "Low Risk"), [risk]);
  const bg = useMemo(() => (risk === "high" ? "#FEE2E2" : risk === "medium" ? "#FEF3C7" : "#DCFCE7"), [risk]);
  const color = useMemo(() => (risk === "high" ? "#B91C1C" : risk === "medium" ? "#92400E" : "#065F46"), [risk]);
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px]" style={{ background: bg, color }}>
      <span>{text}</span>
    </span>
  );
}
