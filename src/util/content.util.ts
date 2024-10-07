/** main row content */
let clickedRowContent: unknown;

export const setClickedRowContent = <T>(content: T) => {
  clickedRowContent = content;
};

export const getClickedRowContent = () => {
  return clickedRowContent;
};

/** main cell content */
let clickedCellContent: unknown;

export const setClickedCellContent = (content: unknown) => {
  clickedCellContent = content;
};

export const getClickedCellContent = () => {
  return clickedCellContent;
};
