import { MouseEvent, ReactNode } from "react";
import { Cell } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import { useGetTableCellUtil } from "../../hook/useGetTableCellUtil";

const TableCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  const { getCellValue, handleClickTableCell } = useGetTableCellUtil({ cell });
  const cellValue = getCellValue() as ReactNode;

  const handleClickEvent = (e: MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    handleClickTableCell();
  };

  return <Table.Td onClick={handleClickEvent}>{cellValue}</Table.Td>;
};

export default TableCell;
