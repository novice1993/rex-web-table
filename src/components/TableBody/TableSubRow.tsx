import { CSSProperties } from "react";
import { Row } from "@tanstack/react-table";
import { useTableContext } from "../../provider/TableProvider";

import DefaultSubRow from "./DefaultSubRow";

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
  const { SubRowComponent, subRowContents, useParentRowUi } = useTableContext();

  let contents;
  if (subRowContents) contents = subRowContents[row.index];
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
