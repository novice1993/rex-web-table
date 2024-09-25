import { Dispatch, SetStateAction } from "react";
import { PaginationState } from "@tanstack/react-table";
import { TablePageNumbers } from "./TablePageNumbers";
import { handleChangePageIndex } from "../../util/footer.util";

export interface TablePaginationProps {
  totalPageNum: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export const TablePagination = (props: TablePaginationProps) => {
  const { totalPageNum, pagination, setPagination } = props;

  // 페이지 변경 핸들러
  const handleClickPageButton = (pageIndex: number) => {
    handleChangePageIndex(pageIndex, setPagination);
  };

  return (
    <div>
      {/* Previous 버튼 */}
      <button
        disabled={pagination.pageIndex === 0}
        onClick={() => handleClickPageButton(pagination.pageIndex)}
      >
        Previous
      </button>

      {/* 페이지 번호 버튼 */}
      <TablePageNumbers
        pageIndex={pagination.pageIndex}
        totalPageNum={totalPageNum}
        handleClickPageButton={handleClickPageButton}
      />

      {/* Next 버튼 */}
      <button
        disabled={pagination.pageIndex === totalPageNum - 1}
        onClick={() => handleClickPageButton(pagination.pageIndex + 2)}
      >
        Next
      </button>
    </div>
  );
};
