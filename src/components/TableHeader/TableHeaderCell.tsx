import { ReactNode, CSSProperties } from "react";
import { useTableContext } from "../../provider/TableProvider";
import { Header } from "@tanstack/react-table";
import { handleClickHeaderForSorting } from "../../util/header.util";

interface TableHeaderCellProps<T> {
  header: Header<T, unknown>;
  style?: CSSProperties;
}

const TableHeaderCell = <T,>({ header, style }: TableHeaderCellProps<T>) => {
  const headerName = header.column.columnDef.header as ReactNode;
  const { borderTopNone } = useTableContext();

  return (
    <th
      key={header.id}
      style={{
        width: `${header.getSize()}px`,
        ...style,
        height: "28px",
        borderLeft: "none",
        borderTop: borderTopNone ? "none" : style?.border,
      }}
      colSpan={header.colSpan}
      rowSpan={header.rowSpan}
      onClick={() => handleClickHeaderForSorting(header)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {headerName}
      </div>
    </th>
  );
};

export default TableHeaderCell;
