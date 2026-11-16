import { StarIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  className,
  size = "sm",
  showCount = true,
}: {
  value: number;
  count?: number;
  className?: string;
  size?: "sm" | "md";
  showCount?: boolean;
}) {
  const starClass = size === "sm" ? "size-3.5" : "size-4";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => {
          const fill = Math.max(0, Math.min(1, value - index));
          return (
            <span key={index} className="relative inline-block">
              <StarIcon className={cn(starClass, "text-ami-200")} />
              {fill > 0 ? (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <StarIcon className={cn(starClass, "text-brass-500")} />
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
      {showCount ? (
        <span className="text-xs text-ami-500">
          {value.toFixed(1)}
          {count !== undefined ? ` (${count})` : ""}
        </span>
      ) : null}
      <span className="sr-only">
        Rated {value} out of 5{count !== undefined ? ` from ${count} reviews` : ""}
      </span>
    </div>
  );
}
