/** main row content */
let clickedRowContent: unknown;

export const setClickedRowContent = <T>(content: T) => {
  clickedRowContent = content;
};

export const getClickedRowContent = () => {
  return clickedRowContent;
};

/** sub row content */
let clickedSubRowContent: unknown;

export const setClickedSubRowContent = <T>(content: T) => {
  clickedSubRowContent = content;
};

export const getClickedSubRowContent = () => {
  return clickedSubRowContent;
};
