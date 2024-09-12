import { MouseEvent } from "react";
import { Cell } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import { useTableContext } from "../../provider/TableProvider";
// import { getCellValue } from "../../util/body.util";

import { useGetTableCellUtil } from "../../hook/useGetTableCellUtil";

const TableBodyCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  const { setCellValue } = useTableContext();

  const { handleClickTableCell } = useGetTableCellUtil({
    cell,
    hasClickEvent: true,
  });

  if (!setCellValue) return;

  const cellValue = setCellValue(cell as Cell<unknown, unknown>);

  const handleClickEvent = (e: MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    handleClickTableCell();
  };

  return <Table.Td onClick={handleClickEvent}>{cellValue}</Table.Td>;
};

export default TableBodyCell;
