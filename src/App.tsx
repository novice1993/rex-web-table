import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@mantine/core";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import { Pagination } from "@mantine/core";

import { HeaderOptionType } from "./type/type";
import { data } from "./dummyData";
import { useMemo, useState } from "react";

export interface Example {
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  "10kg": "yes";
  "20kg": "no";
}

const columns: ColumnDef<Example>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    header: "information", // 큰 헤더
    columns: [
      {
        accessorKey: "height",
        header: "height", // 서브 헤더
      },

      {
        header: "weight", // 서브 헤더
        columns: [
          { accessorKey: "10kg", header: "10kg" },
          { accessorKey: "20kg", header: "20kg" },
        ],
      },
    ],
  },
];

const headerOptionType: HeaderOptionType[] = [
  {
    accessorKey: "firstName",
    layer: 1,
    rowSpan: 3,
    colSpan: 1,
  },
  {
    accessorKey: "lastName",
    layer: 1,
    rowSpan: 3,
    colSpan: 1,
  },
  {
    accessorKey: "information",
    layer: 1,
    rowSpan: 1,
    colSpan: 3,
  },
  {
    accessorKey: "weight",
    layer: 2,
    rowSpan: 1,
    colSpan: 2,
  },
  {
    accessorKey: "height",
    layer: 2,
    rowSpan: 2,
    colSpan: 1,
  },
];

function App() {
  // pagination 관련 상태
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // 전체 page 수
  const totalPageNum = Math.ceil(data.length / pagination.pageSize);

  // table body에 전달할 content 데이터
  const paginationData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return data.slice(start, end);
  }, [pagination.pageIndex, pagination.pageSize]);

  const table = useReactTable<Example>({
    data: paginationData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: totalPageNum,
    state: { pagination },
  });

  return (
    <Table
      withTableBorder
      withColumnBorders
      withRowBorders
      stickyHeader
      highlightOnHover
    >
      <TableHeader table={table} headerOptionType={headerOptionType} />
      <TableBody table={table} />
      <Pagination
        total={totalPageNum}
        value={pagination.pageIndex + 1}
        onChange={(page) =>
          setPagination({ ...pagination, pageIndex: page - 1 })
        }
      />
    </Table>
  );
}

export default App;
