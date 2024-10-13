import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useLayoutEffect,
  CSSProperties,
} from "react";
import { PaginationState } from "@tanstack/react-table";
import { getMedianIndexOfArray, changePageSize } from "../../util/footer.util";

const containerStyle: CSSProperties = {
  width: "50px",
  height: "30px",

  display: "flex",
  alignItems: "center",

  padding: "0 5px",
  border: "1px solid darkgray",
  borderRadius: "3px",
};

const selectStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",

  border: "none",
  outline: "none",
};

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
    <div style={{ ...containerStyle }}>
      <select
        style={{ ...selectStyle }}
        value={String(pagination.pageSize)}
        onChange={handleChangeOption}
      >
        {sizeList.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};
