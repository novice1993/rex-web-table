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

import useTablePagination from "./hook/useTablePagination";
import { useEffect } from "react";

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

  useEffect(() => console.log("%c page 관련 info", "color: red", pagination));

  // page index event handler
  const handleChangePageIndex = (pageNum: number) => {
    // page number에서 -1을 한 값이 data와 연결되는 pageIndex와 일치하므로 -1 처리
    const newPageIndex = pageNum - 1;

    setPagination((prevState: PaginationState) => {
      return { pageSize: prevState.pageSize, pageIndex: newPageIndex };
    });
  };

  // page size event handler
  const handleChangePageSize = (pageSize: string | null) => {
    setPagination((prevState: PaginationState) => {
      // page size 변경에 맞춰 page number 조절
      const currentItemIndex = prevState.pageIndex * prevState.pageSize;
      console.log("%c 현재 아이템 index", "color: yellow", currentItemIndex);

      const newPageSize = Number(pageSize);
      console.log("%c 현재 페이지 size", "color: yellow", newPageSize);

      const newPageNum = Math.ceil(currentItemIndex / newPageSize);
      console.log("%c 현재 페이지 number", "color: yellow", newPageNum);

      // page number에서 -1을 한 값이 data와 연결되는 pageIndex와 일치하므로 -1 처리 (단, 0일 경우 제외)
      const newPageIndex = newPageNum > 0 ? newPageNum - 1 : newPageNum;

      return { pageIndex: newPageIndex, pageSize: newPageSize };
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
