import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useState } from "react";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-[293.17px] h-[38px]">
      <Search
        className={cn(
          "absolute left-[12px] top-1/2 -translate-y-1/2 size-4 pointer-events-none transition-colors hover:text-neutral-800 disabled:cursor-not-allowed disabled:text-neutrals-300", 
          value ? "text-neutral-900" : "text-neutral-600"
        )}
      />

      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className={cn(
          "peer w-full h-full pl-[32px] pr-[32px] py-[8px] rounded-[8px] border",
          value
            ? "border-neutral-900 text-neutral-900 placeholder-transparent"
            : "border-neutrals-200 text-neutral-600 placeholder:text-neutral-600",
          "focus:outline-none focus:border-neutral-500 focus:placeholder-transparent focus:text-neutral-900",
          "hover:border-neutral-600 hover:text-neutral-800 hover:placeholder:text-neutral-800",
          "active:border-neutral-500 active:text-neutral-900",
          "disabled:cursor-not-allowed disabled:placeholder:text-neutrals-300 disabled:bg-neutrals-100 disabled:border-neutrals-100",
          className
        )}
        {...props}
      />

      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="absolute right-[8px] top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export { Input };
