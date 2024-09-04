import { TableProps } from "../type/type";
import { ReactNode } from "react";

const TableBody = <T,>({ table }: TableProps<T>) => {
  const rows = table.getRowModel().rows;

  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {cell.getContext().renderValue() as ReactNode}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
