"use client";

import { useEffect, useRef } from "react";
import { Rating } from "@/components/rating";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  product: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I stopped timing my roasts because I stopped having to guess. The oven tells me when it is actually at temperature, not when it says it is.",
    author: "Marisol Duarte",
    role: "Home baker, Porto",
    product: "Aria 60 Built-In",
  },
  {
    quote:
      "The double deck changed how we run service. Two cavities, two temperatures, one oven wall — that is the whole kitchen sorted.",
    author: "Clara Tolentino",
    role: "Group head chef, Lisbon",
    product: "Aria 90 Double Deck",
  },
  {
    quote:
      "Humidity control is the entire game for us. These ovens hold it better than anything else we put through a test kitchen.",
    author: "Lars Bech",
    role: "Bakery owner, Copenhagen",
    product: "Vulcan 70 Steam",
  },
  {
    quote:
      "Induction changed our weeknights. Boiling a pot takes under four minutes and the kitchen stays cool at 250°C.",
    author: "Nina Sørensen",
    role: "Architect, Copenhagen",
    product: "Ember 60 Induction",
  },
  {
    quote:
      "We specify AMI because the warranty actually gets honoured. At 620 rooms, that matters more than any spec sheet.",
    author: "Priya Nair",
    role: "Hotel procurement, Manchester",
    product: "Wave 45 Combi",
  },
  {
    quote:
      "The photo came out of the oven exactly like the drawing said it would. Same curve, same colour, every single time.",
    author: "Marco Ricci",
    role: "Pizzaiolo, Naples",
    product: "Chef 400 Pizza Oven",
  },
  {
    quote:
      "Our students learn on the same ovens they will meet in industry. The automatic programs teach better than any manual.",
    author: "Atelier Cuisine",
    role: "Culinary school, Lyon",
    product: "Wave 45 Combi",
  },
  {
    quote:
      "One brand across the whole development. Installation templates were flawless and the handover was a single morning.",
    author: "Vertex Developments",
    role: "Residential developer, Rotterdam",
    product: "Aria 60 Built-In",
  },
  {
    quote:
      "We moved from gas to induction and the cost per meal dropped by a third. The payback was under a year.",
    author: "Aurora Facilities",
    role: "Contract catering, Dublin",
    product: "Ember 60 Induction",
  },
  {
    quote:
      "Small footprint, real oven results. Our kiosks produce more volume per square metre than the full-size line did.",
    author: "Kettle & Crumb",
    role: "Retail bakery, Berlin",
    product: "Pico 20 Countertop",
  },
  {
    quote:
      "The pizza oven hits 400°C and stays there. Our bases come out identical from the first service to the last.",
    author: "Hearth & Harbor",
    role: "Restaurant group, Lisbon",
    product: "Chef 400 Pizza Oven",
  },
  {
    quote:
      "Service came back inside two days with the part, fitted on site. That is why we have never looked at another brand.",
    author: "Maison Verre",
    role: "Fine dining, Paris",
    product: "Aria 90 Double Deck",
  },
];

function VerticalTicker({
  items,
  baseSpeed = 1.1,
  direction = "up",
}: {
  items: Testimonial[];
  baseSpeed?: number;
  direction?: "up" | "down";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const speed = useRef(1);
  const targetSpeed = useRef(1);

  useEffect(() => {
    let raf = 0;

    function loop() {
      const track = trackRef.current;
      if (track) {
        const period = track.scrollHeight / 3;
        speed.current += (targetSpeed.current - speed.current) * 0.05;
        offset.current += baseSpeed * speed.current;
        if (period > 0 && offset.current >= period) offset.current -= period;
        const y = direction === "down" ? -period + offset.current : -offset.current;
        track.style.transform = `translate3d(0, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [baseSpeed, direction]);

  return (
    <div
      className="h-[44rem] overflow-hidden px-2.5"
      onMouseEnter={() => {
        targetSpeed.current = 0.12;
        speed.current = 0.12;
      }}
      onMouseLeave={() => {
        targetSpeed.current = 1;
      }}
    >
      <div ref={trackRef} className="will-change-transform">
        {[...items, ...items, ...items].map((item, index) => (
          <figure
            key={`${item.author}-${index}`}
            className="mb-5 flex min-h-[22rem] flex-col rounded-[1.75rem] border-2 border-[#E02027] bg-white p-7 shadow-[0_20px_44px_-20px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(224,32,39,0.14),inset_0_3px_12px_rgba(224,32,39,0.1)]"
          >
            <Rating value={5} showCount={false} />
            <blockquote className="mt-4 flex-1 font-display text-xl leading-snug font-semibold text-black">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-black/10 pt-4">
              <p className="text-sm font-semibold text-black">{item.author}</p>
              <p className="text-xs text-neutral-500">{item.role}</p>
              <p className="mt-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#E02027] uppercase">
                {item.product}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const columns = [
    testimonials.filter((_, index) => index % 3 === 0),
    testimonials.filter((_, index) => index % 3 === 1),
    testimonials.filter((_, index) => index % 3 === 2),
  ];

  return (
    <section className="relative overflow-hidden bg-white py-3">
      {/* red gradient glows behind the columns */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-[12%] size-[30rem] rounded-full bg-[#E02027]/20 blur-[110px]" />
        <div className="absolute -bottom-28 right-[10%] size-[34rem] rounded-full bg-[#E02027]/16 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {columns.map((column, index) => (
            <VerticalTicker
            key={index}
            items={column}
            baseSpeed={1.1 + index * 0.16}
            direction={index === 1 ? "up" : "down"}
          />
          ))}
        </div>
      </div>

      {/* white fades — top, bottom and both sides */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-56 bg-gradient-to-b from-white via-white/90 via-white/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-56 bg-gradient-to-t from-white via-white/90 via-white/50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-white via-white/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-white via-white/70 to-transparent" />
    </section>
  );
}
