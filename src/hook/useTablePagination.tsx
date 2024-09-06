import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

const useTablePagination = (
  initPageSize: number = 10 // default value 설정
) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initPageSize,
  });

  return { pagination, setPagination };
};

export default useTablePagination;
