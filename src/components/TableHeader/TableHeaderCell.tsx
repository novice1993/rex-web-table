import { ReactNode } from "react";
import { Table } from "@mantine/core";
import { Header } from "@tanstack/react-table";
import { handleClickHeaderForSorting } from "../../util/header.util";

interface TableHeaderCellProps<T> {
  header: Header<T, unknown>;
}

const TableHeaderCell = <T,>({ header }: TableHeaderCellProps<T>) => {
  return (
    <Table.Th
      key={header.id}
      colSpan={header.colSpan}
      rowSpan={header.rowSpan}
      style={{
        textAlign: "center",
      }}
      onClick={() => handleClickHeaderForSorting(header)}
    >
      {header.column.columnDef.header as ReactNode}
    </Table.Th>
  );
};

export default TableHeaderCell;
