import { useTableContext } from "../../provider/TableProvider";
import { Row } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import DefaultSubRow from "./DefaultSubRow";

/**
 * 1. 여기서 subRowContent를 subRow에게 전달하는 방식으로 구현?
 *  -> subRowContent는 여러 row의 subRow 데이터를 가진 배열임
 *  -> 따라서 row의 index로 전달할 데이터를 판별한 후, 필요한 데이터만 SubRow 컴포넌트에게 전달
 * 2. SubRow 컴포넌트는 전달받은 데이터를 활용해서 단순 렌더링 하는 방식으로 구현
 *
 */

// test data
const testData = [
  [
    {
      no: "1",
      name: "kim",
      add: "-",
    },
  ],
  [
    {
      no: "1",
      name: "kim",
      add: "-",
    },
    {
      no: "1",
      name: "kim",
      add: "-",
    },
  ],
];

const TableSubRow = <T,>({ row }: { row: Row<T> }) => {
  const { SubRowComponent, useParentRowUi } = useTableContext();

  const rowIndex = row.index;
  const subRowData = testData[rowIndex];

  if (!subRowData) return;

  if (useParentRowUi) {
    return <DefaultSubRow contents={subRowData} />;
  }

  if (SubRowComponent) {
    return (
      <Table.Tr>
        <Table.Td colSpan={row.getVisibleCells().length}>
          <SubRowComponent contents={subRowData} />
        </Table.Td>
      </Table.Tr>
    );
  }
};

export default TableSubRow;
