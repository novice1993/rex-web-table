import { Cell } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import { useTableContext } from "../../provider/TableProvider";
import { MouseEvent } from "react";

const TableBodyCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  const cellData = cell as Cell<unknown, unknown>;
  const { setCellValue, onCellClick } = useTableContext();

  const cellValue = setCellValue ? setCellValue(cellData) : null;

  const handleClickCell = (event: MouseEvent<HTMLTableCellElement>) => {
    if (onCellClick) {
      onCellClick({ cell: cellData, event });
    }
  };

  return <Table.Td onClick={(e) => handleClickCell(e)}>{cellValue}</Table.Td>;
};

export default TableBodyCell;
