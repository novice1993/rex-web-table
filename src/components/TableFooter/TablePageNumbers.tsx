interface TablePageNumberProps {
  pageIndex: number;
  totalPageNum: number;
  handleClickPageButton: (pageIndex: number) => void;
}

export const TablePageNumbers = (props: TablePageNumberProps) => {
  const { pageIndex, totalPageNum, handleClickPageButton } = props;

  const currentPage = pageIndex + 1; // 1-based 페이지 인덱스
  const pageNumbers = [];

  // 총 페이지가 7 이하일 경우 전체 표시
  if (totalPageNum <= 7) {
    for (let i = 1; i <= totalPageNum; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handleClickPageButton(i)}>
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
            onClick={() => handleClickPageButton(i)}
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
          onClick={() => handleClickPageButton(totalPageNum)}
        >
          {totalPageNum}
        </button>
      );
    }

    // 중간 구간: 5번~ 마지막 4개 페이지 이전의 페이지
    else if (currentPage > 4 && currentPage < totalPageNum - 3) {
      pageNumbers.push(
        <button key={1} onClick={() => handleClickPageButton(1)}>
          1
        </button>
      );
      pageNumbers.push(<span key="dots1">...</span>);

      // 현재 페이지와 그 주변 3개 페이지 표시
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handleClickPageButton(i)}
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
          onClick={() => handleClickPageButton(totalPageNum)}
        >
          {totalPageNum}
        </button>
      );
    }

    // 마지막 4개의 페이지
    else if (currentPage >= totalPageNum - 3) {
      pageNumbers.push(
        <button key={1} onClick={() => handleClickPageButton(1)}>
          1
        </button>
      );
      pageNumbers.push(<span key="dots1">...</span>);

      for (let i = totalPageNum - 4; i <= totalPageNum; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handleClickPageButton(i)}
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
