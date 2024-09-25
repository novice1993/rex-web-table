import { ReactNode } from "react";
// import { Table } from "@mantine/core";
import { Header } from "@tanstack/react-table";
import {
  handleClickHeaderForSorting,
  getSortingDirectionUi,
} from "../../util/header.util";

interface TableHeaderCellProps<T> {
  header: Header<T, unknown>;
}

const TableHeaderCell = <T,>({ header }: TableHeaderCellProps<T>) => {
  const headerName = header.column.columnDef.header as ReactNode;
  const sortingType = header.column.getIsSorted();
  const sortingTypeIcon = getSortingDirectionUi(sortingType);

  // return (
  //   <Table.Th
  //     key={header.id}
  //     colSpan={header.colSpan}
  //     rowSpan={header.rowSpan}
  //     style={{
  //       textAlign: "center",
  //     }}
  //     onClick={() => handleClickHeaderForSorting(header)}
  //   >
  //     <div style={{ display: "flex", justifyContent: "center", gap: "3px" }}>
  //       <span>{headerName}</span>
  //       <span>{sortingTypeIcon}</span>
  //     </div>
  //   </Table.Th>
  // );
  return (
    <th
      key={header.id}
      colSpan={header.colSpan}
      rowSpan={header.rowSpan}
      style={{
        textAlign: "center",
        padding: "8px",
        border: "1px solid #ddd",
      }}
      onClick={() => handleClickHeaderForSorting(header)}
    >
      <div style={{ display: "flex", justifyContent: "center", gap: "3px" }}>
        <span>{headerName}</span>
        <span style={{ cursor: "pointer" }}>{sortingTypeIcon}</span>
      </div>
    </th>
  );
};

export default TableHeaderCell;
