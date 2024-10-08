import { atomWithImmer } from "jotai-immer";

// const initState = [];
const dummyState = [
  [
    {
      No: 10,
      firstName: "park",
      add: "-",
    },
    {
      No: 20,
      firstName: "park",
      add: "-",
    },
    {
      No: 30,
      firstName: "park",
      add: "-",
    },
    {
      No: 40,
      firstName: "park",
      add: "-",
    },
  ],
  [
    {
      No: 10,
      firstName: "park",
      add: "-",
    },
    {
      No: 20,
      firstName: "park",
      add: "-",
    },
    {
      No: 30,
      firstName: "park",
      add: "-",
    },
    {
      No: 40,
      firstName: "park",
      add: "-",
    },
  ],
];

export const subRowContentsAtom = atomWithImmer<Array<object[]>>(dummyState);
