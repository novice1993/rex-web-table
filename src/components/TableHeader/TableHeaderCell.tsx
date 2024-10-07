import { ReactNode, CSSProperties } from "react";
import { Header } from "@tanstack/react-table";
import {
  handleClickHeaderForSorting,
  getSortingDirectionUi,
} from "../../util/header.util";

interface TableHeaderCellProps<T> {
  header: Header<T, unknown>;
  style?: CSSProperties;
}

const TableHeaderCell = <T,>({ header, style }: TableHeaderCellProps<T>) => {
  const headerName = header.column.columnDef.header as ReactNode;
  const sortingType = header.column.getIsSorted();
  const sortingTypeIcon = getSortingDirectionUi(sortingType);

  return (
    <th
      key={header.id}
      style={{
        width: `${header.getSize()}px`,
        ...style,
      }}
      colSpan={header.colSpan}
      rowSpan={header.rowSpan}
      onClick={() => handleClickHeaderForSorting(header)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "3px",
        }}
      >
        <span>{headerName}</span>
        <span style={{ cursor: "pointer" }}>{sortingTypeIcon}</span>
      </div>
    </th>
  );
};

export default TableHeaderCell;
