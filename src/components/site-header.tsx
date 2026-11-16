"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import logo from "../../public/logo.png";

const navLinks = [
	{ href: "/#about", label: "About" },
	{ href: "/#products", label: "Products" },
	{ href: "/#clients", label: "Clients" },
	{ href: "/#contact", label: "Contact Us" },
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function SiteHeader() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		let frame = 0;

		function onScroll() {
			frame = 0;
			setScrolled(window.scrollY > 32);
		}

		function onScrollRaf() {
			if (frame) return;
			frame = window.requestAnimationFrame(onScroll);
		}

		frame = window.requestAnimationFrame(onScroll);
		window.addEventListener("scroll", onScrollRaf, { passive: true });
		window.addEventListener("resize", onScrollRaf, { passive: true });
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScrollRaf);
			window.removeEventListener("resize", onScrollRaf);
		};
	}, []);

	return (
		<header className="sticky top-0 z-50">
			<div
				className={cn(
					"flex justify-center transition-colors duration-500",
					scrolled
						? "bg-transparent"
						: "bg-white/90 backdrop-blur-xl"
				)}
				style={{ transitionTimingFunction: EASE }}
			>
				<div
					className={cn(
						"relative mx-auto flex flex-wrap items-center transition-all duration-500",
						scrolled
							? "m-3 w-[calc(100%_-_1.5rem)] max-w-[54rem] items-center gap-3 rounded-none border border-black bg-black px-3 py-2 shadow-[0_18px_44px_-16px_rgba(0,0,0,0.7)] lg:mx-auto lg:w-full"
							: "w-full max-w-[84rem] gap-x-4 gap-y-1 px-5 py-3 lg:h-16 lg:flex-nowrap lg:px-8"
					)}
					style={{ transitionTimingFunction: EASE }}
				>
					{/* Left — logo */}
					<Link
						href="/"
						aria-label="AMI Industries — home"
						className="order-1 flex shrink-0 items-center lg:order-none"
					>
						<span className="flex items-center bg-white px-1.5 py-1">
							<Image
								src={logo}
								alt="AMI Industries"
								priority
								className={cn(
									"w-auto transition-all duration-500",
									scrolled ? "h-6" : "h-7"
								)}
							/>
						</span>
					</Link>

					{/* Center — links */}
					<nav
						className={cn(
							"order-3 flex w-full items-center justify-between gap-1 lg:order-none lg:w-auto lg:justify-center",
							scrolled ? "hidden lg:flex" : "flex",
							scrolled ? "lg:mx-auto lg:gap-0.5" : "lg:mx-auto lg:gap-1"
						)}
					>
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"group relative rounded-none font-medium transition-colors duration-300",
									scrolled
										? "px-2.5 py-1.5 text-[13px] text-white/75 hover:text-white"
										: "px-3 py-2 text-sm text-black/70 hover:text-black"
								)}
							>
								{link.label}
								<span
									className={cn(
										"absolute inset-x-3 bottom-0.5 h-px origin-left scale-x-0 bg-[#E02027] transition-transform duration-300",
										"group-hover:scale-x-100"
									)}
								/>
							</Link>
						))}
					</nav>

					{/* Right — actions */}
					<div className="order-2 ml-auto flex shrink-0 items-center gap-1.5 lg:order-none">
						<Link
							href="/#products"
							className="group flex shrink-0 items-center gap-2 bg-[#E02027] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-black"
						>
							Shop Now
							<ArrowRightIcon className="size-4 text-white" />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
