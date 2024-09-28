import { CSSProperties } from "react";
import { HeaderDataType } from "../../util/header.util";
import TableHeaderCell from "./TableHeaderCell";

interface TableHeaderRowProps<T> {
  headerGroup: HeaderDataType<T>;
  style?: CSSProperties;
  className?: string;
}

const TableHeaderRow = <T,>({
  headerGroup,
  style,
  className,
}: TableHeaderRowProps<T>) => {
  return (
    <tr>
      {headerGroup.headers.map((header) => (
        <TableHeaderCell
          key={header.id}
          className={className}
          style={style}
          header={header}
        />
      ))}
    </tr>
  );
};

export default TableHeaderRow;
