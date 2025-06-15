import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";


type InputProps = React.ComponentProps<"input"> & {
  variant?: "default" | "dropdown-input";
};

function Input({
  className,
  variant = "default",
  value,
  onChange,
  ...props
}: InputProps) {
  const isDropdown = variant === "dropdown-input";

  return (
    <div
      className={cn(
        "relative",
        "mb-6",

        isDropdown ? "w-206 h-38" : "w-[293.17px] h-38"
      )}
    >
      <Search
        className={cn(
          "absolute top-1/2 -translate-y-1/2 size-16 pointer-events-none transition-colors",
          isDropdown ? "left-12" : "left-12",
          value ? "text-neutrals-500" : "text-neutrals-600"
        )}
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className={cn(
          "peer w-full h-full rounded-k border pr-[80px] py-8 bg-neutral-100",
          isDropdown ? "pl-40 bg-neutrals-white" : "pl-32",

          value
            ? "border-neutrals-500 text-neutrals-500 placeholder-transparent"
            : "border-neutrals-200 text-neutrals-600 placeholder:text-neutrals-600",

          "focus:outline-none focus:border-neutrals-500 focus:placeholder-transparent focus:text-neutrals-500",
          "hover:border-neutrals-600 hover:text-neutrals-800 hover:placeholder:text-neutrals-800",
          "active:border-neutrals-500 active:text-neutrals-500",
          "disabled:cursor-not-allowed disabled:placeholder:text-neutrals-300 disabled:bg-neutrals-100 disabled:border-neutrals-100",

          className
        )}
        {...props}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange?.({ target: { value: "" } } as any)}
          className="absolute right-12 top-1/2 -translate-y-1/2 text-neutrals-400 hover:text-neutrals-600 transition-colors z-10"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export { Input };
