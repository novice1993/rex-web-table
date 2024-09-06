import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@mantine/core";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import TableFooter from "./components/TableFooter";

import { data, columns, headerOptionType } from "./dummyData";

import useTablePagination from "./hook/useTablePagination";
import useTableSorting from "./hook/useTableSorting";

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
  const { pagination, setPagination } = useTablePagination(10);
  const { sorting, setSorting } = useTableSorting();

  const table = useReactTable<Example>({
    // 1) default table setting
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // 2) about pagination
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    // 3) about sorting
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

    // 해당 hook에서 관리 중인 state
    state: { pagination, sorting },
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
        totalPageNum={table.getPageCount()}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

export default App;
