import { Table } from "@mantine/core";
import { Row } from "@tanstack/react-table";
import TableCell from "./TableCell";
import { useGetTableRowUtil } from "../../hook/useGetTableRowUtil";

const TableRow = <T,>({ row }: { row: Row<T> }) => {
  const cellGroup = row.getVisibleCells();
  const { handleClickTableRow } = useGetTableRowUtil({ row, hasClickEvent: true });

  return (
    <Table.Tr key={row.id} onClickCapture={handleClickTableRow}>
      {cellGroup.map((cell) => {
        return <TableCell key={cell.id} cell={cell} />;
      })}
    </Table.Tr>
  );
};

export default TableRow;
