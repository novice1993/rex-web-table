import { CSSProperties } from "react";
import { useAtomValue } from "jotai";
import { useTableContext } from "../../provider/TableProvider";

import DefaultSubRow from "./DefaultSubRow";
import { Row } from "@tanstack/react-table";

import { subRowContentsAtom } from "../../atom/subRowContentsAtom";

interface TableSubRowProps<T> {
  row: Row<T>;
  style?: CSSProperties;
  className?: string;
  subRowStyle?: CSSProperties;
  subRowClassName?: string;
  subRowHoverColor?: string;
}

const TableSubRow = <T,>(props: TableSubRowProps<T>) => {
  const {
    row,
    style,
    className,
    subRowStyle,
    subRowClassName,
    subRowHoverColor,
  } = props;
  const { SubRowComponent, useParentRowUi } = useTableContext();

  const subRowContents = useAtomValue(subRowContentsAtom);
  const contents = subRowContents[row.index];

  if (!contents) return;

  if (useParentRowUi) {
    return (
      <DefaultSubRow
        rowIndex={row.index}
        contents={contents}
        style={style}
        className={className}
        subRowStyle={subRowStyle}
        subRowClassName={subRowClassName}
        subRowHoverColor={subRowHoverColor}
      />
    );
  }

  if (SubRowComponent) {
    return (
      <tr>
        <td
          colSpan={row.getVisibleCells().length}
          style={{
            ...style,
            padding: 0,
          }}
          className={className}
        >
          <SubRowComponent contents={contents} />
        </td>
      </tr>
    );
  }
};

export default TableSubRow;
