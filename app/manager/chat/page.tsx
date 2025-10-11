"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useState } from "react";

export default function TeamChat() {
  const [messages, setMessages] = useState<{from: string; text: string}[]>([
    { from: "Ananya", text: "RPT-1022 flagged for PAN mismatch." },
    { from: "Rohit", text: "I'll review invoice docs." },
  ]);
  const [text, setText] = useState("");

  return (
    <Protected allowedRoles={["manager"]}>
      <PageShell title="Team Chat" subtitle="Channels and file sharing for your team">
        <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
          <div className="h-56 overflow-auto space-y-2 text-sm">
            {messages.map((m, i) => (<div key={i} className="px-3 py-2 rounded-md bg-neutral-50"><strong>{m.from}:</strong> {m.text}</div>))}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Type a message" className="flex-1 px-3 py-2 rounded-md border border-neutral-200/70 text-sm" />
            <button onClick={()=>{ if(text){ setMessages([...messages, {from: 'You', text}]); setText(''); } }} className="px-3 py-2 text-sm rounded-md border border-neutral-200/70">Send</button>
          </div>
        </div>
      </PageShell>
    </Protected>
  );
}
