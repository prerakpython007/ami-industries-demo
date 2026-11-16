"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import footerBg from "../../public/footer-bg.png";

export function FooterImageStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const scrollLayerRef = useRef<HTMLDivElement>(null);
  const cursorLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let scrollProgress = 0;

    function apply() {
      frame = 0;
      const scrollLayer = scrollLayerRef.current;
      const cursorLayer = cursorLayerRef.current;
      if (scrollLayer && cursorLayer) {
        scrollLayer.style.transform = `translate3d(0, ${(1 - scrollProgress) * 100}%, 0)`;
      }
    }

    function schedule() {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    }

    function onScroll() {
      const strip = stripRef.current;
      if (!strip) return;
      const rect = strip.getBoundingClientRect();
      scrollProgress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / (rect.height || 1)),
      );
      schedule();
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={stripRef}
      className="relative aspect-16/3 w-full overflow-hidden bg-white perspective-[1400px]"
    >
      <div ref={scrollLayerRef} className="absolute inset-0 z-10 will-change-transform">
        <div
          ref={cursorLayerRef}
          className="absolute inset-0 will-change-transform"
          style={{
            transform:
              "translate3d(calc(var(--px, 0px) * 0.085), calc(var(--py, 0px) * 0.035), 0) rotateY(var(--rx, 0deg))",
            transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="absolute left-1/2 top-0 h-[200%] w-auto -translate-x-1/2">
            <div className="relative h-full w-auto">
              <Image
                src={footerBg}
                alt="AMI Industries ProLine commercial convection oven"
                width={877}
                height={549}
                className="block h-full w-auto"
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
