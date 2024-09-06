import { Dispatch, SetStateAction } from "react";
import { Pagination } from "@mantine/core";
import { PaginationState } from "@tanstack/react-table";
import { handleChangePageIndex } from "../../util/footer.util";

export interface TablePaginationProps {
  totalPageNum: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export const TablePagination = (props: TablePaginationProps) => {
  const { totalPageNum, pagination, setPagination } = props;

  return (
    <Pagination
      total={totalPageNum}
      value={pagination.pageIndex + 1}
      onChange={(pageIndex) => handleChangePageIndex(pageIndex, setPagination)}
    />
  );
};
