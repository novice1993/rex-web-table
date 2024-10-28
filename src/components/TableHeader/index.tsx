import { useTableContext } from "../../provider/TableProvider";
import { getHeader } from "../../util/header.util";
import TableHeaderRow from "./TableHeaderRow";
import { TableProps, HeaderOptionType } from "../../type/type";

export interface TableHeaderProps<T> extends TableProps<T> {
  headerOption?: HeaderOptionType[];
}

const TableHeader = <T,>(props: TableHeaderProps<T>) => {
  const { table, headerOption, style } = props;
  const { borderLeftNone, borderTopNone } = useTableContext();
  const headerGroups = getHeader({ table, headerOption });

  // border가 있으면 제거한 새로운 스타일 객체 생성
  const { border, ...restStyle } = style || {};

  // border 속성을 개별적으로 나눔 (오버라이딩 방지)
  const borderTop = borderTopNone ? "none" : style?.borderTop || border;
  const borderRight = style?.borderRight || border;
  const borderBottom = style?.borderBottom || border;
  const borderLeft = borderLeftNone ? "none" : style?.borderLeft || border;

  return (
    <thead
      style={{
        ...restStyle,
        borderTop, // borderTop 설정
        borderRight, // borderRight 설정
        borderBottom, // borderBottom 설정
        borderLeft, // borderLeft는 조건에 따라 설정
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
