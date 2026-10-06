"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: string;
  label: string;
}

/** Split "$400K+" → { prefix:"$", target:400, suffix:"K+" }, "66" → {target:66} */
function parseValue(v: string) {
  const m = v.match(/^(\D*)([\d.,\s]+)(.*)$/);
  if (!m) return { prefix: "", target: 0, suffix: v };
  return {
    prefix: m[1] ?? "",
    target: parseFloat(m[2].replace(/[\s,]/g, "")) || 0,
    suffix: m[3] ?? "",
  };
}

function StatCell({
  stat,
  start,
  delay,
}: {
  stat: Stat;
  start: boolean;
  delay: number;
}) {
  const { prefix, target, suffix } = parseValue(stat.value);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let t0: number | undefined;
    const duration = 1400;
    const timer = setTimeout(() => {
      const tick = (now: number) => {
        if (t0 === undefined) t0 = now;
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setVal(target * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [start, target, delay]);

  const display = prefix + Math.round(val).toLocaleString("en-US") + suffix;

  return (
    <div className="group relative bg-ink px-6 py-10 text-center transition-colors duration-300 hover:bg-white/[0.035]">
      <div className="text-5xl font-black tracking-tight text-brand transition-transform duration-300 group-hover:-translate-y-1.5 sm:text-6xl">
        {display}
      </div>
      <div className="mx-auto mt-4 h-[3px] w-8 rounded-full bg-brand/30 transition-all duration-300 group-hover:w-16 group-hover:bg-brand" />
      <div className="mt-4 text-sm font-semibold uppercase tracking-wider text-white/60 transition-colors duration-300 group-hover:text-white/85">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsBand({
  title,
  stats,
}: {
  title: string;
  stats: Stat[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-ink text-white">
      <div className="absolute inset-0 bg-matrix opacity-[0.12]" aria-hidden />
      <div
        className="absolute left-1/2 top-0 h-56 w-[40rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
        aria-hidden
      />
      <div ref={ref} className="container-px relative py-14">
        <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.3em] text-brand">
          {title}
        </p>
        <div className="mx-auto grid max-w-4xl gap-px overflow-hidden rounded-brand border border-white/10 bg-white/10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <StatCell key={s.label} stat={s} start={inView} delay={i * 160} />
          ))}
        </div>
      </div>
    </section>
  );
}
