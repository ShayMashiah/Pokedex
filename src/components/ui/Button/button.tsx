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
          "bg-primary-300 text-neutrals-white hover:bg-primary-400 active:bg-primary-500 active:shadow-[inset_4px_4px_13px_0px_#0000000D] disabled:bg-neutrals-100 disabled:border disabled:border-neutrals-200 disabled:text-neutrals-400 disabled:cursor-not-allowed",
        secondary:
          "bg-neutrals-white text-primary-300 border border-primary-300 rounded-md hover:bg-primary-50 active:bg-primary-100 active:shadow-[inset_4px_4px_13px_0px_#0000000D] disabled:border-neutrals-300 disabled:text-neutrals-300 disabled:cursor-not-allowed"

      },
      size: {
    
        sm: "w-76 h-32 pt-9 pb-9 pr-16 pl-16 gap-4 rounded-s",
        md: "w-82 h-36 pt-10 pb-10 pr-16 pl-16 gap-4 rounded-s",
        lg: "w-82 h-40 pt-12 pb-12 pr-16 pl-16 gap-4 rounded-s",
        l: "w-111 h-40 pt-12 pb-12 pr-16 pl-16 gap-4 rounded-s",
        xlg:"w-125 h-40 pt-12 pb-12 pr-16 pl-16 gap-4 rounded-s",
        xl:"w-146 h-40 pt-12 pb-12 pr-16 pl-16 gap-4 rounded-s",
        xxl: "w-150 h-40 pt-12 pb-12 pr-16 pl-16 gap-4 rounded-s",
        xxxl: "w-213 h-40 pt-12 pb-12 pr-16 pl-16 gap-4 rounded-s",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
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
