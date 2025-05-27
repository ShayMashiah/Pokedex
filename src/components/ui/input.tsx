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
    <div className="relative w-[293.17px] h-38">
      <Search
        className={cn(
          "absolute left-12 top-1/2 -translate-y-1/2 size-4 pointer-events-none transition-colors hover:text-neutrals-800 disabled:cursor-not-allowed disabled:text-neutrals-300", 
          value ? "text-neutrals-900" : "text-neutrals-600"
        )}
      />

      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className={cn(
          "peer w-full h-full pl-32 pr-32 py-8 rounded-k border",
          value
            ? "border-neutrals-900 text-neutrals-900 placeholder-transparent"
            : "border-neutrals-200 text-neutrals-600 placeholder:text-neutrals-600",
          "focus:outline-none focus:border-neutrals-500 focus:placeholder-transparent focus:text-neutrals-900",
          "hover:border-neutrals-600 hover:text-neutrals-800 hover:placeholder:text-neutrals-800",
          "active:border-neutrals-500 active:text-neutrals-900",
          "disabled:cursor-not-allowed disabled:placeholder:text-neutrals-300 disabled:bg-neutrals-100 disabled:border-neutrals-100",
          className
        )}
        {...props}
      />

      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-neutrals-400 hover:text-neutrals-600 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export { Input };
