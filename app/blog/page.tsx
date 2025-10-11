"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { BLOG } from "@/app/components/home/sampleData";

const PHOENIX = "/logo.svg";

type Post = {
  id: string;
  slug: string;
  title: string;
  content?: string;
  image?: string | null;
  date?: string | { seconds: number; nanoseconds: number };
  tags?: string[];
  company?: string | null;
};

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const items: Post[] = BLOG.map((b, i) => ({ id: String(i + 1), slug: b.slug, title: b.title, content: b.excerpt, image: PHOENIX }));

  const filtered = useMemo(() => {
    let arr = items.filter((p) => (p.title + " " + (p.content || "")).toLowerCase().includes(query.toLowerCase()));
    if (sortBy === "recent") arr = arr; // client-only demo
    return arr;
  }, [items, query, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Learn About Vendor Fraud &amp; Compliance</h1>
        <p className="text-sm text-[#475569] mt-2">Expert guides and best practices. Submit your insights below.</p>
        <div className="mt-3">
          <Link href="/blog/submit" className="text-sm px-4 py-2 rounded-full text-white" style={{ background: "linear-gradient(135deg, #F97316, #1E3A8A)" }}>Submit a Post</Link>
        </div>
      </header>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">Search blogs</label>
          <input id="search" placeholder="Search blogs by topic…" value={query} onChange={(e)=>setQuery(e.target.value)} className="w-full text-sm px-4 py-2 rounded-xl border border-neutral-200/70" />
        </div>
        <div className="flex gap-2">
          <select aria-label="Sort posts" value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="text-sm px-3 py-2 rounded-xl border border-neutral-200/70">
            <option value="recent">Most Recent</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-[#64748B] mt-3">New articles added regularly. Stay informed and ahead.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filtered.map((p) => (
          <article key={p.id} className="p-0 rounded-2xl border border-neutral-200/70 bg-white/60 backdrop-blur overflow-hidden group">
            <div className="aspect-video overflow-hidden">
              <img loading="lazy" src={p.image || PHOENIX} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            </div>
            <div className="p-5">
              <h3 className="text-sm font-medium mt-1">{p.title}</h3>
              {p.company && <p className="text-[11px] text-[#1E3A8A] mt-1">{p.company}</p>}
              <p className="text-xs text-[#475569] mt-2">{(p.content || "").slice(0, 140)}...</p>
              <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-1 mt-3 text-xs text-[#1E3A8A]">
                <span>Read More</span>
                <Icon icon="mdi:arrow-right" width={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
