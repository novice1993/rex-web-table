import { Row, Table, createRow } from "@tanstack/react-table";

export const changeTableCellValue = <T>(
  row: Row<T>,
  table: Table<T>,
  keyName: string | number,
  value: unknown
) => {
  const updatedRowOriginal = { ...row.original, [keyName]: value };

  const updatedRow = createRow(
    table,
    row.id,
    updatedRowOriginal,
    row.index,
    row.depth
  );

  return updatedRow;
};
