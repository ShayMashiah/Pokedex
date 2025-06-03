import React from "react";

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={"p-2 align-middle whitespace-nowrap " + (className || "")}
      {...props}
    />
  );
}

export default TableCell;
