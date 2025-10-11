"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();
  const [status, setStatus] = useState<string>("Finalizing your access…");

  useEffect(() => {
    const t1 = setTimeout(() => setStatus("Access granted. Redirecting…"), 800);
    const t2 = setTimeout(() => router.replace("/dashboard"), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [router]);

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-medium">Payment successful</h1>
      <p className="text-sm text-[#475569] mt-2">{status}</p>
      <p className="text-xs text-neutral-500 mt-2">This is a demo-only confirmation. No charges were made.</p>
    </div>
  );
}
