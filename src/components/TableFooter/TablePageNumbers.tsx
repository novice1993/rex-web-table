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
        /** 줄임 표시 (⋯) 인 경우 */
        if (content === "dots") {
          return (
            <div key={idx} style={{ margin: "0 4px" }}>
              {dots}
            </div>
          );
        }

        /** 페이지 번호인 경우 */
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
