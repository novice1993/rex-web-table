import { TableProps } from "../../type/type";
import { Table } from "@mantine/core";
import TableBodyRow from "./TableBodyRow";

const TableBody = <T,>({ table }: TableProps<T>) => {
  const rows = table.getRowModel().rows;

  return (
    <Table.Tbody>
      {rows.map((row) => (
        <TableBodyRow key={row.id} row={row} />
      ))}
    </Table.Tbody>
  );
};

export default TableBody;
