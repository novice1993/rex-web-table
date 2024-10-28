import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Row } from "@tanstack/react-table";
import { setClickedRowContent } from "../../util/content.util";

import TableCell from "./TableBodyCell";
import TableSubRow from "./TableSubRow";
import { useTableContext } from "../../provider/TableProvider";

import { RowSelectionType } from ".";
import "./style.css";

interface TableBodyRowProps<T> {
  row: Row<T>;
  style?: CSSProperties;
  selectedRowIndex: null | number;
  setSelectedRowIndex: Dispatch<SetStateAction<null | number>>;

  subRowProps?: {
    expandState?: boolean[];
    style?: CSSProperties;
    hoverColor?: string;
  };

  interactiveStyles?: {
    hoverColor?: string;
    clickedColor?: string;
  };

  rowSelectionType?: RowSelectionType;
  groupSelectionRange?: number;
}

const TableBodyRow = <T,>(props: TableBodyRowProps<T>) => {
  const {
    row,
    style,
    interactiveStyles,
    subRowProps,
    selectedRowIndex,
    setSelectedRowIndex,
    rowSelectionType,
    groupSelectionRange,
  } = props;

  const cellGroup = row.getVisibleCells();
  const { rowClickEvent } = useTableContext();
  const [isRowClicked, setRowClick] = useState(false);

  const handleClickRow = (e: React.MouseEvent<HTMLTableRowElement>) => {
    // set clicked row info
    setClickedRowContent(row.original);

    // about clicked row color change event
    if (rowSelectionType === "multiple") {
      setRowClick(!isRowClicked);
    } else if (
      rowSelectionType === "single" ||
      rowSelectionType === "grouped"
    ) {
      setSelectedRowIndex(row.index);
      setRowClick(!isRowClicked);
    }

    // about row clicked event provided via Context provider
    if (rowClickEvent) {
      rowClickEvent({ rowIndex: row.index, e });
    }
  };

  useEffect(
    function updateRowSelection() {
      //  prevent init excution
      if (selectedRowIndex === null) return;

      // when selectionType grouped, set selected range
      if (
        rowSelectionType === "grouped" &&
        selectedRowIndex &&
        groupSelectionRange
      ) {
        const isWithinRange =
          selectedRowIndex - (groupSelectionRange ?? 0) <= row.index &&
          row.index <= selectedRowIndex + (groupSelectionRange ?? 0);
        return setRowClick(isWithinRange);
      }

      // when selectionType single, select only matching row
      if (rowSelectionType === "single") {
        setRowClick(selectedRowIndex === row.index);
      }
    },
    [selectedRowIndex]
  );

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
        {cellGroup.map((cell, index) => (
          <TableCell
            key={cell.id}
            cell={cell}
            index={index}
            rowIndex={row.index}
            style={style}
          />
        ))}
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
