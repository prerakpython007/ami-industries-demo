"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, BoltIcon, LeafIcon, ThermometerIcon } from "@/components/icons";
import { CompareToggle } from "@/components/compare";
import { ProductImage } from "@/components/product-image";
import { Rating } from "@/components/rating";
import { formatPrice, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState<string | null>(null);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const chips = [
    ...product.badges.slice(0, 2).map((badge) => ({
      id: badge,
      label: badge,
      tone: "black" as const,
    })),
    ...(discount > 0
      ? [{ id: "save", label: `Save ${discount}%`, tone: "red" as const }]
      : []),
  ];

  return (
    <article className="group relative flex flex-col overflow-hidden border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.35)]">
      <div className="relative block aspect-4/3 overflow-hidden bg-neutral-100">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.06]">
          <ProductImage
            src={product.image}
            alt={product.name}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <CompareToggle product={product} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-start gap-1.5">
          {chips.map((chip) => {
            const isOpen = open === chip.id;
            return (
              <div key={chip.id} className="inline-flex flex-col">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : chip.id)}
                  aria-expanded={isOpen}
                  className={cn(
                    "px-2 py-1 text-[9px] font-bold tracking-[0.1em] whitespace-nowrap uppercase transition-colors duration-300",
                    chip.tone === "red"
                      ? isOpen
                        ? "bg-black text-white"
                        : "bg-[#E02027] text-white hover:bg-black"
                      : isOpen
                        ? "bg-[#E02027] text-white"
                        : "bg-black text-white hover:bg-[#E02027]",
                  )}
                >
                  {chip.label}
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-44 pt-1.5 text-[10px] leading-tight text-neutral-500">
                      {chip.tone === "red"
                        ? `Now ${formatPrice(product.price)} instead of ${formatPrice(product.compareAtPrice!)}`
                        : product.features[0]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
            {product.series} series
          </span>
          <Rating value={product.rating} count={product.reviewCount} />
        </div>

        <h3 className="mt-2 font-display text-lg leading-snug font-semibold text-black">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{product.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-500">
          <li className="flex items-center gap-1.5">
            <ThermometerIcon className="size-3.5 text-neutral-400" />
            {product.capacityLiters} L
          </li>
          <li className="flex items-center gap-1.5">
            <BoltIcon className="size-3.5 text-neutral-400" />
            {product.energyClass}
          </li>
          <li className="flex items-center gap-1.5">
            <LeafIcon className="size-3.5 text-neutral-400" />
            {product.fuel === "electric" ? "Electric" : product.fuel === "gas" ? "Gas" : "Dual fuel"}
          </li>
        </ul>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3 border-t border-neutral-100 pt-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xl font-semibold text-black">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice ? (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                ) : null}
              </div>
              <p className="mt-0.5 text-[11px] text-neutral-400">
                or 4× {formatPrice(product.price / 4)} interest free
              </p>
            </div>
            <Link
              href="/#contact"
              className="group/link inline-flex items-center gap-1.5 border border-black px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
            >
              Enquire
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
