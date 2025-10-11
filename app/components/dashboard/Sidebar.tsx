"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

export type AllowedRole = "user" | "manager" | "admin" | "service";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  roles: AllowedRole[];
}

const navItems: NavItem[] = [
  // User dashboard
  { label: "Overview", href: "/dashboard", icon: "mdi:view-dashboard", roles: ["user"] },
  { label: "Hub", href: "/dashboard/hub", icon: "mdi:apps", roles: ["user"] },
  { label: "Verify: GST", href: "/dashboard/verify/gst", icon: "mdi:receipt", roles: ["user"] },
  { label: "Verify: PAN", href: "/dashboard/verify/pan", icon: "mdi:id-card", roles: ["user"] },
  { label: "Verify: Aadhaar", href: "/dashboard/verify/aadhaar", icon: "mdi:card-account-details", roles: ["user"] },
  { label: "Verify: Passport", href: "/dashboard/verify/passport", icon: "mdi:passport", roles: ["user"] },
  { label: "Verify: DIN", href: "/dashboard/verify/din", icon: "mdi:account-badge", roles: ["user"] },
  { label: "Verify: MCA", href: "/dashboard/verify/mca", icon: "mdi:domain", roles: ["user"] },
  { label: "Verify: Bank", href: "/dashboard/verify/bank", icon: "mdi:bank", roles: ["user"] },
  { label: "All-in-One", href: "/dashboard/verify/all-in-one", icon: "mdi:vector-combine", roles: ["user"] },
  { label: "Bulk Upload", href: "/dashboard/bulk-upload", icon: "mdi:upload", roles: ["user"] },
  { label: "Reports", href: "/dashboard/reports", icon: "mdi:file-chart", roles: ["user"] },
  { label: "Billing", href: "/dashboard/billing", icon: "mdi:credit-card-outline", roles: ["user"] },
  { label: "Integrations", href: "/dashboard/integrations", icon: "mdi:puzzle-outline", roles: ["user"] },
  { label: "Notifications", href: "/dashboard/notifications", icon: "mdi:bell-outline", roles: ["user"] },
  { label: "Settings", href: "/dashboard/settings", icon: "mdi:cog-outline", roles: ["user"] },
  { label: "Support", href: "/dashboard/support", icon: "mdi:lifebuoy", roles: ["user"] },
];

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const role: AllowedRole = "user";
  const pathname = usePathname();

  const items = useMemo(() => navItems.filter(n => n.roles.includes(role)), [role]);

  return (
    <aside className="h-full border-r border-neutral-200/70 bg-white/70 backdrop-blur">
      <div className="px-2 py-3">
        <p className="px-2 text-[11px] uppercase tracking-wide text-neutral-500">Navigation</p>
      </div>
      <nav className="px-2 pb-4 space-y-1">
        {items.map(it => {
          const active = pathname === it.href || (it.href !== "/" && pathname.startsWith(it.href));
          return (
            <Link key={it.href} href={it.href} className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition ${active ? "bg-orange-50 text-orange-700 border border-orange-200" : "hover:bg-neutral-100"}`}>
              <Icon icon={it.icon} width={18} />
              {!collapsed && <span>{it.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
