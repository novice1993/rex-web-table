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
  const { cellClickEvent } = useTableContext();

  // typeof fucntion 일 경우, columns 생성 시 custom 한 cell value 적용
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

  return (
    <td
      style={{ ...style, backgroundColor: undefined }}
      onClick={handleClickCell}
    >
      {cellValue}
    </td>
  );
};

export default TableBodyCell;
