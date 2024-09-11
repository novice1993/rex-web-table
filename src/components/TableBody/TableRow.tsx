import { Table } from "@mantine/core";
import { Row } from "@tanstack/react-table";
import TableCell from "./TableCell";
import { useGetTableRowUtil } from "../../hook/useGetTableRowUtil";

// test
import { useTableSubRowContext } from "../../provider/TableSubRowProvider";

const TableRow = <T,>({ row }: { row: Row<T> }) => {
  const cellGroup = row.getVisibleCells();
  const { handleClickTableRow } = useGetTableRowUtil({
    row,
    hasClickEvent: true,
  });
  const { subRowContent } = useTableSubRowContext();

  return (
    <>
      <Table.Tr key={row.id} onClickCapture={handleClickTableRow}>
        {cellGroup.map((cell) => {
          return <TableCell key={cell.id} cell={cell} />;
        })}
      </Table.Tr>

      {/* Sub Row */}
      <Table.Tr>
        {subRowContent.map((subRowContent) => {
          return <TableCell key={subRowContent.id} cell={subRowContent} />;
        })}
      </Table.Tr>
    </>
  );
};

export default TableRow;
