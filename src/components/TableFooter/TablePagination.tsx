import { Pagination } from "@mantine/core";
import { PaginationState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

export interface TablePaginationProps {
  totalPageNum: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export const TablePagination = (props: TablePaginationProps) => {
  const { totalPageNum, pagination, setPagination } = props;

  const handleChangePageIndex = (pageNum: number) => {
    // page number에서 -1을 한 값이 data와 연결되는 pageIndex와 일치하므로 -1 처리
    const newPageIndex = pageNum - 1;

    setPagination((prevState: PaginationState) => {
      return { pageIndex: newPageIndex, pageSize: prevState.pageSize };
    });
  };

  return (
    <Pagination
      total={totalPageNum}
      value={pagination.pageIndex + 1}
      onChange={handleChangePageIndex}
    />
  );
};
