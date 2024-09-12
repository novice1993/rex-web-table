import { MouseEvent, ReactNode } from "react";
import { Cell } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import { useGetTableCellUtil } from "../../hook/useGetTableCellUtil";

const TableBodyCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  const { getCellValue, handleClickTableCell } = useGetTableCellUtil({
    cell,
    hasClickEvent: true,
  });
  const cellValue = getCellValue() as ReactNode;

  const handleClickEvent = (e: MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    handleClickTableCell();
  };

  return <Table.Td onClick={handleClickEvent}>{cellValue}</Table.Td>;
};

export default TableBodyCell;
