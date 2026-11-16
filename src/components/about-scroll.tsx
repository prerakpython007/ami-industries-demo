"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ───────── tunables ───────── */
const LOGO_SRC = "/logo.png"; // public folder wali logo file ka path (public/ likhna nahi hai)
const PANEL_IMG = "/about/about-oven.png"; // band ke right side wali image (red overlay iske upar lagta hai). Factory photo ho to wo daalo

/* truck image ke andar white container ka box (truck ki width/height ka fraction).
   Oven aur logo dono isi box ke andar rehte hain.
   NOTE: truck CSS se flip hota hai (-scale-x-100), isliye box ka X already mirrored hona chahiye */
const BOX = { x: 0.04, y: 0.1, w: 0.68, h: 0.55 };
const LOGO_W = 0.42; // logo panel ki kitni width lega

const SMOOTHING = 0.11; // 0.03 = very floaty/slow, 0.15 = snappy
const OVEN_Y_VH = -4; // oven ki position (vh from centre). negative = upar
const OVEN_STOP_VH = 0; // panel ke andar oven kitna upar rukega
const OVEN_ENTER_LEN = 0.1; // section me aate hi oven kitna upar se aata hai
const TRUCK_BOTTOM = "22%"; // truck ki height from bottom
const OFFSCREEN_VW = 110; // truck right side kitna jaye
const TRUCK_START_VH = 100; // truck shuru me screen ke kitna neeche
const SHADOW_BOTTOM = "-1%"; // truck ke neeche red shadow ki position
const BAND_TRAVEL_VH = 90; // band screen ke kitna bahar se aata/jaata hai

const TRAIL_ENABLED = true; // false karo to red trace band
const TRAIL_MIN = 280; // minimum trace length (px)
const TRAIL_STRENGTH = 3; // scroll speed ke hisaab se extra length
const TRAIL_MAX = 720; // max trace length (px)
const TRAIL_DECAY = 0.95; // 1 ke paas = trace der tak rukta hai

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const smooth = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const paragraphs = [
  {
    side: "left" as const,
    tone: "red" as const,
    text: "Since 1999 every AMI oven has come off one line in Rotterdam — a single cabinet, a single element spec and a calibration bench that every unit passes before it ships.",
  },
  {
    side: "right" as const,
    tone: "black" as const,
    text: "One thousand two hundred installations later, the promise hasn't changed: the oven you specify is the oven we test, and the oven we test is the one that arrives.",
  },
  {
    side: "left" as const,
    tone: "red" as const,
    text: "Each oven is baked for 48 hours and mapped across all decks before the crate is sealed, so what you receive performs exactly like the unit we signed off.",
  },
  {
    side: "right" as const,
    tone: "black" as const,
    text: "Crated, insured and tracked from Rotterdam to your door, with installation support and spare parts available long after the truck has left.",
  },
];

const checks = [
  "In-house fabrication and assembly",
  "48-hour burn-in on every oven",
  "Nine-point thermal mapping per cavity",
  "Export crating, insurance and tracking",
  "Installation support and spare parts",
];

const stats = [
  { value: "1999", label: "Founded" },
  { value: "41", label: "Countries" },
  { value: "1,200+", label: "Installations" },
];

/*
  Timeline (scroll progress 0 → 1)
  0.00         oven center me, "About us", logo CHHUPA
  0.03 – 0.31  4 paragraphs (left / right), each: slow fade in → HOLD → slow fade out
  0.33 – 0.42  BAND neeche se upar aata hai, oven uske PEECHE chhup jata hai
  0.42 – 0.56  band center me ruka (padhne ka time)
  0.56 – 0.65  band upar nikal jata hai, oven wapas dikhta hai
  0.67 – 0.77  truck neeche se aata hai
  0.77 – 0.805 oven EK scroll me chhota hoke container ke andar (truck ke peeche) chala jata hai
  0.805 – 0.87 hold
  0.87 – 1.00  truck + oven right nikalte hain, logo reveal hota hai
*/
const P_START = 0.1;
const P_LEN = 0.11;
const BAND_IN = 0.54;
const BAND_IN_LEN = 0.08;
const BAND_OUT = 0.68;
const BAND_OUT_LEN = 0.06;
const RISE_START = 0.74;
const RISE_LEN = 0.06;
const TRUCK_ARRIVED = 0.8;
const LOAD_LEN = 0.06;
const EXIT_START = 0.88;

