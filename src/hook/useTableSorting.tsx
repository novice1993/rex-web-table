import { useState } from "react";
import { SortingState } from "@tanstack/react-table";

const useTableSorting = () => {
  const initSortingState = [{ id: "No", desc: false }];
  const [sorting, setSorting] = useState<SortingState>(initSortingState);

  return { sorting, setSorting };
};

export default useTableSorting;
