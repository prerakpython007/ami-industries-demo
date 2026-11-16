"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import outlineOven from "../../public/hero banner/outline-oven.png";
import photoOven from "../../public/hero banner/oven-render.png";
import { cn } from "@/lib/utils";

type Pt = [number, number];

/* Closed Catmull-Rom spline -> cubic bezier path */
function smoothClosedPath(points: Pt[]) {
  const n = points.length;
  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d +=
      ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)},` +
      ` ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

function blobPoints(
  cx: number,
  cy: number,
  radius: number,
  time: number,
  stretch: number,
  count: number,
  wobble: number,
): Pt[] {
  const points: Pt[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const ripple =
      1 +
      wobble * Math.sin(angle * 3 + time * 2.1) +
      wobble * 0.6 * Math.sin(angle * 5 - time * 1.6);
    const rx = radius * ripple * (1 + stretch);
    const ry = radius * ripple * (1 - stretch * 0.55);
    points.push([cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry]);
  }
  return points;
}

export function HeroOven({ className }: { className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const drop = useRef({ x: 0, y: 0 });
  const frameId = useRef(0);
  const started = useRef(false);

  useEffect(() => () => cancelAnimationFrame(frameId.current), []);

  const tick = useCallback(function frameLoop() {
    const frame = frameRef.current;
    const clip = clipRef.current;
    if (!frame || !clip) return;

    const rect = frame.getBoundingClientRect();
    const radius = Math.max(64, Math.min(rect.width, rect.height) * 0.17);

    current.current.x += (target.current.x - current.current.x) * 0.18;
    current.current.y += (target.current.y - current.current.y) * 0.18;
    drop.current.x += (target.current.x - drop.current.x) * 0.07;
    drop.current.y += (target.current.y - drop.current.y) * 0.07;

    const vx = target.current.x - current.current.x;
    const vy = target.current.y - current.current.y;
    const speed = Math.hypot(vx, vy);
    const stretch = Math.min(0.45, speed / (radius * 0.8));
    const time = performance.now() / 1000;

    const body = blobPoints(
      current.current.x,
      current.current.y,
      radius,
      time,
      stretch,
      9,
      0.13,
    );
    const droplet = blobPoints(
      drop.current.x,
      drop.current.y,
      radius * 0.3,
      time * 1.3,
      0,
      7,
      0.18,
    );

    clip.style.clipPath = `path('${smoothClosedPath(body)} ${smoothClosedPath(droplet)}')`;

    frameId.current = requestAnimationFrame(frameLoop);
  }, []);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    target.current.x = event.clientX - rect.left;
    target.current.y = event.clientY - rect.top;
    if (!started.current) {
      started.current = true;
      current.current = { ...target.current };
      drop.current = { ...target.current };
    }
  }

  function handleEnter(event: React.MouseEvent<HTMLDivElement>) {
    const clip = clipRef.current;
    handleMove(event);
    if (clip) clip.style.opacity = "1";
    cancelAnimationFrame(frameId.current);
    frameId.current = requestAnimationFrame(tick);
  }

  function handleLeave() {
    const clip = clipRef.current;
    if (clip) clip.style.opacity = "0";
    cancelAnimationFrame(frameId.current);
    frameId.current = 0;
    started.current = false;
  }

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn("relative", className)}
    >
      <Image
        src={outlineOven}
        alt="AMI Industries ProLine X900 commercial convection oven — technical drawing"
        priority
        className="pointer-events-none absolute inset-0 size-full object-contain"
      />

      <div
        ref={clipRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out"
        style={{
          clipPath: "path('M0 0 Z')",
          willChange: "clip-path, opacity",
        }}
      >
        <Image
          src={photoOven}
          alt=""
          className="size-full object-contain"
        />
      </div>
    </div>
  );
}
