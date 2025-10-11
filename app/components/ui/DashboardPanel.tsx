"use client";

import React from "react";

export type DashboardPanelProps = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function DashboardPanel({ title, children, footer }: DashboardPanelProps) {
  return (
    <section className="rounded-xl border border-neutral-200/70 bg-white/70 backdrop-blur">
      <div className="px-3 py-2 border-b border-neutral-200/70">
        <h3 className="text-sm" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}><span>{title}</span></h3>
      </div>
      <div className="p-3">
        {children}
      </div>
      {footer && (
        <div className="px-3 py-2 border-t border-neutral-200/70 text-xs text-[#64748B]">
          {footer}
        </div>
      )}
    </section>
  );
}
