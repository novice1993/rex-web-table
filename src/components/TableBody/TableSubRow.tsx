import { useAtomValue } from "jotai";
import { useTableContext } from "../../provider/TableProvider";

import DefaultSubRow from "./DefaultSubRow";
import { Row } from "@tanstack/react-table";
import { Table } from "@mantine/core";

import { subRowContentsAtom } from "../../atom/subRowContentsAtom";

const TableSubRow = <T,>({ row }: { row: Row<T> }) => {
  const { SubRowComponent, useParentRowUi } = useTableContext();

  const subRowContents = useAtomValue(subRowContentsAtom);
  const contents = subRowContents[row.index];

  if (!contents) return;

  if (useParentRowUi) {
    return <DefaultSubRow contents={contents} />;
  }

  if (SubRowComponent) {
    return (
      <Table.Tr>
        <Table.Td colSpan={row.getVisibleCells().length}>
          <SubRowComponent contents={contents} />
        </Table.Td>
      </Table.Tr>
    );
  }
};

export default TableSubRow;
