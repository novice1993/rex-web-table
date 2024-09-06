import { ReactNode } from "react";
import { Cell } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import { handleClickTableCell } from "../../util/body.util";

const TableCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  const cellValue = cell.getContext().renderValue() as ReactNode;

  return (
    <Table.Td onClick={(e) => handleClickTableCell(e, cellValue, cell)}>
      {cellValue}
    </Table.Td>
  );
};

export default TableCell;
