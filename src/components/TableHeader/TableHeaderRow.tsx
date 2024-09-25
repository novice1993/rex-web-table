import { HeaderDataType } from "../../util/header.util";
import TableHeaderCell from "./TableHeaderCell";

interface TableHeaderRowProps<T> {
  headerGroup: HeaderDataType<T>;
}

const TableHeaderRow = <T,>({ headerGroup }: TableHeaderRowProps<T>) => {
  return (
    <tr>
      {headerGroup.headers.map((header) => (
        <TableHeaderCell key={header.id} header={header} />
      ))}
    </tr>
  );
};

export default TableHeaderRow;
