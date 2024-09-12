import { useGetTableRowUtil } from "../../hook/useGetTableRowUtil";

import { Table } from "@mantine/core";
import { Row } from "@tanstack/react-table";
import TableCell from "./TableBodyCell";
import TableSubRow from "./TableSubRow";

const TableBodyRow = <T,>({ row }: { row: Row<T> }) => {
  const cellGroup = row.getVisibleCells();
  const { handleClickTableRow } = useGetTableRowUtil({
    row,
    hasClickEvent: true,
  });

  return (
    <>
      <Table.Tr key={row.id} onClick={handleClickTableRow}>
        {cellGroup.map((cell) => {
          return <TableCell key={cell.id} cell={cell} />;
        })}
      </Table.Tr>

      {/* Sub Row */}
      <TableSubRow row={row} />
    </>
  );
};

export default TableBodyRow;
