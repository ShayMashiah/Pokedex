import * as ProgressPrimitive from "@radix-ui/react-progress";
import type { BattleBarProps } from "@/lib/types";
import { cn } from "@/lib/utils";

function getIndicatorColor(value: number): string {
  if (value < 33) return "bg-extendedPalette-error-red";
  if (value < 66) return "bg-extendedPalette-warning-yellow";
  return "bg-extendedPalette-success-green";
}

function Progress({
  name,
  speed,
  currentHP,
  maxHP,
  className,
  isTurn,
  isFainted
}: BattleBarProps) {
  const percentage = Math.round((currentHP / maxHP) * 100);

  return (
    <div
      className={cn(
        "w-286 h-103 rounded-md  text-white shadow-md border border-white",
        "flex flex-col justify-between",
        isFainted ? "bg-gradient-fainted" :
        isTurn ?  "bg-gradient-default " : "bg-gradient-disabled",
        className
      )}
    >
      <div className="text-headingLgBold font-mulish py-8 px-8.5">{name}</div>
      <div className="px-8">
        <ProgressPrimitive.Root
          value={percentage}
          className="relative h-14 max-w-270 bg-black overflow-hidden "
        >
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full transition-transform rounded-xs border border-primary-500",
              getIndicatorColor(percentage)
            )}
            style={{ transform: `translateX(-${100 - percentage}%)` }}
          />
        </ProgressPrimitive.Root>
      </div>
      <div className="flex justify-between pr-8 pl-8 pb-8 ">
        <span className="opacity-90 text-subheadingMedium font-mulish">
          Speed. <span className="text-headingMdBold font-mulish">{speed}</span>
        </span>
        <span className="text-headingMdBold font-mulish">
          {currentHP}/{maxHP}
        </span>
      </div>
    </div>
  );
}
export { Progress };
