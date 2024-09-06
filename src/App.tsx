import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table } from "@mantine/core";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import TablePagination from "./components/TableFooter/TablePagination";
import TablePageSizeSelect from "./components/TableFooter/TablePageSizeSelect";

import { data, columns, headerOptionType } from "./dummyData";

import useTablePagination from "./hook/useTablePagination";

export interface Example {
  No: number;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  "10kg": "yes";
  "20kg": "no";
}

const pageSizeList = [10, 15, 20, 25, 30];

function App() {
  const { pagination, setPagination, totalPageNum, paginationData } =
    useTablePagination<Example>(data);

  // hook
  const table = useReactTable<Example>({
    data: paginationData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: totalPageNum,
    state: { pagination },
  });

  return (
    <>
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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TablePageSizeSelect
          pageSizeList={pageSizeList}
          pagination={pagination}
          setPagination={setPagination}
        />
        <TablePagination
          totalPageNum={totalPageNum}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </>
  );
}

export default App;
