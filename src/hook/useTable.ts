import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
  SortingState,
  ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table";

import { useState } from "react";

interface TableManagerProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isPagination?: boolean;
}

const useTable = <T>(props: TableManagerProps<T>) => {
  const { data, columns, isPagination = false } = props;

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([{ id: "No", desc: false }]);

  // about sub row expand
  const [expanded, setExpanded] = useState<ExpandedState>({});

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

    // 3) about sub row expand
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,

    state: { pagination, sorting, expanded },
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

export default useTable;