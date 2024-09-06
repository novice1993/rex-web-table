import { useState, useMemo } from "react";
import { PaginationState } from "@tanstack/react-table";

const useTablePagination = <T,>(tableData: Array<T>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const totalPageNum = Math.ceil(tableData.length / pagination.pageSize);

  const paginationData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return tableData.slice(start, end);
  }, [pagination.pageIndex, pagination.pageSize, tableData]);

  return { pagination, setPagination, totalPageNum, paginationData };
};

export default useTablePagination;
