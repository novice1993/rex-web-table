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
