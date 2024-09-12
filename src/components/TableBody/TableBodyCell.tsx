import { Cell } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import { useTableContext } from "../../provider/TableProvider";

import { useGetTableCellUtil } from "../../hook/useGetTableCellUtil";
import { CellClickEventType } from "../../hook/useGetTableCellUtil";

const TableBodyCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  const { setCellValue, onCellClick } = useTableContext();
  const { handleClickTableCell } = useGetTableCellUtil({
    cell,
    onCellClick: onCellClick as CellClickEventType<T>,
  });

  const cellValue = setCellValue
    ? setCellValue(cell as Cell<unknown, unknown>)
    : null;

  return (
    <Table.Td onClick={(e) => handleClickTableCell(e)}>{cellValue}</Table.Td>
  );
};

export default TableBodyCell;
