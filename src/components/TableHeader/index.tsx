import { TableProps } from "../../type/type";
import { getHeader } from "../../util/header.util";

import TableHeaderRow from "./TableHeaderRow";

const TableHeader = <T,>(props: TableProps<T>) => {
  const { table, headerOptionType, style, className } = props;
  const headerGroups = getHeader({ table, headerOptionType });

  return (
    <thead style={style}>
      {headerGroups.map((headerGroup) => (
        <TableHeaderRow
          key={headerGroup.depth}
          className={className}
          style={style}
          headerGroup={headerGroup}
        />
      ))}
    </thead>
  );
};

export default TableHeader;
