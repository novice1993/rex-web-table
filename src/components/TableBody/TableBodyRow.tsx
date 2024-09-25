// import { Table } from "@mantine/core";
import { Row } from "@tanstack/react-table";
import TableCell from "./TableBodyCell";
import TableSubRow from "./TableSubRow";
import { useTableContext } from "../../provider/TableProvider";

const TableBodyRow = <T,>({ row }: { row: Row<T> }) => {
  const cellGroup = row.getVisibleCells();
  const { rowClickEvent } = useTableContext();

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (rowClickEvent) {
      e.stopPropagation();
      rowClickEvent(row as Row<unknown>);
    }
  };

  // return (
  //   <>
  //     <Table.Tr key={row.id} onClick={handleRowClick}>
  //       {cellGroup.map((cell) => {
  //         return <TableCell key={cell.id} cell={cell} />;
  //       })}
  //     </Table.Tr>

  //     {/* Sub Row */}
  //     {row.getIsExpanded() && <TableSubRow row={row} />}
  //   </>
  // );

  return (
    <>
      <tr key={row.id} onClick={handleRowClick} style={{ cursor: "pointer" }}>
        {cellGroup.map((cell) => {
          return <TableCell key={cell.id} cell={cell} />;
        })}
      </tr>

      {/* Sub Row */}
      {row.getIsExpanded() && <TableSubRow row={row} />}
    </>
  );
};

export default TableBodyRow;
