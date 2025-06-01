import React from "react";

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors " +
        (className || "")
      }
      {...props}
    />
  );
}

export default TableRow;
