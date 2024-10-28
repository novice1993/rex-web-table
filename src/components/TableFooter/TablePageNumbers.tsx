import { CSSProperties } from 'react';
import { generatePageNumbers } from '../../util/footer.util';
import { PageButtonStyleProps } from './TablePagination';

const dots = '⋯';

interface TablePageNumberProps {
  pageIndex: number;
  totalPageNum: number;
  handleClickPageButton: (pageIndex: number) => void;
  style?: PageButtonStyleProps;
}

export const TablePageNumbers = (props: TablePageNumberProps) => {
  const { pageIndex, totalPageNum, handleClickPageButton, style } = props;

  const currentPage = pageIndex + 1;
  const pageNumberContents = generatePageNumbers(currentPage, totalPageNum);

  const contentsStyle: CSSProperties = {
    boxSizing: 'border-box',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '14px',
    border: 'none',

    transition: 'background-color 0.3s ease-in-out',
    outline: 'none',

    // style props
    color: style?.numColor
  };

  // style props about backgroundColor
  const getSelectedButtonColor = (pageNum: number) => {
    let color: string | undefined;
    let backgroundColor: string | undefined;

    if (currentPage === pageNum) {
      color = style?.selectedNumColor ? style?.selectedNumColor : style?.numColor;
      backgroundColor = style?.selectedNumBackgroundColor ? style?.selectedNumBackgroundColor : 'transparent';
    } else {
      color = style?.numColor;
      backgroundColor = 'transparent';
    }

    return { backgroundColor, color };
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {pageNumberContents.map((content, idx) => {
        /** When it is an ellipsis (⋯) */
        if (content === 'dots') {
          return (
            <div
              key={idx}
              style={{
                ...contentsStyle,
                border: 'none',
                fontWeight: 'bolder'
              }}
            >
              {dots}
            </div>
          );
        }

        /** When it is a page number */
        return (
          <button
            key={idx}
            onClick={() => handleClickPageButton(content)}
            style={{
              ...contentsStyle,
              fontWeight: currentPage === content ? 'bold' : 'normal',
              ...getSelectedButtonColor(content)
            }}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};
