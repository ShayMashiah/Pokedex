import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  value: number;
}) {
    const indicatorColor =
    value < 33
      ? "bg-red-500"
      : value < 66
      ? "bg-yellow-400"
      : "bg-green-400";

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        "bg-neutrals-400 relative h-4 w-full overflow-hidden rounded-lg border border-neutrals-black",
        "w-270 h-14 rounded-xs border top-20 left-20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full flex-1 transition-transform",
          indicatorColor
        )}
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };