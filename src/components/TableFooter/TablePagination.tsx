import { Dispatch, SetStateAction } from "react";
import { PaginationState } from "@tanstack/react-table";
import { TablePageNumbers } from "./TablePageNumbers";
import { handleChangePageIndex } from "../../util/footer.util";

export interface TablePaginationProps {
  totalPageNum: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

const prevButtonIcon = "<";
const nextButtonIcon = ">";

export const TablePagination = (props: TablePaginationProps) => {
  const { totalPageNum, pagination, setPagination } = props;

  const handleClickPageButton = (pageIndex: number) => {
    handleChangePageIndex(pageIndex, setPagination);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        gap: "6px",
      }}
    >
      {/* Previous Button */}
      <button
        disabled={pagination.pageIndex === 0}
        onClick={() => handleClickPageButton(pagination.pageIndex)}
      >
        {prevButtonIcon}
      </button>

      {/* Page Num Button */}
      <TablePageNumbers
        pageIndex={pagination.pageIndex}
        totalPageNum={totalPageNum}
        handleClickPageButton={handleClickPageButton}
      />

      {/* Next Button */}
      <button
        disabled={pagination.pageIndex === totalPageNum - 1}
        onClick={() => handleClickPageButton(pagination.pageIndex + 2)}
      >
        {nextButtonIcon}
      </button>
    </div>
  );
};
