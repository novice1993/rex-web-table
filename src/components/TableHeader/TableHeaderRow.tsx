import { CSSProperties } from "react";
import { HeaderDataType } from "../../util/header.util";
import TableHeaderCell from "./TableHeaderCell";

interface TableHeaderRowProps<T> {
  headerGroup: HeaderDataType<T>;
  style?: CSSProperties;
}

const TableHeaderRow = <T,>({ headerGroup, style }: TableHeaderRowProps<T>) => {
  return (
    <tr>
      {headerGroup.headers.map((header) => (
        <TableHeaderCell key={header.id} style={style} header={header} />
      ))}
    </tr>
  );
};

export default TableHeaderRow;
