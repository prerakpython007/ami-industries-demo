import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { CompareProvider } from "@/components/compare";
import { Hero } from "@/components/hero";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

const AboutScroll = dynamic(
  () => import("@/components/about-scroll").then((mod) => mod.AboutScroll),
  {
    loading: () => <div className="h-[40vh] bg-white" aria-hidden="true" />,
  },
);

const CategoryGrid = dynamic(
  () => import("@/components/category-grid").then((mod) => mod.CategoryGrid),
  {
    loading: () => <div className="h-112 bg-white" aria-hidden="true" />,
  },
);

const CurvedMarquee = dynamic(
  () => import("@/components/curved-marquee").then((mod) => mod.CurvedMarquee),
  {
    loading: () => <div className="h-96 bg-white" aria-hidden="true" />,
  },
);

export const metadata: Metadata = {
  title: "AMI Industries — Precision ovens for modern kitchens",
  description:
    "Built-in ovens, induction ranges, combi microwaves and countertop bakers engineered for precise, even heat.",
};

export default function HomePage() {
  const featured = products.filter((product) => product.featured).slice(0, 6);

  return (
    <CompareProvider>
      <Hero />

      <AboutScroll />

      <CategoryGrid />

      <section id="products" className="container-page scroll-mt-28 bg-white pb-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#E02027] uppercase">
              Featured this season
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight font-semibold text-black sm:text-4xl">
              The models our customers come back for.
            </h2>
          </div>
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black underline-offset-4 hover:underline"
          >
            Shop all ovens
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <CurvedMarquee />

      <section id="contact" className="container-page scroll-mt-28 bg-white pb-24">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-black px-7 py-14 text-center sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(560px 280px at 50% 0%, rgba(237,106,44,0.3), transparent 65%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
              Get recipes, teardowns and launch previews.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-300">
              One email a month. No fluff — just how to cook better on the equipment you already
              own.
            </p>
            <div className="mx-auto mt-8 max-w-lg">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </CompareProvider>
  );
}
