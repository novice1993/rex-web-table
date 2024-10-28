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
  const { borderLeftNone, borderTopNone } = useTableContext();

  // border가 있으면 제거한 새로운 스타일 객체 생성
  const { border, ...restStyle } = style || {};

  // border 속성을 개별적으로 나눔 (오버라이딩 방지)
  const borderTop = borderTopNone ? "none" : style?.borderTop || border;
  const borderRight = style?.borderRight || border;
  const borderBottom = style?.borderBottom || border;
  const borderLeft = borderLeftNone ? "none" : style?.borderLeft || border;

  return (
    <th
      key={header.id}
      style={{
        width: `${header.getSize()}px`,
        ...restStyle,
        height: "28px",
        borderTop, // borderTop 설정
        borderRight, // borderRight 설정
        borderBottom, // borderBottom 설정
        borderLeft, // borderLeft는 조건에 따라 설정
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
