import { CSSProperties, useState } from "react";
import { Row } from "@tanstack/react-table";
import { setClickedRowContent } from "../../util/content.util";

import TableCell from "./TableBodyCell";
import TableSubRow from "./TableSubRow";
import { useTableContext } from "../../provider/TableProvider";
import "./style.css";

interface TableBodyRowProps<T> {
  row: Row<T>;
  style?: CSSProperties;

  subRowProps?: {
    expandState?: boolean[];
    style?: CSSProperties;
    hoverColor?: string;
  };

  interactiveStyles?: {
    hoverColor?: string;
    clickedColor?: string;
  };
}

const TableBodyRow = <T,>(props: TableBodyRowProps<T>) => {
  const { row, style, interactiveStyles, subRowProps } = props;

  const cellGroup = row.getVisibleCells();

  const { rowClickEvent } = useTableContext();
  const [isRowClicked, setRowClick] = useState(false);

  const handleClickRow = (e: React.MouseEvent<HTMLTableRowElement>) => {
    setClickedRowContent(row.original);

    if (interactiveStyles?.clickedColor) {
      setRowClick(!isRowClicked);
    }

    if (rowClickEvent) {
      rowClickEvent({ rowIndex: row.index, e });
    }
  };

  return (
    <>
      <tr
        key={row.id}
        onClick={handleClickRow}
        style={
          {
            cursor: "default",
            "--row-hover-color": `${interactiveStyles?.hoverColor}`,
            backgroundColor: isRowClicked
              ? interactiveStyles?.clickedColor
              : style?.backgroundColor,
          } as CSSProperties
        }
        className="row"
      >
        {cellGroup.map((cell, index) => {
          return (
            <TableCell
              key={cell.id}
              cell={cell}
              index={index}
              rowIndex={row.index}
              style={style}
            />
          );
        })}
      </tr>

      {/* Sub Row */}
      {subRowProps?.expandState?.[row.index] && (
        <TableSubRow
          row={row}
          style={style}
          subRowStyles={{
            style: subRowProps?.style,
            hoverColor: subRowProps?.hoverColor,
          }}
        />
      )}
    </>
  );
};

export default TableBodyRow;
