import { Example } from "./App";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderOptionType } from "./type/type";

export const columns: ColumnDef<Example>[] = [
  {
    accessorKey: "No",
    header: "No",
    enableSorting: true,
  },
  { accessorKey: "firstName", header: "First Name", enableSorting: false },
  {
    accessorKey: "add",
    header: "add",
    enableSorting: false,
  },
];

export const headerOptionType: HeaderOptionType[] = [
  { accessorKey: "No", layer: 1, rowSpan: 3, colSpan: 1 },
  { accessorKey: "firstName", layer: 1, rowSpan: 3, colSpan: 1 },
  {
    accessorKey: "add",
    layer: 1,
    rowSpan: 3,
    colSpan: 1,
  },
];

const originData: Example[] = [
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "Jane",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
  {
    No: 1,
    firstName: "John",
    add: "+",
  },
];

// 🔵 custom for test 🔵
export const data = originData.map((data, index) => {
  data.No = index + 1;
  return data;
});
