"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { CountUp } from "@/components/count-up";
import { HeroOven } from "@/components/hero-oven";
import { GrowthChart, InstallsChart } from "@/components/stat-charts";
import {
  ArrowRightIcon,
  BoltIcon,
  FlameIcon,
  LeafIcon,
  PackageIcon,
  ShieldIcon,
} from "@/components/icons";

const stats = [
  {
    value: 25,
    suffix: "+",
    label: "Years of manufacturing",
    chart: "growth" as const,
  },
  {
    value: 1200,
    suffix: "+",
    label: "Installations",
    chart: "installs" as const,
  },
];

const trustItems = [
  { icon: ShieldIcon, label: "ISO 9001 certified lines" },
  { icon: FlameIcon, label: "CE & UL approved" },
  { icon: PackageIcon, label: "Export to 41 countries" },
  { icon: LeafIcon, label: "Energy-efficient by design" },
  { icon: BoltIcon, label: "7-day dispatch" },
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let frame = 0;

    function apply() {
      frame = 0;
      const hero = heroRef.current;
      if (!hero) return;

      const progress = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || 1)));

      if (artworkRef.current) {
        artworkRef.current.style.transform = `scale(${1 + progress * 0.5})`;
        artworkRef.current.style.opacity = String(1 - progress * 0.85);
      }
      if (sloganRef.current) {
        sloganRef.current.style.transform = `translate3d(${-progress * 90}px, 0, 0)`;
        sloganRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.6));
      }
      if (statsRef.current) {
        statsRef.current.style.transform = `translate3d(${progress * 90}px, 0, 0)`;
        statsRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.6));
      }
      if (actionsRef.current) {
        actionsRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.8));
        actionsRef.current.style.transform = `translate3d(0, ${progress * 50}px, 0)`;
      }
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-white text-black">
      <div
        ref={heroRef}
        className="w-full px-6 pt-12 pb-10 sm:px-10 lg:px-12 lg:pt-16 xl:px-16"
      >
        {/* Row 1 — slogan | artwork | stats */}
        <div className="grid items-center gap-10 lg:grid-cols-14 lg:gap-4">
          {/* Left — slogan */}
          <div
            ref={sloganRef}
            className={cn(
              "will-change-transform lg:col-span-3",
              mounted ? "animate-rise" : "opacity-0",
            )}
            style={{ animationDelay: "80ms" }}
          >
            <span className="inline-flex items-center gap-2 border border-black/15 bg-white px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#E02027] uppercase">
              <span className="size-1.5 bg-[#E02027]" />
              Since 1999
            </span>

            <h1 className="mt-6 text-[2.4rem] leading-[0.98] font-semibold tracking-[-0.03em] text-black sm:text-5xl lg:text-[2.7rem] xl:text-[3.2rem]">
              Manufacturers,
              <span className="block">Traders,</span>
              <span className="block">Exporters &amp;</span>
              <span className="block font-display italic text-[#E02027]">
                Heating Solutions
              </span>
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-600">
              AMI Industries manufactures commercial ovens, cooking ranges and heating
              systems, then trades and exports them to kitchens in 41 countries —
              calibrated, certified and built to work for a decade.
            </p>
          </div>

          {/* Center — artwork */}
          <div
            ref={artworkRef}
            className={cn(
              "will-change-transform lg:col-span-8",
              mounted ? "animate-fade-up" : "opacity-0",
            )}
            style={{ animationDelay: "140ms" }}
          >
            <HeroOven className="relative aspect-1671/941 w-full" />
          </div>

          {/* Right — stats */}
          <div
            ref={statsRef}
            className={cn(
              "will-change-transform lg:col-span-3 lg:col-start-12",
              mounted ? "animate-rise" : "opacity-0",
            )}
            style={{ animationDelay: "220ms" }}
          >
            <p className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
              By the numbers
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              {stats.map((stat) => {
                const chart =
                  stat.chart === "growth" ? <GrowthChart /> : <InstallsChart />;
                const number = (
                  <dt className="font-display text-2xl font-semibold text-black lg:text-3xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dt>
                );
                const label = (
                  <p className="text-[10px] leading-tight font-semibold tracking-[0.12em] text-neutral-500 uppercase">
                    {stat.label}
                  </p>
                );

                return (
                  <div
                    key={stat.label}
                    className="flex aspect-3/4 flex-col border border-black/10 bg-white p-4"
                  >
                    {stat.chart === "growth" ? (
                      <>
                        <dd className="h-1/2 w-full">{chart}</dd>
                        <div className="mt-auto">{number}</div>
                        <div className="mt-1">{label}</div>
                      </>
                    ) : (
                      <>
                        {label}
                        <div className="mt-2">{number}</div>
                        <dd className="mt-auto h-1/2 w-full pt-3">{chart}</dd>
                      </>
                    )}
                  </div>
                );
              })}
            </dl>
          </div>
        </div>

        {/* Row 2 — actions */}
        <div
          ref={actionsRef}
          className={cn(
            "mt-12 flex flex-col items-center gap-3",
            mounted ? "animate-rise" : "opacity-0",
          )}
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#products"
              className="group inline-flex items-center gap-2 bg-[#E02027] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-black"
            >
              Shop Now
              <ArrowRightIcon className="size-4 text-white" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 border border-black px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-black hover:text-white"
            >
              Talk to Sales
            </Link>
          </div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-neutral-500 uppercase">
            Move your cursor over the drawing
          </p>
        </div>
      </div>

      {/* Trust ticker — black, top-rounded, scrolling display type */}
      <div className="relative overflow-hidden rounded-t-[1.75rem] bg-black py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] sm:py-9">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10 sm:gap-14" aria-hidden={copy === 1}>
              {trustItems.map(({ icon: Icon, label }, index) => (
                <span
                  key={label}
                  className={cn(
                    "flex items-center gap-4 font-display text-4xl italic whitespace-nowrap sm:text-5xl lg:text-6xl",
                    index % 2 === 0 ? "text-white" : "text-[#E02027]",
                  )}
                >
                  <Icon className="size-8 shrink-0 sm:size-10 lg:size-12" />
                  {label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
