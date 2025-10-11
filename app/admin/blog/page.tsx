"use client";

import Protected from "@/app/components/auth/Protected";
import PageShell from "@/app/components/dashboard/PageShell";

export default function AdminBlog() {
  return (
    <Protected allowedRoles={["admin"]}>
      <PageShell title="Blog Management" subtitle="Add, edit, and publish posts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">New Post</p>
            <div className="mt-2 grid grid-cols-1 gap-2 text-sm">
              <input className="px-3 py-2 rounded-md border border-neutral-200/70" placeholder="Title" />
              <input className="px-3 py-2 rounded-md border border-neutral-200/70" placeholder="Subject" />
              <input className="px-3 py-2 rounded-md border border-neutral-200/70" placeholder="Company" />
              <textarea className="px-3 py-2 rounded-md border border-neutral-200/70" rows={6} placeholder="Content" />
              <button className="px-3 py-2 text-sm rounded-md text-white w-max" style={{ background: 'linear-gradient(135deg,#F97316,#1E3A8A)' }}>Save Draft</button>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200/70 bg-white/80 p-4">
            <p className="text-sm font-medium">Existing Posts</p>
            <ul className="mt-2 text-sm space-y-1">
              <li>How to Detect a Shell Vendor Quickly • Draft</li>
              <li>5 Essential Checks Before Onboarding a Vendor • Published</li>
              <li>Bank Verification Best Practices • Published</li>
            </ul>
          </div>
        </div>
      </PageShell>
    </Protected>
  );
}
