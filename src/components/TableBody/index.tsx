import { CSSProperties } from "react";
import TableBodyRow from "./TableBodyRow";
import { TableProps } from "../../type/type";

interface TableBodyProps<T> extends TableProps<T> {
  interactiveStyles: {
    hoverColor?: string;
    clickedColor?: string;
  };
  subRowProps?: {
    isExpand: boolean;
    style?: CSSProperties;
    hoverColor?: string;
  };
}

const TableBody = <T,>(props: TableBodyProps<T>) => {
  const { table, style, subRowProps, interactiveStyles } = props;
  const rows = table.getRowModel().rows;

  return (
    <tbody>
      {rows.map((row) => (
        <TableBodyRow
          key={row.id}
          style={style}
          row={row}
          subRowProps={subRowProps}
          interactiveStyles={interactiveStyles}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
