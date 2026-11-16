import Link from "next/link";
import { ArrowRightIcon, BoltIcon, LeafIcon, ThermometerIcon } from "@/components/icons";
import { ProductImage } from "@/components/product-image";
import { products } from "@/lib/products";

const pillars = [
  {
    icon: ThermometerIcon,
    title: "Calibrated to ±5°C",
    copy: "Every cavity is mapped across nine sensor points before it leaves the lab. No more guessing at the dial.",
  },
  {
    icon: BoltIcon,
    title: "Inverter control",
    copy: "Power is modulated continuously instead of cycling on and off, which is why our ovens hold temperature without drying food out.",
  },
  {
    icon: LeafIcon,
    title: "A++ efficiency",
    copy: "Triple glazing, sealed cavities and heat recovery cut energy use by up to 70% against a gas range of the same size.",
  },
];

export function EngineeringSplit() {
  const product = products.find((item) => item.slug === "vulcan-70-built-in-steam-oven")!;

  return (
    <section className="bg-white py-20">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#E02027] uppercase">
            The AMI standard
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-semibold text-black sm:text-4xl">
            We test every oven the way you actually cook.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-600">
            Nine sensor points, three humidity levels, a dozen real recipes and one very tired
            test kitchen. If a model cannot hold ±5°C from the first roast to the twentieth, it
            does not ship.
          </p>

          <ul className="mt-10 space-y-7">
            {pillars.map(({ icon: Icon, title, copy }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-none bg-white text-[#E02027] shadow-[0_1px_2px_rgba(10,25,48,0.06)]">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-black">{title}</h3>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-neutral-600">{copy}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/#about"
            className="mt-10 inline-flex items-center gap-2 rounded-none bg-black px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-900"
          >
            Read our engineering notes
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative overflow-hidden border border-black/10 bg-white">
            <div className="relative aspect-4/3 w-full">
              <ProductImage
                src={product.image}
                alt={product.name}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="grayscale-[0.2] transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>
            <div className="relative grid grid-cols-2 gap-4 border-t border-black/10 p-6 sm:grid-cols-4">
              {product.highlights.map((highlight) => (
                <div key={highlight.label}>
                  <p className="font-display text-xl font-semibold text-black">
                    {highlight.value}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">{highlight.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
