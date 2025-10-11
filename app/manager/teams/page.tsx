"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useEffect, useState } from "react";

interface Team {
  id: string;
  name: string;
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Seed with a couple of example teams
    const t = [
      { id: "T-1001", name: "Compliance" },
      { id: "T-1002", name: "Operations" },
    ];
    const timer = setTimeout(() => setTeams(t), 200);
    return () => clearTimeout(timer);
  }, []);

  const createTeam = async () => {
    if (!name) return;
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 500));
      setTeams((cur) => [{ id: `T-${Math.floor(Math.random()*9000)+1000}`, name }, ...cur]);
      setName("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected allowedRoles={["manager"]}>
      <PageShell title="Teams" subtitle="Manage your teams">
        <div className="mb-4 flex gap-2">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Team name" className="px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
          <button disabled={loading} onClick={createTeam} className="px-3 py-2 text-sm rounded-md text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#F97316,#1E3A8A)' }}>{loading ? 'Creating…' : 'Create Team'}</button>
        </div>
        <div className="space-y-2">
          {teams.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-md border border-neutral-200/70 bg-white/80 px-3 py-2 text-sm">
              <span>{t.name}</span>
              <span className="text-xs text-[#475569]">ID: {t.id}</span>
            </div>
          ))}
          {teams.length === 0 && (
            <div className="text-sm text-[#475569]">No teams yet.</div>
          )}
        </div>
      </PageShell>
    </Protected>
  );
}
