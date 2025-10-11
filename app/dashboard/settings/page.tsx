"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useEffect, useState } from "react";

export default function Settings() {
  const [twoFA, setTwoFA] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [wl, setWl] = useState({ primary: "#F97316", secondary: "#1E3A8A", footer: "© Your Company" });
  const [sessions] = useState([{ id: "sess_1", device: "Chrome • Mac", last: "Just now" }, { id: "sess_2", device: "iPhone", last: "2 days ago" }]);

  function save2FA(enabled: boolean) {
    setTimeout(() => {
      setTwoFA(enabled);
      setMsg(`Two-factor ${enabled ? "enabled" : "disabled"}.`);
    }, 400);
  }

  function updateBranding() {
    setMsg("Branding updated.");
  }
  function logoutAll() {
    setMsg("Logged out from all sessions.");
  }

  useEffect(() => { setMsg(null); }, [twoFA]);

  return (
    <Protected allowedRoles={["user"]}>
      <PageShell title="Settings" subtitle="Profile, security, and preferences">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Profile</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <label className="text-xs text-neutral-600">Full Name</label>
                <input className="w-full px-3 py-2 rounded-md border border-neutral-200/70" placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs text-neutral-600">Company</label>
                <input className="w-full px-3 py-2 rounded-md border border-neutral-200/70" placeholder="Company" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Security</p>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Two-factor authentication</span>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={twoFA} onChange={(e)=> { setTwoFA(e.target.checked); save2FA(e.target.checked); }} />
                <span>{twoFA ? 'Enabled' : 'Disabled'}</span>
              </label>
            </div>
            {msg && <p className="text-xs mt-2">{msg}</p>}
            {!twoFA && (
              <div className="mt-2 text-xs text-amber-700">Finish setup: Enable 2FA to access manager/admin features.</div>
            )}
            <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
              <label className="text-xs text-neutral-600">Change password</label>
              <input placeholder="Old password" type="password" className="px-3 py-2 rounded-md border border-neutral-200/70" />
              <input placeholder="New password" type="password" className="px-3 py-2 rounded-md border border-neutral-200/70" />
              <input placeholder="Confirm new password" type="password" className="px-3 py-2 rounded-md border border-neutral-200/70" />
              <button className="px-3 py-2 rounded-md border border-neutral-200/70">Update Password</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Login sessions</p>
            <ul className="mt-2 text-sm space-y-1">
              {sessions.map(s => (<li key={s.id} className="flex items-center justify-between rounded border border-neutral-200/70 px-3 py-2"><span>{s.device}</span><span className="text-xs text-neutral-600">{s.last}</span></li>))}
            </ul>
            <button onClick={logoutAll} className="mt-2 px-3 py-2 text-sm rounded-md border border-neutral-200/70">Logout from all</button>
          </div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">White‑label branding</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <label className="text-xs text-neutral-600">Primary color</label>
                <input type="color" value={wl.primary} onChange={(e)=>setWl(p=>({...p,primary:e.target.value}))} className="w-full h-9 rounded border border-neutral-200/70" />
              </div>
              <div>
                <label className="text-xs text-neutral-600">Secondary color</label>
                <input type="color" value={wl.secondary} onChange={(e)=>setWl(p=>({...p,secondary:e.target.value}))} className="w-full h-9 rounded border border-neutral-200/70" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-neutral-600">PDF footer</label>
                <input value={wl.footer} onChange={(e)=>setWl(p=>({...p,footer:e.target.value}))} className="w-full px-3 py-2 rounded-md border border-neutral-200/70" />
              </div>
            </div>
            <button onClick={updateBranding} className="mt-2 px-3 py-2 text-sm rounded-md border border-neutral-200/70">Save Branding</button>
          </div>
        </div>
      </PageShell>
    </Protected>
  );
}
