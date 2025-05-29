import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function getIndicatorColor(value: number): string {
  if (value < 33) return "bg-extendedPalette-error-red";
  if (value < 66) return "bg-extendedPalette-warning-yellow";
  return "bg-extendedPalette-success-green";
}

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  value: number;
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        "bg-neutrals-400 relative h-4 overflow-hidden rounded-lg border border-neutrals-black",
        "w-270 h-14 rounded-xs border top-20 left-20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full flex-1 transition-transform",
          getIndicatorColor(value),
        )}
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };