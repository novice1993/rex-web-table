import { Table } from "@mantine/core";
import { Row } from "@tanstack/react-table";
import TableCell from "./TableCell";

const TableRow = <T,>({ row }: { row: Row<T> }) => {
  const cellGroup = row.getVisibleCells();

  return (
    <Table.Tr key={row.id}>
      {cellGroup.map((cell) => {
        return <TableCell key={cell.id} cell={cell} />;
      })}
    </Table.Tr>
  );
};

export default TableRow;
