import { useTableSubRowContext } from "../provider/TableSubRowProvider";
import { Cell, Row } from "@tanstack/react-table";
import { changeTableCellValue } from "../util/body.util";

interface TableCellUtilProps<T> {
  cell: Cell<T, unknown>;
}

export const useGetTableCellUtil = <T>({ cell }: TableCellUtilProps<T>) => {
  /** make here necessary util for table cell */

  const { subRowContent, setSubRowContent, table } = useTableSubRowContext<T>();

  const getCellValue = () => {
    const value = cell.getContext().getValue();
    return value;
  };

  const handleClickTableCell = () => {
    /** write here action for click event */

    const addTableSubRow = () => {
      if (cell.column.id === "add") {
        const row = cell.row;
        const cellValue = cell.getValue();

        if (cellValue === "-") {
          const updatedRow = subRowContent.filter((content: Row<T>) => {
            return content.index !== row.index;
          });

          return setSubRowContent(updatedRow);
        }

        const updatedRow = changeTableCellValue(row, table, "No", "");
        const reUpdatedRow = changeTableCellValue(
          updatedRow,
          table,
          "add",
          "-"
        );
        reUpdatedRow.index = subRowContent.length;

        const newSubRowContent = [...subRowContent, reUpdatedRow];

        console.log(newSubRowContent);
        setSubRowContent(newSubRowContent);
      }
    };

    addTableSubRow();
  };

  return { getCellValue, handleClickTableCell };
};
