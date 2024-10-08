import { generatePageNumbers } from "../../util/footer.util";

interface TablePageNumberProps {
  pageIndex: number;
  totalPageNum: number;
  handleClickPageButton: (pageIndex: number) => void;
}

const dots = "⋯";

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
            <div key={idx} style={{ margin: "0 4px" }}>
              {dots}
            </div>
          );
        }

        /** When it is a page number */
        return (
          <button
            key={idx}
            onClick={() => handleClickPageButton(content)}
            style={{ fontWeight: currentPage === content ? "bold" : "normal" }}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};
