"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  YoutubeIcon,
} from "@/components/icons";
import { categories } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import logo from "../../public/logo.png";
import { FooterImageStrip } from "@/components/footer-image-strip";

const rangeLinks = categories.map((category) => ({
  href: "/#products",
  label: category.name,
}));

const companyLinks = [
  { href: "/#about", label: "About AMI" },
  { href: "/#clients", label: "Our clients" },
  { href: "/#products", label: "The range" },
  { href: "/#contact", label: "Contact us" },
];

const supportLinks = [
  { href: "/#contact", label: "Request a quote" },
  { href: "/#products", label: "Delivery & installation" },
  { href: "/#contact", label: "Warranty & spares" },
  { href: "/#contact", label: "Service network" },
];

const marqueeWords = [
  { text: "Manufacturers", tone: "white" },
  { text: "Traders", tone: "red" },
  { text: "Exporters", tone: "white" },
  { text: "Heating Solutions", tone: "red" },
  { text: "Since 1999", tone: "white" },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
        <span className="h-2 w-2 bg-[#E02027]" />
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm text-black/55 transition-colors duration-300 hover:text-black"
            >
              {link.label}
              <ArrowRightIcon className="size-3.5 -translate-x-1 text-[#E02027] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 mt-24 overflow-hidden bg-white text-black"
    >
      {/* big marquee strip */}
      <div className="relative overflow-hidden border-y border-black/10 bg-black py-8 sm:py-10">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
              aria-hidden={copy === 1}
            >
              {marqueeWords.map((word) => (
                <span
                  key={word.text}
                  className={cn(
                    "font-display text-[clamp(2.4rem,6.5vw,5.5rem)] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap italic",
                    word.tone === "red" ? "text-[#E02027]" : "text-white",
                  )}
                >
                  {word.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container-page pt-16 pb-0">
        <div className="h-1 w-24 bg-[#E02027]" />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Image src={logo} alt="AMI Industries" className="h-10 w-auto" />

            <p className="mt-7 max-w-sm font-display text-2xl leading-tight font-semibold text-black sm:text-3xl">
              Manufacturers, traders, exporters &amp; heating solutions.
            </p>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/60">
              We build commercial ovens, cooking ranges and heating systems in Rotterdam, then
              ship them to professional kitchens in 41 countries.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <LinkColumn title="Range" links={rangeLinks} />
            <LinkColumn title="Company" links={companyLinks} />
            <LinkColumn title="Support" links={supportLinks} />
          </div>

          {/* Contact — far right */}
          <div className="lg:col-span-3 lg:text-right">
            <h3 className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.2em] text-black uppercase lg:justify-end">
              <span className="h-2 w-2 bg-[#E02027]" />
              Get in touch
            </h3>

            <div className="mt-5 flex flex-col gap-2.5 text-sm text-black/60 lg:items-end">
              <a
                href="mailto:hello@ami-industries.example"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-black"
              >
                <MailIcon className="size-4 text-[#E02027]" />
                {siteConfig.email}
              </a>
              <a
                href="tel:+31102345678"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-black"
              >
                <PhoneIcon className="size-4 text-[#E02027]" />
                {siteConfig.phone}
              </a>
            </div>

            <div className="mt-7 flex gap-2 lg:justify-end">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center border border-black/15 text-black/70 transition-colors duration-300 hover:border-[#E02027] hover:bg-[#E02027] hover:text-white"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="grid size-10 place-items-center border border-black/15 text-black/70 transition-colors duration-300 hover:border-[#E02027] hover:bg-[#E02027] hover:text-white"
              >
                <YoutubeIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* top half of the oven image — edge to edge, parallax on scroll */}
      <FooterImageStrip />

      {/* Bottom bar */}
      <div className="relative z-10">
        <div className="border-t border-black/10">
          <div className="container-page relative flex flex-col gap-4 py-6 text-xs text-black/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {siteConfig.copyrightYear} {siteConfig.legalName}. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link href="/#contact" className="transition-colors hover:text-black">
                Privacy
              </Link>
              <Link href="/#contact" className="transition-colors hover:text-black">
                Terms
              </Link>
              <Link href="/#contact" className="transition-colors hover:text-black">
                Accessibility
              </Link>
              <a
                href="#top"
                className="inline-flex items-center gap-2 border border-black/15 px-3 py-2 text-black/70 transition-colors hover:border-[#E02027] hover:bg-[#E02027] hover:text-white"
              >
                Back to top
                <ArrowUpIcon className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
