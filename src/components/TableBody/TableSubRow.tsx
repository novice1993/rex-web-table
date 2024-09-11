import { useGetTableRowUtil } from "../../hook/useGetTableRowUtil";
import { Row } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import TableCell from "./TableCell";

const TableSubRow = <T,>({ row }: { row: Row<T> }) => {
  const cellGroup = row.getVisibleCells();
  const { handleClickTableRow } = useGetTableRowUtil({
    row,
    hasClickEvent: true,
  });

  return (
    <Table.Tr
      key={row.id}
      onClickCapture={handleClickTableRow}
      style={{ backgroundColor: "darkgray" }}
    >
      {cellGroup.map((cell) => {
        return <TableCell key={cell.id} cell={cell} />;
      })}
    </Table.Tr>
  );
};

export default TableSubRow;
