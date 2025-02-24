import { CSSProperties, useState } from "react";
import TableBodyRow from "../../components/TableBody/TableBodyRow";
import { TableProps } from "../../type/type";
import { VirtualItem } from "@tanstack/react-virtual";

export type RowSelectionType = "single" | "multiple" | "grouped";

interface BaseTableBodyProps<T> extends TableProps<T> {
  subRowProps?: {
    expandState?: boolean[];
    style?: CSSProperties;
    hoverColor?: string;
  };
  virtualizeItems: VirtualItem[];
}

type SingleSelectionProps<T> = BaseTableBodyProps<T> & {
  rowSelectionType: "single";
  interactiveStyles: { hoverColor?: string; clickedColor: string };
  defaultSelectedRowIndex?: number;
  groupSelectionRange?: never;
};

type MultipleSelectionProps<T> = BaseTableBodyProps<T> & {
  rowSelectionType: "multiple";
  interactiveStyles: { hoverColor?: string; clickedColor: string };
  defaultSelectedRowIndex?: never;
  groupSelectionRange?: never;
};

type GroupedSelectionProps<T> = BaseTableBodyProps<T> & {
  rowSelectionType: "grouped";
  interactiveStyles: { hoverColor?: string; clickedColor: string };
  defaultSelectedRowIndex?: never;
  groupSelectionRange: number;
};

type NoSelectionProps<T> = BaseTableBodyProps<T> & {
  rowSelectionType?: undefined;
  interactiveStyles?: { hoverColor?: string; clickedColor?: never };
  defaultSelectedRowIndex?: never;
  groupSelectionRange?: never;
};

type VirtualizedTableBodyProps<T> =
  | SingleSelectionProps<T>
  | MultipleSelectionProps<T>
  | GroupedSelectionProps<T>
  | NoSelectionProps<T>;

const VirtualTableBody = <T,>(props: VirtualizedTableBodyProps<T>) => {
  const {
    table,
    style,
    subRowProps,
    interactiveStyles,
    rowSelectionType,
    defaultSelectedRowIndex,
    groupSelectionRange,
    virtualizeItems,
  } = props;

  const rows = table.getRowModel().rows;
  const [selectedRowIndex, setSelectedRowIndex] = useState<null | number>(
    defaultSelectedRowIndex !== undefined ? defaultSelectedRowIndex : null
  );

  return (
    <tbody>
      {virtualizeItems.map((virtualItem) => {
        const row = rows[virtualItem.index]; // virtualItem.index를 이용하여 실제 row를 가져옵니다.
        return (
          <TableBodyRow
            key={row.id}
            style={style}
            row={row}
            subRowProps={subRowProps}
            interactiveStyles={interactiveStyles}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            rowSelectionType={rowSelectionType}
            groupSelectionRange={groupSelectionRange}
          />
        );
      })}
    </tbody>
  );
};

export default VirtualTableBody;
