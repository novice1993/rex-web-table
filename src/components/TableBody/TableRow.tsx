import { Table } from "@mantine/core";
import { Row } from "@tanstack/react-table";
import TableCell from "./TableCell";
import { useGetTableRowUtil } from "../../hook/useGetTableRowUtil";

// test
import { useTableSubRowContext } from "../../provider/TableSubRowProvider";
import TableSubRow from "./TableSubRow";
import { useRef } from "react";

const TableRow = <T,>({ row }: { row: Row<T> }) => {
  const subTableId = useRef(0);
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
      {subRowContent.map((content) => {
        if (content.id === row.id) {
          subTableId.current += 1;
          return <TableSubRow key={subTableId.current} row={content} />;
        }
      })}
    </>
  );
};

export default TableRow;
