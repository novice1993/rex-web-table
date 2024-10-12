import { CSSProperties, Dispatch, SetStateAction } from "react";
import { PaginationState } from "@tanstack/react-table";
import { TablePageNumbers } from "./TablePageNumbers";
import { handleChangePageIndex } from "../../util/footer.util";

export interface TablePaginationProps {
  totalPageNum: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

const arrowButtonStyle: CSSProperties = {
  boxSizing: "border-box",
  width: "30px",
  height: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

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
        style={{ ...arrowButtonStyle }}
        disabled={pagination.pageIndex === 0}
        onClick={() => handleClickPageButton(pagination.pageIndex)}
      >
        <svg viewBox="0 0 16 16">
          <path d="M7.219 8l3.3 3.3-.943.943L5.333 8l4.243-4.243.943.943-3.3 3.3z"></path>
        </svg>
      </button>

      {/* Page Num Button */}
      <TablePageNumbers
        pageIndex={pagination.pageIndex}
        totalPageNum={totalPageNum}
        handleClickPageButton={handleClickPageButton}
      />

      {/* Next Button */}
      <button
        style={{ ...arrowButtonStyle }}
        disabled={pagination.pageIndex === totalPageNum - 1}
        onClick={() => handleClickPageButton(pagination.pageIndex + 2)}
      >
        <svg viewBox="0 0 16 16">
          <path d="M8.781 8l-3.3-3.3.943-.943L10.667 8l-4.243 4.243-.943-.943 3.3-3.3z" />
        </svg>
      </button>
    </div>
  );
};
