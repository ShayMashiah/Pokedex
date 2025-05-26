import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-300 text-neutrals-white hover:primary-400 active:bg-primary-500 active:shadow-[inset_4px_4px_13px_0px_#0000000D] disabled:bg-neutrals-100 disabled:border disabled:border-neutrals-200 disabled:text-neutrals-400 disabled:cursor-not-allowed",
        secondary:
          "bg-neutrals-white text-primary-300 border border-primary-300 rounded-md hover:bg-primary-50 active:bg-primary-100 active:shadow-[inset_4px_4px_13px_0px_#0000000D] disabled:border-neutrals-300 disabled:text-neutrals-300 disabled:cursor-not-allowed"

      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "w-[76px] h-[32px] pt-[9px] pb-[9px] pr-[16px] pl-[16px] gap-[4px] rounded-[4px]",
        md: "w-[82px] h-[36px] pt-[10px] pb-[10px] pr-[16px] pl-[16px] gap-[4px] rounded-[4px]",
        lg: "w-[82px] h-[40px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] gap-[4px] rounded-[4px]",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
