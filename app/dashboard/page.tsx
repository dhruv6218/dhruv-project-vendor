"use client";

import PageShell from "@/app/components/dashboard/PageShell";
import DataTable from "@/app/components/ui/DataTable";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useI18n } from "@/app/components/i18n/LanguageProvider";

interface Row {
  date: string;
  vendor: string;
  check: string;
  status: string;
  risk: number;
  reason: string;
}

export default function DashboardOverview() {
  const { t } = useI18n();
  const columns = [
    { key: "date", header: "Date" },
    { key: "vendor", header: "Vendor" },
    { key: "check", header: "Check" },
    { key: "status", header: "Status" },
    { key: "risk", header: "Risk Score" },
    { key: "reason", header: "Reason" },
  ] as const;

  const data: Row[] = [
    { date: "2025-10-02 09:12", vendor: "Shree Logistics Pvt Ltd", check: "GST", status: "Verified", risk: 7, reason: "GSTIN active; filings on time" },
    { date: "2025-10-02 08:55", vendor: "Apex Supplies", check: "Bank", status: "Match", risk: 18, reason: "Account holder matches PAN" },
    { date: "2025-10-01 19:03", vendor: "Neo Components", check: "PAN", status: "Mismatch", risk: 74, reason: "PAN name mismatch vs invoice" },
    { date: "2025-10-01 15:40", vendor: "Kamal Traders", check: "Aadhaar", status: "Verified", risk: 12, reason: "VID verified via OTP" },
    { date: "2025-10-01 12:10", vendor: "Bright Textiles", check: "MCA", status: "Found", risk: 22, reason: "Active, no charges" },
  ];

  return (
    <PageShell title="Dashboard" subtitle="Overview of your vendor verifications and risks">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
        {[
          { label: t("dashboard.kpi.verifications"), value: "248", icon: "mdi:check-decagram" },
          { label: t("dashboard.kpi.credits"), value: "752", icon: "mdi:database-outline" },
          { label: t("dashboard.kpi.success"), value: "92%", icon: "mdi:percent-outline" },
          { label: t("dashboard.kpi.team"), value: "5", icon: "mdi:account-multiple-outline" },
          { label: t("dashboard.kpi.pending"), value: "2", icon: "mdi:clock-outline" },
        ].map((c) => (
          <div key={c.label} className="rounded-lg border border-neutral-200/70 bg-white/80 p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-neutral-600">{c.label}</p>
              <Icon icon={c.icon} width={18} />
            </div>
            <p className="text-lg mt-1" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-3 mb-4">
        <p className="text-sm" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>{t("dashboard.quick.title")}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link href="/dashboard/verify/all-in-one" className="px-3 py-1.5 text-xs rounded-md border border-neutral-200/70">{t("dashboard.quick.new")}</Link>
          <Link href="/dashboard/bulk-upload" className="px-3 py-1.5 text-xs rounded-md border border-neutral-200/70">{t("dashboard.quick.bulk")}</Link>
          <Link href="/manager/invites" className="px-3 py-1.5 text-xs rounded-md border border-neutral-200/70">{t("dashboard.quick.invite")}</Link>
          <Link href="/dashboard/reports" className="px-3 py-1.5 text-xs rounded-md border border-neutral-200/70">{t("dashboard.quick.reports")}</Link>
        </div>
      </div>

      <div>
        <p className="text-sm mb-2" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>Recent activity</p>
        <DataTable<Row> columns={columns as unknown as { key: keyof Row; header: string }[]} data={data} />
      </div>
    </PageShell>
  );
}
