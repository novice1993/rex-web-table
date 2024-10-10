import { useState } from "react";

const useSubRowExpand = () => {
  const [expandState, setExpandState] = useState<boolean[]>([]);

  const changeSubRowExpandState = (rowIndex: number) => {
    setExpandState((prevState) => {
      const newState = [...prevState];
      newState[rowIndex] = !prevState[rowIndex];
      return newState;
    });
  };

  return { expandState, setExpandState, changeSubRowExpandState };
};

export default useSubRowExpand;
