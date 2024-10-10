import { useState, Dispatch, SetStateAction } from "react";

interface ReturnType {
  subRowContents: object[][] | undefined;
  setSubRowContents: Dispatch<SetStateAction<object[][] | undefined>>;
}

type ContentsType = Array<object[]> | undefined;

const useSubRowContents = (initState?: Array<object[]>): ReturnType => {
  const [subRowContents, setSubRowContents] = useState<ContentsType>(initState);
  return { subRowContents, setSubRowContents };
};

export default useSubRowContents;