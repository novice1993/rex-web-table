import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

import { useState } from "react";

interface TableManagerProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isPagination?: boolean;
}

const useTableManager = <T>(props: TableManagerProps<T>) => {
  const { data, columns, isPagination = false } = props;

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([{ id: "No", desc: false }]);

  // subRowContent
  const [subRowContent, setSubRowContent] = useState<Array<unknown>>([]);

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // 1) about pagination
    getPaginationRowModel: isPagination ? getPaginationRowModel() : undefined,
    onPaginationChange: setPagination,

    // 2) about sorting
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,

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
