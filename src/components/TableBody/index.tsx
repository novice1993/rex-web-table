import TableBodyRow from "./TableBodyRow";
import { TableProps } from "../../type/type";

const TableBody = <T,>({ table }: TableProps<T>) => {
  const rows = table.getRowModel().rows;

  return (
    <tbody>
      {rows.map((row) => (
        <TableBodyRow key={row.id} row={row} />
      ))}
    </tbody>
  );
};

export default TableBody;
