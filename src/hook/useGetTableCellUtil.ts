import { useTableContext } from "../provider/TableProvider";
import { Cell, Row } from "@tanstack/react-table";
import { changeTableCellValue } from "../util/body.util";

interface TableCellUtilProps<T> {
  cell: Cell<T, unknown>;
  hasClickEvent: boolean;
}

export const useGetTableCellUtil = <T>({
  cell,
  hasClickEvent,
}: TableCellUtilProps<T>) => {
  /** make here necessary util for table cell */

  const { subRowContent, setSubRowContent, table } = useTableContext<T>();

  const getCellValue = () => {
    const value = cell.getContext().getValue();
    return value;
  };

  const handleClickTableCell = () => {
    /** write here action for click event */
    if (!hasClickEvent) return;

    const addTableSubRow = () => {
      if (cell.column.id === "add") {
        const row = cell.row;
        const cellValue = cell.getValue();

        if (cellValue === "-") {
          const updatedRow = subRowContent.filter((content: unknown) => {
            const typedContent = content as Row<T>;
            return typedContent.index !== row.index;
          });

          return setSubRowContent(updatedRow);
        } else {
          const updatedRow = changeTableCellValue(row, table, "No", "");
          const reUpdatedRow = changeTableCellValue(
            updatedRow,
            table,
            "add",
            "-"
          );
          reUpdatedRow.index = subRowContent.length;
          const newSubRowContent = [...subRowContent, reUpdatedRow];

          setSubRowContent(newSubRowContent);
        }
      }
    };

    addTableSubRow();
  };

  return { getCellValue, handleClickTableCell };
};
