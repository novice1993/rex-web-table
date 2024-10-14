import { CSSProperties } from "react";
import { generatePageNumbers } from "../../util/footer.util";
import { PageButtonStyleProps } from "./TablePagination";

const dots = "⋯";

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
    boxSizing: "border-box",
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "14px",

    // style props
    color: style?.fontColor,
    border: style?.border ? style.border : "1px solid darkgray",
  };

  // style props about backgroundColor
  const getSelectedButtonColor = (pageNum: number) => {
    let backgroundColor: string | undefined;

    if (currentPage !== pageNum) {
      backgroundColor = style?.backgroundColor;
    }

    if (currentPage === pageNum) {
      backgroundColor = style?.selectedNumberButtonColor
        ? style.selectedNumberButtonColor
        : style?.backgroundColor;
    }

    return backgroundColor;
  };

  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {pageNumberContents.map((content, idx) => {
        /** When it is an ellipsis (⋯) */
        if (content === "dots") {
          return (
            <div
              key={idx}
              style={{
                ...contentsStyle,
                border: "none",
                fontWeight: "bolder",
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
              fontWeight: currentPage === content ? "bold" : "normal",
              backgroundColor: getSelectedButtonColor(content),
            }}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};
