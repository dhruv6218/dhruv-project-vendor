"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useEffect, useState } from "react";

interface KeyItem { id: string; name: string; key_prefix: string; key_last_four: string; status: string }

export default function AdminApiKeys() {
  const [items, setItems] = useState<KeyItem[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setItems([{ id: "k1", name: "Backend", key_prefix: "sk_", key_last_four: "abcd", status: "active" }]);
  }, []);

  function createKey() {
    if (!name) { setMsg("Name required"); return; }
    const last4 = Math.random().toString(36).slice(2,6);
    setItems(cur => [{ id: `k_${Date.now()}`, name, key_prefix: "sk_", key_last_four: last4, status: "active" }, ...cur]);
    setMsg(`Created: sk_••••••••${last4}`);
    setName("");
  }

  function rotate(id: string) {
    const last4 = Math.random().toString(36).slice(2,6);
    setItems(cur => cur.map(k => k.id === id ? { ...k, key_last_four: last4 } : k));
    setMsg(`Rotated: sk_••••••••${last4}`);
  }

  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="API Keys" subtitle="Manage verification API keys with rotation">
        <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
          <div className="text-sm mb-2">Create new key</div>
          <div className="flex items-center gap-2">
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="px-3 py-2 text-sm rounded-md border border-neutral-200/70" />
            <button onClick={createKey} className="px-3 py-2 text-sm rounded-md border border-neutral-200/70">Create</button>
          </div>
          {msg && <p className="text-xs mt-2">{msg}</p>}
          <div className="mt-4 text-sm">
            {items.map(it => (
              <div key={it.id} className="flex items-center justify-between border-t py-2">
                <div>
                  <div>{it.name}</div>
                  <div className="text-xs text-neutral-600">{it.key_prefix}••••••••{it.key_last_four} • {it.status}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => rotate(it.id)} className="px-3 py-2 text-sm rounded-md border border-neutral-200/70">Rotate</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageShell>
    </Protected>
  );
}
