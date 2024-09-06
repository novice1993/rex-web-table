import {
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@mantine/core";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import { Pagination } from "@mantine/core";
import { Select } from "@mantine/core";

import { data, columns, headerOptionType } from "./dummyData";
import { useMemo, useState } from "react";

export interface Example {
  No: number;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  "10kg": "yes";
  "20kg": "no";
}

const pageSizeList = ["10", "15", "20", "25", "30"];

function App() {
  // pagination 관련 상태
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // 전체 page 수
  const totalPageNum = Math.ceil(data.length / pagination.pageSize);

  // table body에 전달할 content 데이터 (pagination)
  const paginationData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return data.slice(start, end);
  }, [pagination.pageIndex, pagination.pageSize]);

  // hook
  const table = useReactTable<Example>({
    data: paginationData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: totalPageNum,
    state: { pagination },
  });

  // page index event handler
  const handleChangePageIndex = (page: number) => {
    setPagination((prevState: PaginationState) => {
      // page number에서 -1을 한 값이 data와 연결되는 pageIndex와 일치하므로 -1 처리
      return { pageSize: prevState.pageSize, pageIndex: page - 1 };
    });
  };

  // page size event handler
  const handleChangePageSize = (pageSize: string | null) => {
    setPagination((prevState: PaginationState) => {
      return { pageIndex: prevState.pageIndex, pageSize: Number(pageSize) };
    });
  };

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
        <Select
          data={pageSizeList}
          value={String(pagination.pageSize)}
          onChange={handleChangePageSize}
        />
        <Pagination
          total={totalPageNum}
          value={pagination.pageIndex + 1}
          onChange={handleChangePageIndex}
        />
      </div>
    </>
  );
}

export default App;
