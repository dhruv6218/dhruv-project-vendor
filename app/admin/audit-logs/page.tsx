"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useEffect, useState } from "react";

interface Log { id: string; action: string; entity: string; createdAt?: string }

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    setLogs([
      { id: "1", action: "login", entity: "user: demo@ravono.co" , createdAt: new Date().toISOString() },
      { id: "2", action: "export_report", entity: "report:RPT-1023" , createdAt: new Date().toISOString() }
    ]);
  }, []);

  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="Audit Logs" subtitle="Security logs for logins, data access, and role changes">
        <ul className="text-sm space-y-1">
          {logs.map(l => (
            <li key={l.id}>{l.createdAt ? `${l.createdAt} • ` : ""}{l.action} • {l.entity}</li>
          ))}
          {logs.length === 0 && <li className="text-neutral-500">No logs yet.</li>}
        </ul>
      </PageShell>
    </Protected>
  );
}
