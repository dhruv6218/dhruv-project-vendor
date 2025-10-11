"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Unauthorized() {
  return (
    <div className="mx-auto max-w-2xl px-4 md:px-6 py-16">
      <div className="rounded-2xl border border-neutral-200/70 bg-white/70 backdrop-blur p-6 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700">
          <Icon icon="mdi:lock-outline" width={24} />
        </div>
        <h1 className="mt-3 text-xl" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}><span>Access denied</span></h1>
        <p className="text-sm text-neutral-600 mt-1"><span>You don’t have permission to view this page.</span></p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Link href="/" className="px-3 py-2 text-sm rounded-md border border-neutral-200/70">Go Home</Link>
          <Link href="/api/auth/role-redirect" className="px-3 py-2 text-sm rounded-md text-white" style={{ background: 'linear-gradient(135deg,#F97316,#1E3A8A)' }}>Go to your area</Link>
        </div>
      </div>
    </div>
  );
}
