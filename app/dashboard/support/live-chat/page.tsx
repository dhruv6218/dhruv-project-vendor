"use client";

import React, { useState } from "react";
import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import AIWidget from "@/app/components/AIWidget";
import Link from "next/link";

export default function LiveChatPage() {
  return (
    <Protected allowedRoles={["manager", "admin", "service"]}>
      <PageShell title="Live Chat" subtitle="Instant chat support (eligible plans only)">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 space-y-3">
            <ChatArea />
          </div>
          <div className="space-y-3">
            <PlanGateNotice />
            <AIWidget />
          </div>
        </div>
      </PageShell>
    </Protected>
  );
}

function ChatArea() {
  const [messages, setMessages] = useState<Array<{ from: string; text: string }>>([
    { from: "Agent", text: "Hi! How can we help today?" },
  ]);
  const [text, setText] = useState("");

  return (
    <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
      <div className="h-72 overflow-auto space-y-2 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={`px-3 py-2 rounded-md ${m.from === "You" ? "bg-orange-50" : "bg-neutral-50"}`}>
            <strong>{m.from}: </strong>
            <span>{m.text}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message"
          className="flex-1 px-3 py-2 rounded-md border border-neutral-200/70 text-sm"
        />
        <button
          onClick={() => {
            if (!text.trim()) return;
            setMessages((cur) => [...cur, { from: "You", text }]);
            setText("");
          }}
          className="px-3 py-2 text-sm rounded-md text-white"
          style={{ background: "linear-gradient(135deg,#F97316,#1E3A8A)" }}
        >
          <span>Send</span>
        </button>
      </div>
    </div>
  );
}

function PlanGateNotice() {
  return (
    <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4 text-sm">
      <p className="font-medium"><span>Upgrade for Live Chat</span></p>
      <p className="text-xs text-neutral-600 mt-1"><span>Live chat is available on Professional (Manager) and Business (Admin) plans. Upgrade to unlock instant support.</span></p>
      <Link href="/pricing" className="mt-2 inline-block text-xs px-3 py-1.5 rounded-full text-white" style={{ background: "linear-gradient(135deg,#F97316,#1E3A8A)" }}>
        <span>View Plans</span>
      </Link>
    </div>
  );
}
