import { Dispatch, SetStateAction, ChangeEvent, useLayoutEffect } from "react";
import { PaginationState } from "@tanstack/react-table";
import { getMedianIndexOfArray, changePageSize } from "../../util/footer.util";

export interface TablePageSizeSelectProps {
  pageSizeList?: Array<number>;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export const TablePageSizeSelect = (props: TablePageSizeSelectProps) => {
  const {
    pageSizeList = [10, 15, 20, 25, 30],
    pagination,
    setPagination,
  } = props;

  const sizeList: Array<number> = pageSizeList;

  const handleChangeOption = (event: ChangeEvent<HTMLSelectElement>) => {
    changePageSize(event.target.value, setPagination);
  };

  useLayoutEffect(function setInitPageSize() {
    const initPageSize = pageSizeList[getMedianIndexOfArray(pageSizeList)];
    setPagination({ ...pagination, pageSize: initPageSize });
  }, []);

  return (
    <select value={String(pagination.pageSize)} onChange={handleChangeOption}>
      {sizeList.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  );
};
