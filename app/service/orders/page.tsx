"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useEffect, useState } from "react";

interface Order { id: string; client?: string; items?: number; status: string }

export default function ServiceOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    setOrders([
      { id: "SO-1001", client: "Acme Co.", items: 5, status: "assigned" },
      { id: "SO-1000", client: "Nova Retail", items: 2, status: "in_progress" },
    ]);
  }, []);

  const complete = async (id: string) => {
    setUpdating(id);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setOrders((cur) => cur.map(o => o.id === id ? { ...o, status: "completed" } : o));
    } finally {
      setUpdating(null);
    }
  };

  return (
    <Protected allowedRoles={["service"]}>
      <PageShell title="Assigned Orders" subtitle="Manual verification assignments">
        <ul className="text-sm space-y-1">
          {orders.map(o => (
            <li key={o.id} className="rounded-md border border-neutral-200/70 bg-white/80 px-3 py-2 flex items-center justify-between">
              <span>{o.id} • {o.status}</span>
              <button disabled={o.status === 'completed' || updating === o.id} onClick={()=>void complete(o.id)} className="px-3 py-1.5 rounded-md text-white text-xs disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#F97316,#FB923C)' }}>
                {o.status === 'completed' ? 'Completed' : updating === o.id ? 'Updating…' : 'Mark Completed'}
              </button>
            </li>
          ))}
          {orders.length === 0 && (<li className="text-sm text-[#475569]">No assigned orders.</li>)}
        </ul>
      </PageShell>
    </Protected>
  );
}
