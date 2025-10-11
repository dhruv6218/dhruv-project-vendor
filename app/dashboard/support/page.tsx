"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useState } from "react";

export default function Support() {
  const [tickets] = useState([{ id: "TCK-101", subject: "PAN mismatch", status: "Open" }]);
  return (
    <Protected allowedRoles={["user"]}>
      <PageShell title="Support" subtitle="Chat with us, read the FAQ, or submit a ticket">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Chatbot</p>
            <p className="text-xs text-neutral-600">Use the chat widget in the bottom-right corner to start a conversation.</p>
            <a href="/dashboard/support/live-chat" className="inline-block mt-2 text-xs px-3 py-1.5 rounded-full text-white" style={{ background: 'linear-gradient(135deg,#F97316,#1E3A8A)' }}>
              <span>Open Live Chat</span>
            </a>
          </div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Ticket</p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <input className="px-3 py-2 rounded-md border border-neutral-200/70" placeholder="Subject" />
              <select className="px-3 py-2 rounded-md border border-neutral-200/70">
                <option>General</option>
                <option>Technical</option>
                <option>Billing</option>
              </select>
              <textarea className="md:col-span-2 px-3 py-2 rounded-md border border-neutral-200/70" rows={4} placeholder="Describe your issue" />
              <input className="md:col-span-2 text-sm" type="file" multiple />
            </div>
            <button className="mt-3 px-3 py-2 text-sm rounded-md text-white" style={{ background: 'linear-gradient(135deg,#F97316,#1E3A8A)' }}>Submit Ticket</button>
          </div>
          <div className="md:col-span-2 rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">My Tickets</p>
            <ul className="mt-2 text-sm space-y-1">
              {tickets.map(t => (<li key={t.id} className="flex items-center justify-between rounded border border-neutral-200/70 px-3 py-2"><span>{t.id} • {t.subject}</span><span className="text-xs text-neutral-600">{t.status}</span></li>))}
            </ul>
          </div>
        </div>
      </PageShell>
    </Protected>
  );
}
