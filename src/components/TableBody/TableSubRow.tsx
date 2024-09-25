import { useAtomValue } from "jotai";
import { useTableContext } from "../../provider/TableProvider";

import DefaultSubRow from "./DefaultSubRow";
import { Row } from "@tanstack/react-table";

import { subRowContentsAtom } from "../../atom/subRowContentsAtom";

const TableSubRow = <T,>({ row }: { row: Row<T> }) => {
  const { SubRowComponent, useParentRowUi } = useTableContext();

  const subRowContents = useAtomValue(subRowContentsAtom);
  const contents = subRowContents[row.index];

  if (!contents) return;

  if (useParentRowUi) {
    return <DefaultSubRow rowIndex={row.index} contents={contents} />;
  }

  if (SubRowComponent) {
    return (
      <tr>
        <td
          colSpan={row.getVisibleCells().length}
          style={{ padding: "8px", border: "1px solid #ddd" }}
        >
          <SubRowComponent contents={contents} />
        </td>
      </tr>
    );
  }
};

export default TableSubRow;
