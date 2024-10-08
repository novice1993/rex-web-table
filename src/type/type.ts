import { CSSProperties } from "react";
import { Table } from "@tanstack/react-table";

export interface HeaderOptionType {
  accessorKey: string;
  layer: number; // Which row to place the header in
  rowSpan: number; // Height (row span)
  colSpan: number; // Width (column span)
}
export interface TableProps<T> {
  table: Table<T>;
  headerOption?: HeaderOptionType[];
  style?: CSSProperties;
}

export interface CellClickEventParam {
  cellIndex: number;
  rowIndex: number;
  e: React.MouseEvent<HTMLTableCellElement>;
}
