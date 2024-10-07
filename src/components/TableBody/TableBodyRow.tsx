import { CSSProperties, useState } from "react";
import TableCell from "./TableBodyCell";
import TableSubRow from "./TableSubRow";
import { Row } from "@tanstack/react-table";
import { useTableContext } from "../../provider/TableProvider";
import "./style.css";

interface TableBodyRowProps<T> {
  row: Row<T>;
  style?: CSSProperties;
  className?: string;

  subRowExpand?: boolean;
  subRowStyle?: CSSProperties;
  subRowClassName?: string;

  interactiveStyles: {
    hoverColor?: string;
    clickedColor?: string;
    subRowHoverColor?: string;
  };
}

const TableBodyRow = <T,>(props: TableBodyRowProps<T>) => {
  const {
    row,
    style,
    subRowStyle,
    interactiveStyles,

    className,
    subRowClassName,
    subRowExpand,
  } = props;

  const cellGroup = row.getVisibleCells();
  const { hoverColor, clickedColor, subRowHoverColor } = interactiveStyles;

  const { rowClickEvent } = useTableContext();
  const [isRowClicked, setRowClick] = useState(false);

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (clickedColor) {
      setRowClick(!isRowClicked);
    }

    if (rowClickEvent) {
      e.stopPropagation();
      rowClickEvent(row as Row<unknown>);
    }
  };

  return (
    <>
      <tr
        key={row.id}
        onClick={handleRowClick}
        style={
          {
            cursor: "default",
            "--row-hover-color": `${hoverColor}`,
            backgroundColor: isRowClicked
              ? clickedColor
              : style?.backgroundColor,
          } as CSSProperties
        }
        className="row"
      >
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
      {subRowExpand && row.getIsExpanded() && (
        <TableSubRow
          row={row}
          style={style}
          className={className}
          subRowStyle={subRowStyle}
          subRowClassName={subRowClassName}
          subRowHoverColor={subRowHoverColor}
        />
      )}
    </>
  );
};

export default TableBodyRow;
