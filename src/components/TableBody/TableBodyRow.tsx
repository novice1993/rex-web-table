import { Table } from "@mantine/core";
import { Row } from "@tanstack/react-table";
import TableCell from "./TableBodyCell";
import TableSubRow from "./TableSubRow";

const TableBodyRow = <T,>({ row }: { row: Row<T> }) => {
  const cellGroup = row.getVisibleCells();

  return (
    <>
      <Table.Tr key={row.id}>
        {cellGroup.map((cell) => {
          return <TableCell key={cell.id} cell={cell} />;
        })}
      </Table.Tr>

      {/* Sub Row */}
      <TableSubRow />
    </>
  );
};

export default TableBodyRow;
