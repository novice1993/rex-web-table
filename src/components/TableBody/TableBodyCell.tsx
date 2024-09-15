import { Cell } from "@tanstack/react-table";
import { Table } from "@mantine/core";

const TableBodyCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  // typeof fucntion 일 경우, columns 생성 시 custom 한 cell value 적용
  const cellValue =
    typeof cell.column.columnDef.cell === "function"
      ? cell.column.columnDef.cell(cell.getContext())
      : cell.getValue();

  return <Table.Td style={{ width: "inherit" }}>{cellValue}</Table.Td>;
};

export default TableBodyCell;
