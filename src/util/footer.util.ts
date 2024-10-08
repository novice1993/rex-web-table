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
    // Adjust the page number based on the changed page size
    const currentItemIndex = prevState.pageIndex * prevState.pageSize + 1;

    const newPageSize = Number(pageSize);
    const newPageNum = Math.ceil(currentItemIndex / newPageSize);

    // The page number minus 1 matches the pageIndex connected to the data, so subtract 1 (except when the result is 0)
    const newPageIndex = newPageNum > 0 ? newPageNum - 1 : newPageNum;

    return { pageIndex: newPageIndex, pageSize: newPageSize };
  });
};

// 2) table pagination
export const handleChangePageIndex = (
  pageNum: number,
  setPagination: SetPaginationType
) => {
  // Subtract 1 from the page number to match the pageIndex connected to the data
  const newPageIndex = pageNum - 1;

  setPagination((prevState: PaginationState) => {
    return { pageIndex: newPageIndex, pageSize: prevState.pageSize };
  });
};

// Utility function to generate page numbers
export const generatePageNumbers = (
  currentPage: number,
  totalPageNum: number
): Array<number | "dots"> => {
  // Function to generate the page numbers at the start (left end)
  const createStartPages = (length: number) =>
    Array.from({ length }, (_, index) => index + 1);

  // Function to generate the page numbers at the end (right end)
  const createEndPages = (length: number, totalPageNum: number) =>
    Array.from({ length }, (_, index) => totalPageNum - length + index + 1);

  /* When the total number of pages is 7 or less */
  if (totalPageNum <= 7) {
    return Array.from(createStartPages(5));
  }

  /* When the total number of pages is 8 or more */

  // 1) When the currently selected page is between 1 and 4
  // -> Displayed as (1, 2, 3, 4 ... lastPage)
  if (currentPage <= 4) {
    return [...createStartPages(5), "dots", totalPageNum];
  }

  // 2) When the currently selected page is between (lastPage - 3 ~ lastPage)
  // -> Displayed as (1 ... lastPage - 3, lastPage - 2, lastPage - 1, lastPage)
  if (currentPage >= totalPageNum - 3) {
    return [1, "dots", ...createEndPages(5, totalPageNum)];
  }

  // 3) When the currently selected page is in the middle (not covered by the previous cases)
  // 1 ... (current - 1, current, current + 1) ... lastPage
  return [
    1,
    "dots",
    ...Array.from({ length: 3 }, (_, i) => currentPage - 1 + i),
    "dots",
    totalPageNum,
  ];
};
