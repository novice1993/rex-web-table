import { CSSProperties } from "react";
import { generatePageNumbers } from "../../util/footer.util";

interface TablePageNumberProps {
  pageIndex: number;
  totalPageNum: number;
  handleClickPageButton: (pageIndex: number) => void;
}

const dots = "⋯";

const contentsStyle: CSSProperties = {
  boxSizing: "border-box",
  width: "30px",
  height: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "3px",
  border: "1px solid darkgray",
};

export const TablePageNumbers = (props: TablePageNumberProps) => {
  const { pageIndex, totalPageNum, handleClickPageButton } = props;

  const currentPage = pageIndex + 1;
  const pageNumberContents = generatePageNumbers(currentPage, totalPageNum);

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
              fontWeight: currentPage === content ? "bold" : "normal",
              ...contentsStyle,
            }}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};
