"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";

export default function AdminSecurity() {
  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="Security" subtitle="IP allowlisting, SSO, and SCIM">
        <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div>
              <p className="font-medium">IP Allowlist</p>
              <textarea className="mt-1 px-3 py-2 rounded-md border border-neutral-200/70 w-full" rows={4} placeholder="203.0.113.0/24\n198.51.100.10" />
            </div>
            <div>
              <p className="font-medium">SSO</p>
              <button className="mt-1 px-3 py-2 rounded-md border border-neutral-200/70">Configure SAML</button>
            </div>
            <div>
              <p className="font-medium">SCIM Provisioning</p>
              <button className="mt-1 px-3 py-2 rounded-md border border-neutral-200/70">Enable SCIM</button>
            </div>
          </div>
        </div>
      </PageShell>
    </Protected>
  );
}
