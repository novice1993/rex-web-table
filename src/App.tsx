import useTableManager from "./hook/useTableManager";
import { Table } from "@mantine/core";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import TableFooter from "./components/TableFooter";
import AddSubRow from "./components/SubRowComponents/AddSubRow";

import { data, columns, headerOptionType } from "./dummyData";

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

function App() {
  const { table, pagination, setPagination, totalPageNum } = useTableManager({
    data,
    columns,
    isPagination: true,
    isSorting: true,
  });

  return (
    <>
      <TableProvider table={table} SubRowComponent={AddSubRow}>
        <Table
          withTableBorder
          withColumnBorders
          withRowBorders
          stickyHeader
          highlightOnHover
        >
          <TableHeader table={table} headerOptionType={headerOptionType} />
          <TableBody table={table} />
        </Table>
      </TableProvider>
      <TableFooter
        totalPageNum={totalPageNum}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

export default App;
