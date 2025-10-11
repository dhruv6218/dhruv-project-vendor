"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useEffect, useState } from "react";

interface Purchase { product_id: string; price: number; currency: string; timestamp: string }

export default function AdminPayments() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    // Simulate loading purchase history locally
    const timer = setTimeout(() => {
      setPurchases([
        { product_id: "freelancer_monthly", price: 39900, currency: "INR", timestamp: new Date().toISOString() },
        { product_id: "business_monthly", price: 399900, currency: "INR", timestamp: new Date(Date.now() - 86400000).toISOString() },
      ]);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="Payments" subtitle="Payment records, failures, and refunds">
        <ul className="text-sm space-y-1">
          {purchases.map((p, idx) => (
            <li key={idx}>Product {p.product_id} • {(p.price/100).toFixed(2)} {p.currency} • {new Date(p.timestamp).toLocaleString()}</li>
          ))}
          {purchases.length === 0 && <li className="text-neutral-500">Loading…</li>}
        </ul>
      </PageShell>
    </Protected>
  );
}
