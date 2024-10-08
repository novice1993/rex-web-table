import { useAtom } from "jotai";
import { subRowContentsAtom } from "../atom/subRowContentsAtom";

export const useSubRowContent = () => {
  const [contents, setContents] = useAtom(subRowContentsAtom);

  const getSubRowContentOfEntrie = () => {
    return contents;
  };

  const setSubRowContentOfEntire = (newContents: Array<object[]>) => {
    setContents(newContents);
  };

  const getSubRowContentOfSelectedRow = (rowIndex: number) => {
    return contents[rowIndex];
  };

  const setSubRowContenttOfSelectedRow = (
    rowIndex: number,
    newSubRowContent: Array<object>
  ) => {
    setContents((prevState: Array<object[]>) => {
      prevState[rowIndex] = newSubRowContent;
      return prevState;
    });
  };

  return {
    getSubRowContentOfEntrie,
    setSubRowContentOfEntire,
    getSubRowContentOfSelectedRow,
    setSubRowContenttOfSelectedRow,
  };
};
