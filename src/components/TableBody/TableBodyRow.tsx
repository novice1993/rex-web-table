import { CSSProperties, useState } from "react";
import TableCell from "./TableBodyCell";
import TableSubRow from "./TableSubRow";
import { Row } from "@tanstack/react-table";
import { useTableContext } from "../../provider/TableProvider";
import "./style.css";

interface TableBodyRowProps<T> {
  row: Row<T>;
  style?: CSSProperties;

  subRowProps?: {
    isExpand: boolean;
    style?: CSSProperties;
    hoverColor?: string;
  };

  interactiveStyles: {
    hoverColor?: string;
    clickedColor?: string;
  };
}

const TableBodyRow = <T,>(props: TableBodyRowProps<T>) => {
  const { row, style, interactiveStyles, subRowProps } = props;

  const cellGroup = row.getVisibleCells();
  const { hoverColor, clickedColor } = interactiveStyles;

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
          return <TableCell key={cell.id} cell={cell} style={style} />;
        })}
      </tr>

      {/* Sub Row */}
      {subRowProps?.isExpand && row.getIsExpanded() && (
        <TableSubRow
          row={row}
          style={style}
          subRowStyles={{
            style: subRowProps.style,
            hoverColor: subRowProps.hoverColor,
          }}
        />
      )}
    </>
  );
};

export default TableBodyRow;
