import { CSSProperties, Dispatch, SetStateAction } from "react";
import { PaginationState } from "@tanstack/react-table";
import {
  TablePageSizeSelect,
  PageSelectStyleProps,
} from "./TablePageSizeSelect";
import { TablePagination, PageButtonStyleProps } from "./TablePagination";

interface TableFooterProps {
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  totalPageNum: number;

  pageSizeList?: Array<number>;
  styles?: {
    containerStyle?: CSSProperties;
    pageNumButtonStyle?: PageButtonStyleProps;
    pageSizeSelectStyle?: PageSelectStyleProps;
  };
}

const TableFooter = (props: TableFooterProps) => {
  const { pageSizeList, totalPageNum, pagination, setPagination, styles } =
    props;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        ...styles?.containerStyle,
      }}
    >
      <TablePageSizeSelect
        pageSizeList={pageSizeList}
        pagination={pagination}
        setPagination={setPagination}
        styles={styles?.pageSizeSelectStyle}
      />
      <TablePagination
        totalPageNum={totalPageNum}
        pagination={pagination}
        setPagination={setPagination}
        styles={styles?.pageNumButtonStyle}
      />
    </div>
  );
};
export default TableFooter;
