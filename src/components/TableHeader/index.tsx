// import { Table } from "@mantine/core";
import { TableProps } from "../../type/type";
import { getHeader } from "../../util/header.util";

import TableHeaderRow from "./TableHeaderRow";

const TableHeader = <T,>({ table, headerOptionType }: TableProps<T>) => {
  const headerGroups = getHeader({ table, headerOptionType });

  // return (
  //   <Table.Thead>
  //     {headerGroups.map((headerGroup) => (
  //       <TableHeaderRow key={headerGroup.depth} headerGroup={headerGroup} />
  //     ))}
  //   </Table.Thead>
  // );

  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <TableHeaderRow key={headerGroup.depth} headerGroup={headerGroup} />
      ))}
    </thead>
  );
};

export default TableHeader;
