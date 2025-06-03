import React from "react";

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={"[&_tr]:border-b " + (className || "")} {...props} />;
}

export default TableHeader;
