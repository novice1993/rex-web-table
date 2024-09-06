import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table } from "@mantine/core";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import TableFooter from "./components/TableFooter";

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

      <TableFooter
        totalPageNum={totalPageNum}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

export default App;
