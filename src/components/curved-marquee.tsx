"use client";

import { useEffect, useRef, useState } from "react";
import { Testimonials } from "@/components/testimonials";

function ArcTicker({
  id,
  d,
  text,
  fill,
  fontSize = 96,
  reverse = false,
  speed = 26,
}: {
  id: string;
  d: string;
  text: string;
  fill: string;
  fontSize?: number;
  reverse?: boolean;
  speed?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const [shift, setShift] = useState(0);
  const [duration, setDuration] = useState(speed);

  useEffect(() => {
    let cancelled = false;

    function measure() {
      const path = pathRef.current;
      const label = measureRef.current;
      if (!path || !label) return;

      const phraseLength = label.getComputedTextLength();
      const pathLength = path.getTotalLength();
      if (!phraseLength || !pathLength) return;

      const percent = (phraseLength / pathLength) * 100;
      setShift(percent);
      setDuration((percent / 100) * speed);
    }

    async function start() {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (cancelled) return;
      measure();
      window.addEventListener("resize", measure);
    }

    start();
    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
  }, [speed]);

  return (
    <>
      <defs>
        <path ref={pathRef} id={id} d={d} />
      </defs>

      <text
        suppressHydrationWarning
        fill={fill}
        fontSize={fontSize}
        fontWeight="600"
        fontStyle="italic"
        fontFamily="var(--font-fraunces), Georgia, serif"
      >
        <textPath href={`#${id}`}>
          {text.repeat(4)}
          {shift > 0 ? (
            <animate
              attributeName="startOffset"
              from={reverse ? `-${shift}%` : "0%"}
              to={reverse ? "0%" : `-${shift}%`}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          ) : null}
        </textPath>
      </text>

      <text
        ref={measureRef}
        visibility="hidden"
        fontSize={fontSize}
        fontWeight="600"
        fontStyle="italic"
        fontFamily="var(--font-fraunces), Georgia, serif"
      >
        {text}
      </text>
    </>
  );
}

export function CurvedMarquee() {
  return (
    <section className="relative overflow-hidden bg-white pt-12">
      {/* ticker 1 — arching up */}
      <div className="relative">
        <svg viewBox="0 0 1440 300" className="block w-full" aria-hidden="true">
          <ArcTicker
            id="nv-arc-1"
            d="M -220 220 Q 720 -40 1660 220"
            text="PRECISION HEAT · ±5°C · "
            fill="#E02027"
            speed={28}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
      </div>


      {/* testimonials, nested between the two arcs */}
      <div id="clients" className="relative z-10 -mt-20 scroll-mt-28">
        <Testimonials />
      </div>

      {/* ticker 2 — sagging down, opposite direction */}
      <div className="relative -mt-20">
        <svg viewBox="0 0 1440 300" className="block w-full" aria-hidden="true">
          <ArcTicker
            id="nv-arc-2"
            d="M -220 80 Q 720 340 1660 80"
            text="MANUFACTURERS · TRADERS · EXPORTERS · "
            fill="#000000"
            fontSize={78}
            reverse
            speed={34}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
      </div>

      {/* white fade on the bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-white/80 to-white" />
    </section>
  );
}
