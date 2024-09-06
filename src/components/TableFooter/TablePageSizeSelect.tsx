import { Select } from "@mantine/core";
import { PaginationState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

interface TablePageSizeSelectProps {
  pageSizeList: Array<number>;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

const TablePageSizeSelect = (props: TablePageSizeSelectProps) => {
  const { pageSizeList, pagination, setPagination } = props;

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
      data={converNumToString(pageSizeList)}
      value={String(pagination.pageSize)}
      onChange={handleChangePageSize}
    />
  );
};

export default TablePageSizeSelect;
