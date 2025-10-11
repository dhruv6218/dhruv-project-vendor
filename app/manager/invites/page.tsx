"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useEffect, useState } from "react";

interface Team { id: string; name: string }
interface Invite { id: string; email: string; status: string }

export default function Invites() {
  const [email, setEmail] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamId, setTeamId] = useState<string>("");
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = [ { id: "T-1001", name: "Compliance" }, { id: "T-1002", name: "Operations" } ];
    setTeams(t);
    setTeamId(t[0].id);
    setInvites([{ id: "INV-001", email: "new.user@company.com", status: "pending" }]);
  }, []);

  const sendInvite = async () => {
    if (!teamId || !email) return;
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 500));
      setInvites(cur => [{ id: `INV-${Math.floor(Math.random()*900)+100}`, email, status: "pending" }, ...cur]);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected allowedRoles={["manager"]}>
      <PageShell title="Invites" subtitle="Invite new members by email">
        <div className="flex flex-col gap-2 mb-3">
          <select value={teamId} onChange={(e)=>setTeamId(e.target.value)} className="px-3 py-2 rounded-md border border-neutral-200/70 text-sm">
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <div className="flex gap-2">
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@company.com" className="px-3 py-2 rounded-md border border-neutral-200/70 text-sm w-full" />
            <button disabled={loading} onClick={sendInvite} className="px-3 py-2 text-sm rounded-md text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#F97316,#1E3A8A)' }}>{loading ? 'Sending…' : 'Send Invite'}</button>
          </div>
        </div>
        <ul className="text-sm space-y-1">
          {invites.map(i => (<li key={i.id} className="rounded-md border border-neutral-200/70 bg-white/80 px-3 py-2">{i.status} • {i.email}</li>))}
          {invites.length === 0 && (<li className="text-sm text-[#475569]">No invites yet.</li>)}
        </ul>
      </PageShell>
    </Protected>
  );
}
