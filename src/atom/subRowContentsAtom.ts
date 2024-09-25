import { atomWithImmer } from "jotai-immer";

// const initState = [];

const dummyState = [
  [
    { No: 10, firstName: "kim", add: "-" },
    { No: 20, firstName: "kim", add: "-" },
    { No: 30, firstName: "kim", add: "-" },
  ],
];

export const subRowContentsAtom = atomWithImmer<Array<object[]>>(dummyState);
