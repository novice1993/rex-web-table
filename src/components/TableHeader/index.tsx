import { useTableContext } from "../../provider/TableProvider";
import { getHeader } from "../../util/header.util";
import TableHeaderRow from "./TableHeaderRow";
import { TableProps } from "../../type/type";

const TableHeader = <T,>(props: TableProps<T>) => {
  const { table, headerOption, style } = props;
  const { borderLeftNone, borderTopNone } = useTableContext();
  const headerGroups = getHeader({ table, headerOption });

  return (
    <thead
      style={{
        ...style,
        borderLeft: borderLeftNone ? "none" : style?.border,
        borderTop: borderTopNone ? "none" : style?.border,
      }}
    >
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
