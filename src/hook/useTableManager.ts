import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import useTablePagination from "./useTablePagination";
import useTableSorting from "./useTableSorting";
import { useState } from "react";

interface TableManagerProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isPagination: boolean;
  isSorting: boolean;
}

const useTableManager = <T>(props: TableManagerProps<T>) => {
  const { data, columns, isPagination, isSorting } = props;

  const { pagination, setPagination } = useTablePagination();
  const { sorting, setSorting } = useTableSorting();

  // subRowContent
  const [subRowContent, setSubRowContent] = useState<Array<unknown>>([]);

  const table = useReactTable<T>({
    // 1) default table setting
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // 2) about pagination
    getPaginationRowModel: isPagination ? getPaginationRowModel() : undefined,
    onPaginationChange: setPagination,

    // 3) about sorting
    getSortedRowModel: isSorting ? getSortedRowModel() : undefined,
    onSortingChange: setSorting,

    // 해당 hook에서 관리 중인 state
    state: { pagination, sorting },
  });

  return {
    table,
    pagination,
    setPagination,
    totalPageNum: table.getPageCount(),
    subRowContent,
    setSubRowContent,
  };
};

export default useTableManager;
