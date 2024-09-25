import { TableProps } from "../../type/type";
import { getHeader } from "../../util/header.util";

import TableHeaderRow from "./TableHeaderRow";

const TableHeader = <T,>({ table, headerOptionType }: TableProps<T>) => {
  const headerGroups = getHeader({ table, headerOptionType });

  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <TableHeaderRow key={headerGroup.depth} headerGroup={headerGroup} />
      ))}
    </thead>
  );
};

export default TableHeader;
