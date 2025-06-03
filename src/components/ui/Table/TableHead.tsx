import React from "react";

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap " +
        (className || "")
      }
      {...props}
    />
  );
}

export default TableHead;
