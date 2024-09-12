import { useTableContext } from "../provider/TableProvider";
import { Cell } from "@tanstack/react-table";

import { Table } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

export type CellClickEventType<T> = ({
  cell,
  table,
  subRowContent,
  setSubRowContent,
}: {
  cell?: Cell<T, unknown>;
  table?: Table<T>;
  subRowContent?: Array<unknown>;
  setSubRowContent?: Dispatch<SetStateAction<Array<unknown>>>;
}) => void;

interface TableCellUtilProps<T> {
  cell: Cell<T, unknown>;
  onCellClick?: CellClickEventType<T>;
}

export const useGetTableCellUtil = <T>({
  cell,
  onCellClick,
}: TableCellUtilProps<T>) => {
  const { subRowContent, setSubRowContent, table } = useTableContext<T>();

  const handleClickTableCell = (e: React.MouseEvent<HTMLTableCellElement>) => {
    if (onCellClick) {
      e.stopPropagation();

      onCellClick({ cell, table, subRowContent, setSubRowContent });
    }
  };

  return { handleClickTableCell };
};
