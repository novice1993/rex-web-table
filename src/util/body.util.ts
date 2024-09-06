import { Cell } from "@tanstack/react-table";
import { ReactNode } from "react";

// cell click event
export const handleClickTableCell = <T>(
  e: React.MouseEvent<HTMLTableCellElement>,
  cellValue: ReactNode,
  cell: Cell<T, unknown>
) => {
  console.log("table cell click event", e);
  console.log("table cell value", cellValue);
  console.log("table cell data", cell);
};
