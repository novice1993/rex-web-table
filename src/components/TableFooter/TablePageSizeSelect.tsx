import { Select } from "@mantine/core";
import { PaginationState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import {
  checkDefaultSizeExist,
  convertNumToString,
  handleChangePageSize,
} from "../../util/footer.util";

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

  // useTablePagination hook에서 설정한 기본 pageSize가 pageSizeList에 없을 경우 추가
  checkDefaultSizeExist(sizeList, pagination.pageSize);

  return (
    <Select
      data={convertNumToString(sizeList)}
      value={String(pagination.pageSize)}
      onChange={(pageSize) => handleChangePageSize(pageSize, setPagination)}
    />
  );
};
