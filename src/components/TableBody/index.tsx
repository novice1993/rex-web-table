import TableBodyRow from "./TableBodyRow";
import { TableProps } from "../../type/type";
import { CSSProperties } from "react";

interface TableBodyProps<T> extends TableProps<T> {
  subRowStyle?: CSSProperties;
}

const TableBody = <T,>(props: TableBodyProps<T>) => {
  const { table, style, className, subRowStyle } = props;
  const rows = table.getRowModel().rows;

  return (
    <tbody>
      {rows.map((row) => (
        <TableBodyRow
          key={row.id}
          style={style}
          className={className}
          row={row}
          subRowStyle={subRowStyle}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
