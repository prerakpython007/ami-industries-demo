"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { ProductImage } from "@/components/product-image";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";

export function CategoryGrid() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % categories.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const category = categories[active];
  const sample = products.find((product) => product.category === category.slug)!;

  return (
    <section id="categories" className="container-page bg-white py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#E02027] uppercase">
            Shop by category
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-semibold text-black sm:text-4xl">
            One heat philosophy, five ways to cook.
          </h2>
        </div>
        <Link
          href="/#products"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-black underline-offset-4 hover:underline"
        >
          View everything
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Image stage */}
      <div className="relative mt-12 overflow-hidden bg-neutral-900">
        <div className="relative aspect-16/10 w-full sm:aspect-16/9">
          <div key={category.slug} className="animate-fade-in absolute inset-0">
            <ProductImage
              src={sample.image}
              alt={category.name}
              priority
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="grayscale-[0.2]"
            />
          </div>

          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/75 to-transparent" />

          <div className="absolute inset-x-0 top-0 p-6 sm:p-10">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#E02027] uppercase">
              {category.eyebrow}
            </span>
            <h3 className="mt-3 max-w-lg font-display text-2xl leading-tight font-semibold text-white sm:text-4xl">
              {category.name}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs — below the image, short until selected */}
      <div className="mt-2 flex items-end gap-2">
        {categories.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={isActive}
              className={cn(
                "group flex flex-1 flex-col items-start justify-end overflow-hidden px-4 pb-3 text-left transition-colors duration-300",
                isActive
                  ? "h-14 bg-[#E02027] text-white"
                  : "h-14 bg-black/5 text-neutral-500 hover:bg-black/10 hover:text-neutral-800",
              )}
            >
              <span className="font-mono text-[10px] tracking-[0.25em] opacity-60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "mt-1 text-[11px] font-bold tracking-[0.14em] whitespace-nowrap uppercase transition-all duration-500",
                  isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100",
                )}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
