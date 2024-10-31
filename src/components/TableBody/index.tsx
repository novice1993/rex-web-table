import { CSSProperties, useState } from "react";
import TableBodyRow from "./TableBodyRow";
import { TableProps } from "../../type/type";

export type RowSelectionType = "single" | "multiple" | "grouped";

interface BaseTableBodyProps<T> extends TableProps<T> {
  subRowProps?: {
    expandState?: boolean[];
    style?: CSSProperties;
    hoverColor?: string;
  };
}

type SingleSelectionProps<T> = BaseTableBodyProps<T> & {
  rowSelectionType: "single";
  interactiveStyles: {
    hoverColor?: string;
    clickedColor: string;
  };
  defaultSelectedRowIndex?: number;
  groupSelectionRange?: never;
};

type MultipleSelectionProps<T> = BaseTableBodyProps<T> & {
  rowSelectionType: "multiple";
  interactiveStyles: {
    hoverColor?: string;
    clickedColor: string;
  };
  defaultSelectedRowIndex?: never;
  groupSelectionRange?: never;
};

type GroupedSelectionProps<T> = BaseTableBodyProps<T> & {
  rowSelectionType: "grouped";
  interactiveStyles: {
    hoverColor?: string;
    clickedColor: string;
  };
  defaultSelectedRowIndex?: never;
  groupSelectionRange: number;
};

type NoSelectionProps<T> = BaseTableBodyProps<T> & {
  rowSelectionType?: undefined;
  interactiveStyles?: {
    hoverColor?: string;
    clickedColor?: never;
  };
  defaultSelectedRowIndex?: never;
  groupSelectionRange?: never;
};

type TableBodyProps<T> =
  | SingleSelectionProps<T>
  | MultipleSelectionProps<T>
  | GroupedSelectionProps<T>
  | NoSelectionProps<T>;

const TableBody = <T,>(props: TableBodyProps<T>) => {
  const {
    table,
    style,
    subRowProps,
    interactiveStyles,
    rowSelectionType,
    defaultSelectedRowIndex,
    groupSelectionRange,
  } = props;

  const rows = table.getRowModel().rows;
  const [selectedRowIndex, setSelectedRowIndex] = useState<null | number>(
    defaultSelectedRowIndex !== undefined ? defaultSelectedRowIndex : null
  );

  return (
    <tbody>
      {rows.map((row) => (
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
      ))}
    </tbody>
  );
};

export default TableBody;
