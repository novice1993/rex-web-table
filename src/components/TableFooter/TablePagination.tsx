import { Dispatch, SetStateAction } from "react";
import { PaginationState } from "@tanstack/react-table";
import { handleChangePageIndex } from "../../util/footer.util";

export interface TablePaginationProps {
  totalPageNum: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export const TablePagination = (props: TablePaginationProps) => {
  const { totalPageNum, pagination, setPagination } = props;

  // 페이지 변경 핸들러
  const handlePageClick = (pageIndex: number) => {
    handleChangePageIndex(pageIndex, setPagination);
  };

  // 페이지 번호 렌더링
  const renderPageNumbers = () => {
    const currentPage = pagination.pageIndex + 1; // 1-based 페이지 인덱스
    const pageNumbers = [];

    // 총 페이지가 7 이하일 경우 전체 표시
    if (totalPageNum <= 7) {
      for (let i = 1; i <= totalPageNum; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            style={{ fontWeight: currentPage === i ? "bold" : "normal" }}
          >
            {i}
          </button>
        );
      }
    } else {
      // 1~4번까지 표시
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              style={{ fontWeight: currentPage === i ? "bold" : "normal" }}
            >
              {i}
            </button>
          );
        }
        pageNumbers.push(<span key="dots1">...</span>);
        pageNumbers.push(
          <button
            key={totalPageNum}
            onClick={() => handlePageClick(totalPageNum)}
          >
            {totalPageNum}
          </button>
        );
      }

      // 중간 구간: 5번~ 마지막 4개 페이지 이전의 페이지
      else if (currentPage > 4 && currentPage < totalPageNum - 3) {
        pageNumbers.push(
          <button key={1} onClick={() => handlePageClick(1)}>
            1
          </button>
        );
        pageNumbers.push(<span key="dots1">...</span>);

        // 현재 페이지와 그 주변 3개 페이지 표시
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              style={{ fontWeight: currentPage === i ? "bold" : "normal" }}
            >
              {i}
            </button>
          );
        }

        pageNumbers.push(<span key="dots2">...</span>);
        pageNumbers.push(
          <button
            key={totalPageNum}
            onClick={() => handlePageClick(totalPageNum)}
          >
            {totalPageNum}
          </button>
        );
      }

      // 마지막 4개의 페이지
      else if (currentPage >= totalPageNum - 3) {
        pageNumbers.push(
          <button key={1} onClick={() => handlePageClick(1)}>
            1
          </button>
        );
        pageNumbers.push(<span key="dots1">...</span>);

        for (let i = totalPageNum - 4; i <= totalPageNum; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              style={{ fontWeight: currentPage === i ? "bold" : "normal" }}
            >
              {i}
            </button>
          );
        }
      }
    }

    return pageNumbers;
  };

  return (
    <div>
      {/* Previous 버튼 */}
      <button
        disabled={pagination.pageIndex === 0}
        onClick={() => handlePageClick(pagination.pageIndex)}
      >
        Previous
      </button>

      {/* 페이지 번호 버튼 */}
      {renderPageNumbers()}

      {/* Next 버튼 */}
      <button
        disabled={pagination.pageIndex === totalPageNum - 1}
        onClick={() => handlePageClick(pagination.pageIndex + 2)}
      >
        Next
      </button>
    </div>
  );
};
