import { ReactNode } from "react";
import { TableProps } from "../type/type";
import { Table } from "@mantine/core";

const TableBody = <T,>({ table }: TableProps<T>) => {
  const rows = table.getRowModel().rows;

  return (
    <Table.Tbody>
      {rows.map((row) => (
        <Table.Tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <Table.Td key={cell.id}>
              {cell.getContext().renderValue() as ReactNode}
            </Table.Td>
          ))}
        </Table.Tr>
      ))}
    </Table.Tbody>
  );
};

export default TableBody;
