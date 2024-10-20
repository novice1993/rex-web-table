import { Dispatch, SetStateAction, ChangeEvent, useLayoutEffect, CSSProperties } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { getMedianIndexOfArray, changePageSize } from '../../util/footer.util';

export interface PageSelectStyleProps {
  fontColor?: string;
  backgroundColor?: string;
}

export interface TablePageSizeSelectProps {
  pageSizeList?: Array<number>;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  styles?: PageSelectStyleProps;
}

export const TablePageSizeSelect = (props: TablePageSizeSelectProps) => {
  const { pageSizeList = [10, 15, 20, 25, 30], pagination, setPagination, styles } = props;

  const sizeList: Array<number> = pageSizeList;

  const containerStyle: CSSProperties = {
    width: '50px',
    height: '30px',

    display: 'flex',
    alignItems: 'center',

    padding: '0 5px',
    borderRadius: '3px',
    border: 'none',
    backgroundColor: styles?.backgroundColor
  };

  const selectStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundColor: styles?.backgroundColor,

    fontSize: '14px',

    border: 'none',
    outline: 'none',
    cursor: 'pointer',

    // style props
    color: styles?.fontColor
  };

  const handleChangeOption = (event: ChangeEvent<HTMLSelectElement>) => {
    changePageSize(event.target.value, setPagination);
  };

  useLayoutEffect(function setInitPageSize() {
    const initPageSize = pageSizeList[getMedianIndexOfArray(pageSizeList)];
    setPagination({ ...pagination, pageSize: initPageSize });
  }, []);

  return (
    <div style={{ ...containerStyle }}>
      <select style={{ ...selectStyle }} value={String(pagination.pageSize)} onChange={handleChangeOption}>
        {sizeList.map(size => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};
