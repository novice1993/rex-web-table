import { Row } from "@tanstack/react-table";

interface TableRowUtilProps<T> {
  row: Row<T>;
  hasClickEvent: boolean;
}

export const useGetTableRowUtil = <T>({ row, hasClickEvent }: TableRowUtilProps<T>) => {
  /** make here necessary util for table row */

  const handleClickTableRow = () => {
    if (hasClickEvent) {
      /** write here action for click event */
      console.log("table row data", row);
    }
  };

  return { handleClickTableRow };
};
