import { useTableContext } from "../../provider/TableProvider";
import { Row } from "@tanstack/react-table";
import { Table } from "@mantine/core";

const TableSubRow = <T,>({ row }: { row: Row<T> }) => {
  const { SubRowComponent } = useTableContext();

  if (SubRowComponent) {
    const SubRow = () => {
      return <SubRowComponent />;
    };

    return (
      <Table.Tr>
        <Table.Td style={{ padding: 0 }} colSpan={row.getVisibleCells().length}>
          <SubRow />
        </Table.Td>
      </Table.Tr>
    );
  }
};

export default TableSubRow;
