import { PaginationState } from "@tanstack/react-table";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import {
  checkDefaultSizeExist,
  handleChangePageSize,
} from "../../util/footer.util";

export interface TablePageSizeSelectProps {
  pageSizeList?: Array<number>;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export const TablePageSizeSelect = (props: TablePageSizeSelectProps) => {
  const {
    pageSizeList = [10, 15, 20, 25, 30], // 기본값 설정
    pagination,
    setPagination,
  } = props;

  const sizeList: Array<number> = pageSizeList;

  // 기본 페이지 크기 추가 확인
  checkDefaultSizeExist(sizeList, pagination.pageSize);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleChangePageSize(event.target.value, setPagination);
  };

  return (
    <select
      id="pageSizeSelect"
      value={String(pagination.pageSize)}
      onChange={handleSelectChange}
    >
      {sizeList.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  );
};
