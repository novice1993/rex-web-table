import { Select } from "@mantine/core";
import { PaginationState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

export interface TablePageSizeSelectProps {
  pageSizeList?: Array<number>;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export const TablePageSizeSelect = (props: TablePageSizeSelectProps) => {
  const {
    pageSizeList = [10, 15, 20, 25, 30], // default value 설정
    pagination,
    setPagination,
  } = props;

  const sizeList: Array<number> = pageSizeList;

  // useTablePagination hook에서 설정한 기본 값이 pageSizeList에 없을 경우 추가
  if (!sizeList.includes(pagination.pageSize)) {
    sizeList.push(pagination.pageSize);
    sizeList.sort((a, b) => a - b);
  }

  const converNumToString = (originData: Array<number>) => {
    const result = originData.map((data) => {
      return String(data);
    });

    return result;
  };

  const handleChangePageSize = (pageSize: string | null) => {
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

  return (
    <Select
      data={converNumToString(sizeList)}
      value={String(pagination.pageSize)}
      onChange={handleChangePageSize}
    />
  );
};
