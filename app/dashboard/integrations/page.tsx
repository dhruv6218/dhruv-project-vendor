"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useEffect, useState } from "react";

type ApiKey = { id: string; last4: string; createdAt: string; scope: string };
type Webhook = { id: string; url: string; events: string[] };

export default function Integrations() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [scope, setScope] = useState("read");
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [url, setUrl] = useState("");
  const [events, setEvents] = useState<string[]>(["verification.completed"]);

  useEffect(() => {
    setKeys([{ id: "key_123", last4: "abcd", createdAt: new Date().toISOString(), scope: "read" }]);
    setWebhooks([{ id: "wh_123", url: "https://example.com/webhooks/vendor", events: ["verification.completed"] }]);
  }, []);

  function createKey() {
    const newKey: ApiKey = { id: `key_${Math.random().toString(36).slice(2,8)}`, last4: Math.random().toString(36).slice(2,6), createdAt: new Date().toISOString(), scope };
    setKeys((cur) => [newKey, ...cur]);
  }
  function revokeKey(id: string) {
    setKeys((cur) => cur.filter(k => k.id !== id));
  }

  function addWebhook() {
    if (!url) return;
    const wh: Webhook = { id: `wh_${Math.random().toString(36).slice(2,8)}`, url, events };
    setWebhooks((cur) => [wh, ...cur]);
    setUrl("");
  }
  function testWebhook() {
    // no-op in demo
    alert("Test event queued (demo)");
  }

  return (
    <Protected allowedRoles={["user"]}>
      <PageShell title="Integrations" subtitle="Manage API keys, webhooks, and external storage">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">API Keys</p>
            <div className="mt-2 space-y-2 text-sm">
              {keys.map(k => (
                <div key={k.id} className="flex items-center justify-between rounded border border-neutral-200/70 px-2 py-2">
                  <span>sk_••••••••{k.last4}</span>
                  <button onClick={()=>revokeKey(k.id)} className="px-2 py-1 rounded border border-neutral-200/70">Revoke</button>
                </div>
              ))}
              {keys.length === 0 && <p className="text-neutral-500">No keys yet.</p>}
              <div className="pt-2 border-t border-neutral-200/70">
                <label className="text-xs text-neutral-600">Scope</label>
                <select value={scope} onChange={(e)=>setScope(e.target.value)} className="w-full px-2 py-2 rounded border border-neutral-200/70">
                  <option value="read">Read</option>
                  <option value="write">Write</option>
                  <option value="admin">Admin</option>
                </select>
                <button onClick={createKey} className="mt-2 w-full px-3 py-2 text-sm rounded-md border border-neutral-200/70">Generate Key</button>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Webhooks</p>
            <div className="mt-2 space-y-2 text-sm">
              {webhooks.map(w => (
                <div key={w.id} className="rounded border border-neutral-200/70 p-2">
                  <p className="truncate">{w.url}</p>
                  <p className="text-xs text-neutral-600">{w.events.join(", ")}</p>
                  <button onClick={()=>testWebhook()} className="mt-1 px-2 py-1 rounded border border-neutral-200/70">Send Test</button>
                </div>
              ))}
              <div className="pt-2 border-t border-neutral-200/70">
                <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="https://..." className="w-full px-2 py-2 rounded border border-neutral-200/70" />
                <p className="text-xs text-neutral-600 mt-1">Events</p>
                <div className="flex flex-wrap gap-2 text-xs mt-1">
                  {[
                    "verification.started",
                    "verification.completed",
                    "invoice.paid",
                    "invoice.payment_failed"
                  ].map(ev => (
                    <label key={ev} className="inline-flex items-center gap-1 border rounded px-2 py-1">
                      <input type="checkbox" checked={events.includes(ev)} onChange={(e)=>setEvents(prev => e.target.checked ? [...prev, ev] : prev.filter(x => x !== ev))} />
                      <span>{ev}</span>
                    </label>
                  ))}
                </div>
                <button onClick={addWebhook} className="mt-2 w-full px-3 py-2 text-sm rounded-md border border-neutral-200/70">Add Webhook</button>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Connectors</p>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex items-center justify-between"><span>Google Drive</span><button className="px-2 py-1 rounded border border-neutral-200/70">Connect</button></div>
              <div className="flex items-center justify-between"><span>Slack</span><button className="px-2 py-1 rounded border border-neutral-200/70">Connect</button></div>
              <div className="flex items-center justify-between"><span>Zapier</span><button className="px-2 py-1 rounded border border-neutral-200/70">Connect</button></div>
            </div>
          </div>
        </div>
      </PageShell>
    </Protected>
  );
}