export function AboutScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ovenRef = useRef<HTMLDivElement>(null);
  const ovenInnerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const paraRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let raf = 0;
    let decayFrame = 0;
    let trailLen = 0;
    let lastScroll = window.scrollY;
    let current = 0; // smoothed progress
    let target = 0; // real scroll progress
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smoothing = reduceMotion ? 1 : SMOOTHING;

    function getTarget() {
      const section = sectionRef.current;
      if (!section) return 0;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      return travel > 0 ? clamp(-rect.top / travel) : 0;
    }

    function renderTrail() {
      const trail = trailRef.current;
      if (!trail) return;
      trail.style.height = `${trailLen}px`;
      trail.style.opacity = String(clamp(trailLen / 60));
    }

    function decay() {
      trailLen *= TRAIL_DECAY;
      if (trailLen < 0.5) trailLen = 0;
      renderTrail();
      decayFrame = trailLen > 0 ? requestAnimationFrame(decay) : 0;
    }

    function bumpTrail(len: number) {
      if (reduceMotion || !TRAIL_ENABLED) return;
      const next = Math.min(len, TRAIL_MAX);
      if (next > trailLen) trailLen = next;
      renderTrail();
      if (!decayFrame) decayFrame = requestAnimationFrame(decay);
    }

    function render(p: number) {
      const stage = stageRef.current;
      const oven = ovenRef.current;
      const inner = ovenInnerRef.current;
      const truck = truckRef.current;
      if (!stage || !oven || !inner || !truck) return;

      /* ── measure (truck ki asli position/size) ── */
      const stageW = stage.clientWidth;
      const stageH = stage.clientHeight;
      const tw = truck.offsetWidth;
      const th = truck.offsetHeight;
      const tTop = truck.offsetTop;

      let boxCy = 0;
      let offsetPx = 0;
      if (th > 0) {
        /* truck ko itna right shift karo ki uska cargo panel screen ke centre me aaye */
        offsetPx = tw * (0.5 - (BOX.x + BOX.w / 2));
        boxCy = tTop + (BOX.y + BOX.h / 2) * th;
      }

      /* logo: horizontally screen-centre, vertically cargo panel ke centre me */
      const logo = logoRef.current;
      if (logo && tw > 0) {
        logo.style.left = `${stageW / 2}px`;
        logo.style.top = `${boxCy}px`;
        logo.style.width = `${BOX.w * tw * LOGO_W}px`;
        logo.style.transform = "translate(-50%, -50%)";
      }

      /* paragraphs: slow, soft in and out with a long hold */
      paraRefs.current.forEach((node, i) => {
        if (!node) return;
        const start = P_START + i * P_LEN;
        const local = clamp((p - start) / P_LEN);
        const enter = smooth(clamp(local / 0.45));
        const leave = smooth(clamp((local - 0.72) / 0.28));
        node.style.opacity = p >= start && local < 1 ? "1" : "0";
        node.style.transform = `translate3d(0, calc(-50% + ${(1 - enter) * 40 - leave * 60}vh), 0)`;
      });

      /* band: neeche se upar aata hai (oven uske peeche), ruka rehta hai, phir upar nikal jata hai */
      if (bandRef.current) {
        const bandIn = smooth(clamp((p - BAND_IN) / BAND_IN_LEN));
        const bandOut = smooth(clamp((p - BAND_OUT) / BAND_OUT_LEN));
        const bandY = (1 - bandIn) * BAND_TRAVEL_VH - bandOut * BAND_TRAVEL_VH;
        bandRef.current.style.transform = `translate3d(0, calc(-50% + ${bandY}vh), 0)`;
      }

      /* truck rises slowly from the bottom and stops in the centre */
      const rise = easeInOutSine(clamp((p - RISE_START) / RISE_LEN));
      const truckY = (1 - rise) * TRUCK_START_VH;

      /* logo: truck poora upar aane ke baad hi ON (truck usse dhak leta hai) */
      if (logoRef.current) {
        logoRef.current.style.visibility = rise >= 0.999 ? "visible" : "hidden";
      }

      /* oven: pehle truck poora upar aata hai, phir oven uske andar jaata hai */
      const load = easeInOut(clamp((p - TRUCK_ARRIVED) / LOAD_LEN));

      /* jaise truck upar aata hai, oven bhi uske saath neeche panel ki taraf jata hai */
      const truckShiftPx = (truckY / 100) * stageH;
      const ovenTargetY = boxCy + truckShiftPx - (OVEN_STOP_VH / 100) * stageH;
      const dyVisual = ovenTargetY - (stageH / 2 + (OVEN_Y_VH / 100) * stageH);

      inner.style.transform = `translate3d(0, ${dyVisual * load}px, 0) scale(1)`;
      inner.style.opacity = "1";
      if (trailRef.current) {
        trailRef.current.style.visibility = load > 0 ? "hidden" : "visible";
      }

      /* truck + oven saath right nikalte hain; logo apni jagah pe fixed rehta hai */
      const exit = easeInOut(clamp((p - EXIT_START) / (1 - EXIT_START)));
      const exitPx = exit * (OFFSCREEN_VW * stageW) / 100;

      const ovenEnter = easeOut(clamp(p / OVEN_ENTER_LEN));
      const ovenEnterY = (1 - ovenEnter) * -80;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(-50%, calc(-50% + ${ovenEnterY}vh))`;
        glowRef.current.style.opacity = String(1 - load * 0.9);
      }

      truck.style.transform = `translate3d(calc(-50% + ${exitPx + offsetPx}px), ${truckY}vh, 0)`;
      oven.style.transform = `translate3d(calc(-50% + ${exitPx + offsetPx * load}px), calc(-50% + ${ovenEnterY + OVEN_Y_VH}vh), 0)`;

      /* red shadow truck ke saath */
      if (shadowRef.current) {
        shadowRef.current.style.opacity = String(smooth(clamp((rise - 0.35) / 0.65)));
      }

      if (hintRef.current) {
        hintRef.current.style.opacity = String(1 - clamp(p / 0.03));
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }
    }

    function tick() {
      const diff = target - current;
      if (Math.abs(diff) < 0.00015) {
        current = target;
        render(current);
        raf = 0;
        return;
      }
      current += diff * smoothing;
      render(current);
      raf = requestAnimationFrame(tick);
    }

    function onScroll() {
      target = getTarget();

      /* red trace har downward scroll pe (truck aane tak) */
      const y = window.scrollY;
      const dy = y - lastScroll;
      lastScroll = y;
      if (dy > 0 && target < TRUCK_ARRIVED) bumpTrail(TRAIL_MIN + dy * TRAIL_STRENGTH);

      if (!raf) raf = requestAnimationFrame(tick);
    }

    target = getTarget();
    current = target;
    render(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(decayFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[560vh] bg-white">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        {/* soft red glow behind everything */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 55%, rgba(224,32,39,0.09), rgba(224,32,39,0) 70%)",
          }}
        />

        {/* progress indicator */}
        <div className="absolute inset-x-0 top-0 z-40 h-[3px] bg-neutral-100">
          <div
            ref={barRef}
            className="h-full origin-left bg-[#E02027]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* logo — cargo panel ke upar, screen ke centre me. Truck poora aane ke baad ON */}
        <div
          ref={logoRef}
          className="pointer-events-none absolute z-[5]"
          style={{ visibility: "hidden" }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={LOGO_SRC}
              alt="AMI Industries logo"
              width={365}
              height={44}
              className="w-full object-contain"
              priority
            />
          </div>
        </div>

        {/* red gradient — oven ke peeche se nikalti hui roshni */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[44vh] w-[44vw]"
          style={{
            background:
              "radial-gradient(circle closest-side at 50% 50%, rgba(224,32,39,0.55), rgba(224,32,39,0.26) 38%, rgba(224,32,39,0.08) 60%, rgba(224,32,39,0) 100%)",
          }}
        />

        {/* oven — center me, band aur truck dono ke PEECHE (z-10) */}
        <div
          ref={ovenRef}
          className="absolute top-1/2 left-1/2 z-10 w-[30vw] max-w-[300px] will-change-transform sm:w-[16.5vw]"
          style={{ transform: `translate3d(-50%, calc(-50% + ${OVEN_Y_VH}vh), 0)` }}
        >
          <div
            ref={ovenInnerRef}
            className="relative"
            style={{ transformOrigin: "50% 50%", willChange: "transform" }}
          >
            {/* solid red trace, sirf tail end fade hota hai */}
            <div
              ref={trailRef}
              className="pointer-events-none absolute bottom-1/2 left-1/2 -z-10 w-[4px] -translate-x-1/2 opacity-0"
              style={{
                height: 0,
                background:
                  "linear-gradient(to top, #E02027 0%, #E02027 50%, rgba(224,32,39,0) 100%)",
              }}
            />
            <Image
              src="/about/about-oven.png"
              alt="AMI Industries three deck commercial oven"
              width={290}
              height={290}
              className="relative w-full"
              priority
            />
          </div>
        </div>

        {/* paragraphs — ek ek karke, left (red) / right (black) */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {paragraphs.map((item, i) => (
            <div
              key={i}
              ref={(node) => {
                paraRefs.current[i] = node;
              }}
              data-side={item.side}
              className={cn(
                "absolute top-1/2 w-[32vw] max-w-[26rem] -translate-y-1/2 opacity-0",
                item.side === "left"
                  ? "left-6 text-left sm:left-12 lg:left-20"
                  : "right-6 text-right sm:right-12 lg:right-20",
              )}
              style={{ willChange: "transform, opacity" }}
            >
              <p
                className={cn(
                  "text-base leading-relaxed font-bold tracking-tight sm:text-2xl sm:leading-snug lg:text-3xl lg:leading-tight",
                  item.side === "left" ? "text-[#E02027]" : "text-black",
                )}
                style={{
                  fontFamily:
                    'var(--font-geist-sans), var(--font-inter), "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* BAND — center me full-width split. Oven iske peeche se guzarta hai (z-25: oven ke upar, truck ke neeche) */}
        <div
          ref={bandRef}
          className="absolute inset-x-0 top-1/2 z-[25] flex h-[78vh] flex-col shadow-[0_40px_90px_-30px_rgba(0,0,0,0.35)] sm:h-[66vh] sm:min-h-[420px] sm:flex-row"
          style={{
            transform: `translate3d(0, calc(-50% + ${BAND_TRAVEL_VH}vh), 0)`,
            willChange: "transform",
          }}
        >
          {/* left — cream panel, bahut saara text */}
          <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-[#F8F6F2] px-6 py-5 sm:w-1/2 sm:flex-none sm:px-12 lg:px-20">
            {/* faint logo watermark */}
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-[70%] w-[70%] opacity-[0.07]">
              <Image src={LOGO_SRC} alt="" fill sizes="30vw" className="object-contain" />
            </div>

            <div className="relative">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-[#E02027] uppercase sm:text-xs">
                Made in Rotterdam
              </p>
              <h3 className="mt-2 font-display text-xl leading-tight font-semibold text-neutral-900 sm:mt-3 sm:text-2xl lg:text-4xl">
                One factory. One line. Every oven tested before it leaves.
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:mt-4 sm:text-sm">
                AMI Industries designs and builds commercial and industrial ovens under one
                roof. Cabinets are welded, brushed and assembled in-house, so every unit
                leaves the same floor with the same element spec and the same calibration.
              </p>
              <p className="mt-3 hidden text-sm leading-relaxed text-neutral-700 sm:block">
                Our engineers stay with each order from specification to installation — heat
                charts, deck configuration, steam and control options are agreed before a
                single sheet of steel is cut.
              </p>

              <ul className="mt-4 space-y-1.5 sm:mt-5 sm:space-y-2">
                {checks.map((c, i) => (
                  <li
                    key={c}
                    className={cn(
                      "items-center gap-2.5 text-xs font-medium text-neutral-900 sm:text-sm",
                      i > 2 ? "hidden sm:flex" : "flex",
                    )}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E02027]" />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-4 sm:mt-6">
                <span className="inline-block border border-[#E02027] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-[#E02027] uppercase sm:text-xs">
                  Explore our ovens →
                </span>
              </div>
            </div>
          </div>

          {/* right — red overlayed image */}
          <div className="relative h-[34%] overflow-hidden bg-neutral-900 sm:h-auto sm:w-1/2">
            <Image src={PANEL_IMG} alt="" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#E02027]/90 via-[#E02027]/80 to-[#7a0a10]/95" />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 14px)",
              }}
            />

            <div className="relative flex h-full flex-col justify-between p-5 sm:p-10 lg:p-14">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-white/80 uppercase sm:text-xs">
                AMI Industries · Est. 1999
              </p>

              <p className="hidden font-display text-xl leading-snug font-semibold text-white sm:block lg:text-3xl">
                The oven you specify is the oven we test, and the oven we test is the one that
                arrives.
              </p>

              <div className="grid grid-cols-3 gap-3 border-t border-white/30 pt-3 sm:pt-5">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-lg font-semibold text-white sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-[9px] tracking-[0.18em] text-white/75 uppercase sm:text-[11px]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* truck — neeche se aata hai, oven, band aur logo ke AAGE (z-30) */}
        <div
          ref={truckRef}
          className="absolute left-1/2 z-30 w-[85%] will-change-transform sm:w-[72%]"
          style={{
            bottom: TRUCK_BOTTOM,
            transform: `translate3d(-50%, ${TRUCK_START_VH}vh, 0)`,
          }}
        >
          {/* red oval ground shadow */}
          <div
            ref={shadowRef}
            className="pointer-events-none absolute inset-x-[4%] -z-10 h-[16%] opacity-0"
            style={{
              bottom: SHADOW_BOTTOM,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(224,32,39,0.55) 0%, rgba(224,32,39,0.3) 45%, rgba(224,32,39,0) 72%)",
            }}
          />
          <Image
            src="/about/truck.png"
            alt="AMI Industries export truck"
            width={3964}
            height={1484}
            className="relative z-10 w-full -scale-x-100"
          />
        </div>

        {/* scroll hint */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
            Scroll
          </span>
          <span className="h-8 w-px bg-gradient-to-b from-neutral-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
