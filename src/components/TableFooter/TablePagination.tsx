import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { TablePageNumbers } from './TablePageNumbers';
import { handleChangePageIndex } from '../../util/footer.util';

export interface PageButtonStyleProps {
  numColor?: string;
  selectedNumColor?: string;
  selectedNumBackgroundColor?: string;

  arrowButtonColor?: string;
  disabledArrowButtonColor?: string;
}

export interface TablePaginationProps {
  totalPageNum: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  styles?: PageButtonStyleProps;
}

const prevButton = '<';
const nextButton = '>';

export const TablePagination = (props: TablePaginationProps) => {
  const { totalPageNum, pagination, setPagination, styles } = props;

  const handleClickPageButton = (pageIndex: number) => {
    handleChangePageIndex(pageIndex, setPagination);
  };

  const arrowButtonStyle: CSSProperties = {
    boxSizing: 'border-box',
    width: '30px',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '3px',
    cursor: 'pointer',
    border: 'none',
    transition: 'color 0.3s ease-in-out'
  };

  // style props about arrow color
  const getArrowColor = (isDisabled: boolean) => {
    let color: string | undefined;

    if (isDisabled) {
      color = styles?.disabledArrowButtonColor ? styles.disabledArrowButtonColor : styles?.arrowButtonColor;
    } else {
      color = styles?.arrowButtonColor;
    }

    return color;
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        gap: '6px'
      }}
    >
      {/* Previous Button */}
      <button
        disabled={pagination.pageIndex === 0}
        style={{
          ...arrowButtonStyle,
          backgroundColor: 'transparent',
          outline: 'none',
          color: getArrowColor(pagination.pageIndex === 0)
        }}
        onClick={() => handleClickPageButton(pagination.pageIndex)}
      >
        {prevButton}
      </button>

      {/* Page Num Button */}
      <TablePageNumbers pageIndex={pagination.pageIndex} totalPageNum={totalPageNum} handleClickPageButton={handleClickPageButton} style={styles} />

      {/* Next Button */}
      <button
        disabled={pagination.pageIndex === totalPageNum - 1}
        style={{
          ...arrowButtonStyle,
          backgroundColor: 'transparent',
          outline: 'none',
          color: getArrowColor(pagination.pageIndex === totalPageNum - 1)
        }}
        onClick={() => handleClickPageButton(pagination.pageIndex + 2)}
      >
        {nextButton}
      </button>
    </div>
  );
};
