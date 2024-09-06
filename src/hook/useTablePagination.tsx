import { useState, useMemo } from "react";
import { PaginationState } from "@tanstack/react-table";

const useTablePagination = <T,>(
  tableData: Array<T>,
  initPageSize: number = 10 // default value 설정
) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initPageSize,
  });

  const totalPageNum = Math.ceil(tableData.length / pagination.pageSize);

  const paginationData = useMemo(() => {
    const startItemIndex = pagination.pageIndex * pagination.pageSize;
    const endItemIndex = startItemIndex + pagination.pageSize;
    return tableData.slice(startItemIndex, endItemIndex);
  }, [pagination.pageIndex, pagination.pageSize, tableData]);

  return { pagination, setPagination, totalPageNum, paginationData };
};

export default useTablePagination;
