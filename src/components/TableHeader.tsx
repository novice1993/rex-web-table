import { ReactNode } from "react";
import { Table } from "@mantine/core";
import { TableProps } from "../type/type";
import { getHeader, handleClickHeaderForSorting } from "../util/header.util";

const TableHeader = <T,>({ table, headerOptionType }: TableProps<T>) => {
  const headerGroups = getHeader({ table, headerOptionType });

  return (
    <Table.Thead>
      {headerGroups.map((headerGroup) => (
        <Table.Tr key={headerGroup.depth}>
          {headerGroup.headers.map((header) => (
            <Table.Th
              key={header.id}
              colSpan={header.colSpan}
              rowSpan={header.rowSpan}
              style={{
                textAlign: "center",
              }}
              onClick={() => handleClickHeaderForSorting(header)}
            >
              {header.column.columnDef.header as ReactNode}
            </Table.Th>
          ))}
        </Table.Tr>
      ))}
    </Table.Thead>
  );
};

export default TableHeader;
