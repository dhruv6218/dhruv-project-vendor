"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Post = {
  title: string;
  content: string;
  image?: string | null;
  date?: string | { seconds: number; nanoseconds: number };
  tags?: string[];
  company?: string | null;
};

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "post";
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch(`/api/blog?slug=${encodeURIComponent(slug.toString())}`);
      if (!res.ok) return;
      const data = await res.json();
      if (mounted) setPost(data as Post);
    })();
    return () => { mounted = false; };
  }, [slug]);

  return (
    <article className="mx-auto max-w-3xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-semibold">{post?.title || slug.toString().replace(/-/g, " ")}</h1>
      {post?.company && <p className="text-sm text-[#64748B] mt-2">By {post.company}</p>}
      {post?.image && (
        <div className="mt-4">
          <img src={post.image} alt={post.title} className="rounded-xl w-full object-cover" />
        </div>
      )}

      <div className="prose prose-sm max-w-none mt-6 whitespace-pre-line">
        <p>
          <span>{post?.content || "In this article, we explore practical steps to strengthen vendor compliance while keeping workflows fast and reliable."}</span>
        </p>
      </div>
    </article>
  );
}
