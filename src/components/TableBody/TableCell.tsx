import { ReactNode } from "react";
import { Cell } from "@tanstack/react-table";
import { Table } from "@mantine/core";

type CellClickEventHandlerType = (params: unknown) => void;

const TableCell = <T,>({
  cell,
  cellClickEventHandler,
}: {
  cell: Cell<T, unknown>;
  cellClickEventHandler?: CellClickEventHandlerType;
}) => {
  const cellValue = cell.getContext().renderValue() as ReactNode;

  return (
    <Table.Td onClickCapture={cellClickEventHandler}>{cellValue}</Table.Td>
  );
};

export default TableCell;
