"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";
import React, { useState } from "react";

export default function ServiceUpload() {
  const [file, setFile] = useState<string>("");
  return (
    <Protected allowedRoles={["service"]}>
      <PageShell title="Upload Verification Results" subtitle="Upload CSV/PDF outputs for assigned orders">
        <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-200/70 cursor-pointer bg-white/90">
            <input type="file" className="hidden" onChange={(e)=>setFile(Array.from(e.target.files ?? [])[0]?.name || "")} />
            <span>Choose File</span>
          </label>
          {file && <p className="text-xs mt-2">Selected: {file}</p>}
          <div className="mt-3">
            <button className="px-3 py-2 text-sm rounded-md text-white" style={{ background: 'linear-gradient(135deg,#F97316,#1E3A8A)' }}>Upload</button>
          </div>
        </div>
      </PageShell>
    </Protected>
  );
}
