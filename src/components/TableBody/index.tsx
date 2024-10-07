import { CSSProperties } from "react";
import TableBodyRow from "./TableBodyRow";
import { TableProps } from "../../type/type";

interface TableBodyProps<T> extends TableProps<T> {
  interactiveStyles: {
    hoverColor?: string;
    clickedColor?: string;
    subRowHoverColor?: string;
  };

  subRowExpand?: boolean;
  subRowStyle?: CSSProperties;
  subRowClassName?: string;
}

const TableBody = <T,>(props: TableBodyProps<T>) => {
  const {
    table,
    style,
    className,
    subRowExpand,
    subRowStyle,
    subRowClassName,
    interactiveStyles,
  } = props;
  const rows = table.getRowModel().rows;

  return (
    <tbody>
      {rows.map((row) => (
        <TableBodyRow
          key={row.id}
          style={style}
          className={className}
          row={row}
          subRowExpand={subRowExpand}
          subRowStyle={subRowStyle}
          subRowClassName={subRowClassName}
          interactiveStyles={interactiveStyles}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
