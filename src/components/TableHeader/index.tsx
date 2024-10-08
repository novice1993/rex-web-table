import { TableProps } from "../../type/type";
import { getHeader } from "../../util/header.util";

import TableHeaderRow from "./TableHeaderRow";

const TableHeader = <T,>(props: TableProps<T>) => {
  const { table, headerOption, style } = props;
  const headerGroups = getHeader({ table, headerOption });

  return (
    <thead style={style}>
      {headerGroups.map((headerGroup) => (
        <TableHeaderRow
          key={headerGroup.depth}
          style={style}
          headerGroup={headerGroup}
        />
      ))}
    </thead>
  );
};

export default TableHeader;
