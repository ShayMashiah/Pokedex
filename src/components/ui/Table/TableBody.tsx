import React from "react";

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      className={"[&_tr:last-child]:border-0 " + (className || "")}
      {...props}
    />
  );
}

export default TableBody;
