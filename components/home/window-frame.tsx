import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A desktop window: traffic lights plus either an address bar (for websites) or a title (for apps).
 * Content inside is shown whole, never cropped.
 */
export function WindowFrame({
  address,
  title,
  children,
  className,
}: {
  address?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border bg-surface shadow-[0_30px_70px_-35px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b bg-raised px-3.5 py-2.5">
        <div aria-hidden className="flex shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        {address ? (
          <div className="mx-auto flex min-w-0 max-w-[78%] flex-1 items-center justify-center gap-1.5 rounded-md bg-bg/70 px-3 py-1 font-mono text-[11px] text-ink-3">
            <Lock aria-hidden className="size-3 shrink-0" />
            <span className="truncate">{address}</span>
          </div>
        ) : (
          <p className="mx-auto min-w-0 truncate font-mono text-[11px] text-ink-3">{title}</p>
        )}
        {/* Balances the traffic lights so the bar stays centred. */}
        <div aria-hidden className="w-[42px] shrink-0" />
      </div>
      {children}
    </div>
  );
}
