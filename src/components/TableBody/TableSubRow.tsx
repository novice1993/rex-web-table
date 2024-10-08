import { CSSProperties } from "react";
import { useAtomValue } from "jotai";
import { useTableContext } from "../../provider/TableProvider";

import DefaultSubRow from "./DefaultSubRow";
import { Row } from "@tanstack/react-table";

import { subRowContentsAtom } from "../../atom/subRowContentsAtom";

interface TableSubRowProps<T> {
  row: Row<T>;
  style?: CSSProperties;

  subRowStyles?: {
    style?: CSSProperties;
    hoverColor?: string;
  };
}

const TableSubRow = <T,>(props: TableSubRowProps<T>) => {
  const { row, style, subRowStyles } = props;
  const { SubRowComponent, useParentRowUi } = useTableContext();

  const subRowContents = useAtomValue(subRowContentsAtom);
  const contents = subRowContents[row.index];

  if (!contents) return;

  if (useParentRowUi) {
    return (
      <DefaultSubRow
        contents={contents}
        style={style}
        subRowStyles={subRowStyles}
      />
    );
  }

  if (SubRowComponent) {
    return (
      <tr>
        <td
          colSpan={row.getVisibleCells().length}
          style={{ ...style, backgroundColor: undefined, padding: 0 }}
        >
          <SubRowComponent contents={contents} />
        </td>
      </tr>
    );
  }
};

export default TableSubRow;
