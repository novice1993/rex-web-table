import { Table } from "@mantine/core";
import { HeaderDataType } from "../../util/header.util";
import TableHeaderCell from "./TableHeaderCell";

interface TableHeaderRowProps<T> {
  headerGroup: HeaderDataType<T>;
}

const TableHeaderRow = <T,>({ headerGroup }: TableHeaderRowProps<T>) => {
  return (
    <Table.Tr>
      {headerGroup.headers.map((header) => (
        <TableHeaderCell key={header.id} header={header} />
      ))}
    </Table.Tr>
  );
};

export default TableHeaderRow;
