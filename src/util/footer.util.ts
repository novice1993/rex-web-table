import { PaginationState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

type SetPaginationType = Dispatch<SetStateAction<PaginationState>>;

// 1) page size select
export const checkDefaultSizeExist = (
  sizeList: Array<number>,
  defaulSize: number
) => {
  if (!sizeList.includes(defaulSize)) {
    sizeList.push(defaulSize);
    sizeList.sort((a, b) => a - b);
  }
};

export const handleChangePageSize = (
  pageSize: string | null,
  setPagination: SetPaginationType
) => {
  setPagination((prevState: PaginationState) => {
    // page size 변경에 맞춰 page number 조절
    const currentItemIndex = prevState.pageIndex * prevState.pageSize + 1;

    const newPageSize = Number(pageSize);
    const newPageNum = Math.ceil(currentItemIndex / newPageSize);

    // page number에서 -1을 한 값이 data와 연결되는 pageIndex와 일치하므로 -1 처리 (단, 0일 경우 제외)
    const newPageIndex = newPageNum > 0 ? newPageNum - 1 : newPageNum;

    return { pageIndex: newPageIndex, pageSize: newPageSize };
  });
};

// 2) table pagination
export const handleChangePageIndex = (
  pageNum: number,
  setPagination: SetPaginationType
) => {
  // page number에서 -1을 한 값이 data와 연결되는 pageIndex와 일치하므로 -1 처리
  const newPageIndex = pageNum - 1;

  setPagination((prevState: PaginationState) => {
    return { pageIndex: newPageIndex, pageSize: prevState.pageSize };
  });
};

// 페이지 번호를 생성하는 유틸리티 함수
export const generatePageNumbers = (
  currentPage: number,
  totalPageNum: number
): Array<number | "dots"> => {
  // 앞쪽에 있는 (좌측 끝) page nums을 생성하는 함수
  const createStartPages = (length: number) =>
    Array.from({ length }, (_, index) => index + 1);

  // 끝쪽에 있는 (우측 끝) page nums를 생성하는 함수
  const createEndPages = (length: number, totalPageNum: number) =>
    Array.from({ length }, (_, index) => totalPageNum - length + index + 1);

  /* 전체 페이지 수가 7 이하일 때*/
  if (totalPageNum <= 7) {
    return Array.from(createStartPages(5));
  }

  /*전체 페이지 수가 8 이상일 때*/

  // 1) 현재 선택된 페이지가 1~4일 때
  // -> (1,2,3,4 ... lastPage) 형태로 표시
  if (currentPage <= 4) {
    return [...createStartPages(5), "dots", totalPageNum];
  }

  // 2) 현재 선택된 페이지가 (마지막 페이지-3 ~ 마지막 페이지) 일 때
  // -> (1 ... lastPage-3, lastPage-2, lastPage-1, lastPage) 형태로 표시
  if (currentPage >= totalPageNum - 3) {
    return [1, "dots", ...createEndPages(5, totalPageNum)];
  }

  // 3) 현재 선택된 페이지가 위에 해당하지 않는 중간 값 일때
  // 1 ... (current-1, current, current+1) ... lastPage
  return [
    1,
    "dots",
    ...Array.from({ length: 3 }, (_, i) => currentPage - 1 + i),
    "dots",
    totalPageNum,
  ];
};
