import { Cell } from "@tanstack/react-table";
import { Table } from "@mantine/core";

const TableBodyCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  const getCellContent = () => {
    if (typeof cell.column.columnDef.cell === "function") {
      return cell.column.columnDef.cell(cell.getContext());
    } else {
      return cell.getValue();
    }
  };

  return <Table.Td style={{ width: "inherit" }}>{getCellContent()}</Table.Td>;
};

export default TableBodyCell;
