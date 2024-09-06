import { TableProps } from "../../type/type";
import { Table } from "@mantine/core";
import TableRow from "./TableRow";

const TableBody = <T,>({ table }: TableProps<T>) => {
  const rows = table.getRowModel().rows;

  return (
    <Table.Tbody>
      {rows.map((row) => (
        <TableRow key={row.id} row={row} />
      ))}
    </Table.Tbody>
  );
};

export default TableBody;
