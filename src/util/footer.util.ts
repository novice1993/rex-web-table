import { PaginationState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

type SetPaginationType = Dispatch<SetStateAction<PaginationState>>;

// 1) page size select
export const checkDefaultSizeExist = (sizeList: Array<number>, defaulSize: number) => {
  if (!sizeList.includes(defaulSize)) {
    sizeList.push(defaulSize);
    sizeList.sort((a, b) => a - b);
  }
};

export const convertNumToString = (originData: Array<number>) => {
  const result = originData.map((data) => {
    return String(data);
  });

  return result;
};

export const handleChangePageSize = (pageSize: string | null, setPagination: SetPaginationType) => {
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
export const handleChangePageIndex = (pageNum: number, setPagination: SetPaginationType) => {
  // page number에서 -1을 한 값이 data와 연결되는 pageIndex와 일치하므로 -1 처리
  const newPageIndex = pageNum - 1;

  setPagination((prevState: PaginationState) => {
    return { pageIndex: newPageIndex, pageSize: prevState.pageSize };
  });
};
