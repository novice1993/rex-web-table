import { Cell } from "@tanstack/react-table";

interface TableCellUtilProps<T> {
  cell: Cell<T, unknown>;
  hasClickEvent: boolean;
}

export const useGetTableCellUtil = <T>({ cell, hasClickEvent }: TableCellUtilProps<T>) => {
  /** make here necessary util for table cell */

  const getCellValue = () => {
    const value = cell.getContext().getValue();
    return value;
  };

  const handleClickTableCell = () => {
    if (hasClickEvent) {
      /** write here action for click event */
      console.log("table cell data", cell);
    }
  };

  return { getCellValue, handleClickTableCell };
};
