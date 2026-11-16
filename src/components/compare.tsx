"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ArrowRightIcon, CheckIcon, CloseIcon, PlusIcon } from "@/components/icons";
import { formatPrice, products, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const MAX = 3;

type CompareContextValue = {
  selected: string[];
  toggle: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  isFull: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CompareContext = createContext<CompareContextValue | null>(null);

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used inside CompareProvider");
  return context;
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback((id: string) => {
    setSelected((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= MAX) return current;
      return [...current, id];
    });
  }, []);

  const clear = useCallback(() => {
    setSelected([]);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const value = useMemo<CompareContextValue>(
    () => ({
      selected,
      toggle,
      clear,
      isSelected: (id: string) => selected.includes(id),
      isFull: selected.length >= MAX,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [selected, toggle, clear, isOpen],
  );

  return (
    <CompareContext.Provider value={value}>
      {children}
      <CompareBar />
      <CompareModal />
    </CompareContext.Provider>
  );
}

export function CompareToggle({ product }: { product: Product }) {
  const { toggle, isSelected, isFull } = useCompare();
  const active = isSelected(product.id);

  return (
    <button
      type="button"
      onClick={() => toggle(product.id)}
      aria-label={`${active ? "Remove" : "Add"} ${product.name} ${active ? "from" : "to"} comparison`}
      aria-pressed={active}
      title={active ? "Remove from comparison" : "Add to comparison"}
      className={cn(
        "absolute top-4 right-4 z-20 grid size-9 place-items-center border backdrop-blur transition-colors duration-300",
        active
          ? "border-[#E02027] bg-[#E02027] text-white"
          : isFull
            ? "border-white/40 bg-black/40 text-white/50"
            : "border-white/50 bg-black/40 text-white hover:border-white hover:bg-black/60",
      )}
    >
      {active ? <CheckIcon className="size-4" /> : <PlusIcon className="size-4" />}
    </button>
  );
}

function CompareBar() {
  const { selected, clear, open } = useCompare();
  if (selected.length < 2) return null;

  const chosen = selected
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  return (
    <div className="animate-fade-up fixed inset-x-0 bottom-5 z-[70] flex justify-center px-4">
      <div className="flex w-full max-w-2xl flex-wrap items-center gap-3 rounded-full border border-black/10 bg-white/95 py-2.5 pr-2.5 pl-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex -space-x-2">
          {chosen.map((product) => (
            <span
              key={product.id}
              className="relative size-9 overflow-hidden rounded-full border-2 border-white bg-neutral-100"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
          ))}
        </div>

        <span className="flex-1 text-sm font-medium text-black">
          {chosen.length} oven{chosen.length > 1 ? "s" : ""} selected
          <span className="ml-2 text-xs text-neutral-400">compare up to {MAX}</span>
        </span>

        <button
          type="button"
          onClick={clear}
          className="px-3 py-2 text-xs font-semibold text-neutral-500 transition-colors hover:text-black"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={open}
          className="inline-flex items-center gap-2 rounded-full bg-[#E02027] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          Compare
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

const specRows: { label: string; value: (product: Product) => string }[] = [
  { label: "Price", value: (p) => formatPrice(p.price) },
  { label: "Energy class", value: (p) => p.energyClass },
  { label: "Capacity", value: (p) => `${p.capacityLiters} L` },
  { label: "Power", value: (p) => `${p.powerKw} kW` },
  {
    label: "Fuel",
    value: (p) =>
      p.fuel === "electric" ? "Electric" : p.fuel === "gas" ? "Gas" : "Dual fuel",
  },
  {
    label: "Dimensions",
    value: (p) =>
      `${p.dimensions.width} × ${p.dimensions.height} × ${p.dimensions.depth} mm`,
  },
  { label: "Weight", value: (p) => `${p.weightKg} kg` },
  { label: "Warranty", value: (p) => `${p.warrantyYears} years` },
  { label: "Rating", value: (p) => `${p.rating.toFixed(1)} / 5` },
];

function CompareModal() {
  const { isOpen, close, selected } = useCompare();
  if (!isOpen) return null;

  const chosen = selected
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close comparison"
        onClick={close}
        className="animate-fade-in absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Compare ovens"
        className="animate-fade-up relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[1.75rem] bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-black/10 bg-white/95 px-6 py-5 backdrop-blur sm:px-8">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#E02027] uppercase">
              Side by side
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-black">
              Compare {chosen.length} ovens
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close comparison"
            className="grid size-10 place-items-center border border-black/10 text-black transition-colors hover:border-[#E02027] hover:bg-[#E02027] hover:text-white"
          >
            <CloseIcon className="size-4" />
          </button>
        </header>

        <div className="overflow-x-auto p-6 sm:p-8">
          <div
            className="grid min-w-[36rem] gap-x-6"
            style={{ gridTemplateColumns: `9rem repeat(${chosen.length}, minmax(0, 1fr))` }}
          >
            <div />
            {chosen.map((product) => (
              <div key={product.id}>
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="30vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
                  {product.series} series
                </p>
                <h3 className="mt-1 font-display text-lg leading-snug font-semibold text-black">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">{product.tagline}</p>
                <Link
                  href="/#contact"
                  onClick={close}
                  className="mt-4 inline-flex items-center gap-2 bg-[#E02027] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-black"
                >
                  Enquire
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </div>
            ))}

            {specRows.map((row, index) => (
              <div key={row.label} className="contents">
                <div
                  className={cn(
                    "border-t border-black/10 py-3 text-xs font-semibold tracking-[0.1em] text-neutral-400 uppercase",
                    index === 0 && "border-t-0",
                  )}
                >
                  {row.label}
                </div>
                {chosen.map((product) => (
                  <div
                    key={`${product.id}-${row.label}`}
                    className={cn(
                      "border-t border-black/10 py-3 text-sm font-medium text-black",
                      index === 0 && "border-t-0",
                    )}
                  >
                    {row.value(product)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
