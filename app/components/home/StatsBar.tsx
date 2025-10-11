"use client";

import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/app/components/home/sampleData";

const ORANGE = "#F97316";
const NAVY = "#1E3A8A";

function useCountUp(enabled: boolean, end: number, durationMs = 1500) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (!enabled) return; 
    const start = performance.now();
    const step = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(end * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [enabled, end, durationMs]);
  return value;
}

function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const animated = useCountUp(inView, value);
  const display = suffix === "/5" ? (Math.min(value, Math.round(animated * 10) / 10)).toFixed(1) : Math.floor(animated).toString();
  return (
    <span ref={ref}>
      {display}{suffix || ""}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section aria-label="Key service statistics" className="py-8" style={{ background: NAVY }}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="text-xs text-white/80 mb-3" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>
          <span>Proof that scales with you</span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur p-4 text-white">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${NAVY})` }}>
                  <Icon icon={s.icon} width={18} color="#ffffff" />
                </div>
                <p className="text-xs opacity-85"><span>{s.label}</span></p>
              </div>
              <p className="mt-2 text-xl" style={{ fontFamily: 'var(--font-geist)', fontWeight: 600 }}>
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
