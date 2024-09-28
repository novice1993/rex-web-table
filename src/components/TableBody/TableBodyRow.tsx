import { CSSProperties } from "react";
import TableCell from "./TableBodyCell";
import TableSubRow from "./TableSubRow";
import { Row } from "@tanstack/react-table";
import { useTableContext } from "../../provider/TableProvider";

interface TableBodyRowProps<T> {
  row: Row<T>;
  style?: CSSProperties;
  className?: string;
  subRowStyle?: CSSProperties;
}

const TableBodyRow = <T,>(props: TableBodyRowProps<T>) => {
  const { row, style, className, subRowStyle } = props;
  const cellGroup = row.getVisibleCells();
  const { rowClickEvent } = useTableContext();

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (rowClickEvent) {
      e.stopPropagation();
      rowClickEvent(row as Row<unknown>);
    }
  };

  return (
    <>
      <tr key={row.id} onClick={handleRowClick} style={{ cursor: "default" }}>
        {cellGroup.map((cell) => {
          return (
            <TableCell
              key={cell.id}
              cell={cell}
              style={style}
              className={className}
            />
          );
        })}
      </tr>

      {/* Sub Row */}
      {row.getIsExpanded() && (
        <TableSubRow
          row={row}
          style={style}
          className={className}
          subRowStyle={subRowStyle}
        />
      )}
    </>
  );
};

export default TableBodyRow;
