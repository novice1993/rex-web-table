import { Button, Table } from "@mantine/core";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import TableFooter from "./components/TableFooter";

import { data, columns, headerOptionType } from "./dummyData";

import Test from "./test/Test";

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

// test
import { TableProvider } from "./provider/TableProvider";
import AddSubRow from "./components/SubRowComponents/AddSubRow";
import useTableManager from "./hook/useTableManager";
import { useState } from "react";

function App() {
  const [isTestRender, setTestRender] = useState(false);

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

      <div style={{ marginTop: "100px" }}>
        <Button
          onClick={() => {
            setTestRender(!isTestRender);
          }}
        >
          Render Test Table
        </Button>

        <div style={{ marginTop: "30px" }}>{isTestRender && <Test />}</div>
      </div>
    </>
  );
}

export default App;
