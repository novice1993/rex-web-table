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

  const getSubRowContentOfSelected = (rowIndex: number) => {
    return contents[rowIndex];
  };

  const setSubRowContenttOfSelected = (
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
    getSubRowContentOfSelected,
    setSubRowContenttOfSelected,
  };
};
