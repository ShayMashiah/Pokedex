import React from "react";

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={" " + (className || "")}
      {...props}
    />
  );
}

export default TableCell;
