import { CSSProperties } from "react";
import { Table } from "@tanstack/react-table";

export interface HeaderOptionType {
  accessorKey: string;
  layer: number; // 몇번째 행에 위치시킬지
  rowSpan: number; // 높이
  colSpan: number; // 너비
}
export interface TableProps<T> {
  table: Table<T>;
  headerOptionType?: HeaderOptionType[];
  style?: CSSProperties;
  className?: string;
}
