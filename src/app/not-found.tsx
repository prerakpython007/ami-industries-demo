import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-28 text-center">
      <p className="font-display text-7xl font-semibold text-ami-200">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ami-900">
        This page got cold
      </h1>
      <p className="mt-3 max-w-md text-ami-500">
        The page you are looking for does not exist, or the oven that powered it moved locations.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ami-900 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-ami-800"
      >
        <ArrowLeftIcon className="size-4" />
        Back to home
      </Link>
    </div>
  );
}
