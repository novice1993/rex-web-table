import { CSSProperties, Dispatch, SetStateAction } from "react";
import { PaginationState } from "@tanstack/react-table";
import { TablePageNumbers } from "./TablePageNumbers";
import { handleChangePageIndex } from "../../util/footer.util";

export interface PageButtonStyleProps {
  fontColor?: string;
  backgroundColor?: string;
  arrowBackgroundColor?: string;
  border?: string;

  selectedNumberButtonColor?: string;
  disabledArrowButtonColor?: string;
  disabledArrowColor?: string;
}

export interface TablePaginationProps {
  totalPageNum: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  styles?: PageButtonStyleProps;
}

export const TablePagination = (props: TablePaginationProps) => {
  const { totalPageNum, pagination, setPagination, styles } = props;

  const handleClickPageButton = (pageIndex: number) => {
    handleChangePageIndex(pageIndex, setPagination);
  };

  const arrowButtonStyle: CSSProperties = {
    boxSizing: "border-box",
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "3px",
    cursor: "pointer",

    // style props
    border: styles?.border ? styles.border : "1px solid darkgray",
  };

  // style props about backgroundColor
  const getArrowButtonColor = (isDisabled: boolean) => {
    let backgroundColor: string | undefined;

    if (isDisabled) {
      backgroundColor = styles?.disabledArrowButtonColor
        ? styles.disabledArrowButtonColor
        : styles?.backgroundColor;
    } else {
      backgroundColor = styles?.arrowBackgroundColor
        ? styles.arrowBackgroundColor
        : styles?.backgroundColor;
    }

    return backgroundColor;
  };

  // style props about arrow color
  const getArrowColor = (isDisabled: boolean) => {
    let color: string | undefined;

    if (isDisabled) {
      color = styles?.disabledArrowColor
        ? styles.disabledArrowColor
        : styles?.fontColor;
    } else {
      color = styles?.fontColor;
    }

    return color;
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        gap: "6px",
      }}
    >
      {/* Previous Button */}
      <button
        disabled={pagination.pageIndex === 0}
        style={{
          ...arrowButtonStyle,
          backgroundColor: getArrowButtonColor(pagination.pageIndex === 0),
        }}
        onClick={() => handleClickPageButton(pagination.pageIndex)}
      >
        <svg
          viewBox="0 0 16 16"
          fill={getArrowColor(pagination.pageIndex === 0)}
        >
          <path d="M7.219 8l3.3 3.3-.943.943L5.333 8l4.243-4.243.943.943-3.3 3.3z"></path>
        </svg>
      </button>

      {/* Page Num Button */}
      <TablePageNumbers
        pageIndex={pagination.pageIndex}
        totalPageNum={totalPageNum}
        handleClickPageButton={handleClickPageButton}
        style={styles}
      />

      {/* Next Button */}
      <button
        disabled={pagination.pageIndex === totalPageNum - 1}
        style={{
          ...arrowButtonStyle,
          backgroundColor: getArrowButtonColor(
            pagination.pageIndex === totalPageNum - 1
          ),
        }}
        onClick={() => handleClickPageButton(pagination.pageIndex + 2)}
      >
        <svg
          viewBox="0 0 16 16"
          fill={getArrowColor(pagination.pageIndex === totalPageNum - 1)}
        >
          <path d="M8.781 8l-3.3-3.3.943-.943L10.667 8l-4.243 4.243-.943-.943 3.3-3.3z" />
        </svg>
      </button>
    </div>
  );
};
