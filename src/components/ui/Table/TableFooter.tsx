import React from "react";
import TableRow from "./TableRow";
import TableCell from "./TableCell";

function TableFooter({ children }: { children: React.ReactNode }) {
  return (
    <tfoot>
      <TableRow>
        <TableCell colSpan={5}>{children}</TableCell>
      </TableRow>
    </tfoot>
  );
}

export default TableFooter;
