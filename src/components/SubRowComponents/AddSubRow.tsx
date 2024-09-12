import { useGetTableRowUtil } from "../../hook/useGetTableRowUtil";
import { Row } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import TableBodyCell from "../TableBody/TableBodyCell";

const AddSubRow = <T,>({ content }: { content: unknown }) => {
  const row = content as Row<T>;

  const cellGroup = row.getVisibleCells();
  const { handleClickTableRow } = useGetTableRowUtil({
    row,
    hasClickEvent: true,
  });

  return (
    <Table.Tr
      key={row.id}
      onClick={handleClickTableRow}
      style={{ backgroundColor: "darkgray" }}
    >
      {cellGroup.map((cell) => {
        return <TableBodyCell key={cell.id} cell={cell} />;
      })}
    </Table.Tr>
  );
};

export default AddSubRow;
