import { CSSProperties } from "react";
import { Cell } from "@tanstack/react-table";
import { setClickedCellContent } from "../../util/content.util";
import { useTableContext } from "../../provider/TableProvider";

interface TableBodyCellProps<T> {
  cell: Cell<T, unknown>;
  index: number;
  rowIndex: number;
  style?: CSSProperties;
}

const TableBodyCell = <T,>({
  cell,
  index,
  rowIndex,
  style,
}: TableBodyCellProps<T>) => {
  const { cellClickEvent, borderLeftNone } = useTableContext();

  // If it's a function, apply custom cell value when generating columns
  const cellValue =
    typeof cell.column.columnDef.cell === "function"
      ? cell.column.columnDef.cell(cell.getContext())
      : cell.getValue();

  const handleClickCell = (e: React.MouseEvent<HTMLTableCellElement>) => {
    setClickedCellContent(cellValue);

    if (cellClickEvent) {
      cellClickEvent({ cellIndex: index, rowIndex, e });
    }
  };

  // border가 있으면 제거한 새로운 스타일 객체 생성
  const { border, ...restStyle } = style || {};

  // border 속성을 개별적으로 나눔 (오버라이딩 방지)
  const borderTop = style?.borderTop || border;
  const borderRight = style?.borderRight || border;
  const borderBottom = style?.borderBottom || border;
  const borderLeft = borderLeftNone ? "none" : style?.borderLeft || border;

  return (
    <td
      style={{
        ...restStyle,
        backgroundColor: undefined,
        height: "36px",
        borderTop, // borderTop 설정
        borderRight, // borderRight 설정
        borderBottom, // borderBottom 설정
        borderLeft, // borderLeft는 조건에 따라 설정
      }}
      onClick={handleClickCell}
    >
      {cellValue}
    </td>
  );
};

export default TableBodyCell;
