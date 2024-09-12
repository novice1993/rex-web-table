import useTableManager from "./hook/useTableManager";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import TableFooter from "./components/TableFooter";
import AddSubRow from "./components/SubRowComponents/AddSubRow";

import { data, columns, headerOptionType } from "./dummyData";
import { Cell, Row } from "@tanstack/react-table";

import { Table } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { changeTableCellValue } from "./util/body.util";

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

interface CellClickProps<T> {
  cell?: Cell<T, unknown>;
  table?: Table<T>;
  subRowContent?: Array<unknown>;
  setSubRowContent?: Dispatch<SetStateAction<Array<unknown>>>;
}

const addTableSubRow = <T,>({
  cell,
  table,
  subRowContent,
  setSubRowContent,
}: CellClickProps<T>) => {
  if (!cell || !subRowContent || !table || !setSubRowContent) return;

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
      const reUpdatedRow = changeTableCellValue(updatedRow, table, "add", "-");
      reUpdatedRow.index = subRowContent.length;
      const newSubRowContent = [...subRowContent, reUpdatedRow];

      setSubRowContent(newSubRowContent);
    }
  }
};

function App() {
  const { table, pagination, setPagination, totalPageNum } = useTableManager({
    data,
    columns,
    isPagination: true,
    isSorting: true,
  });

  return (
    <>
      <TableProvider
        table={table}
        SubRowComponent={AddSubRow}
        onCellClick={addTableSubRow}
      >
        <TableHeader table={table} headerOptionType={headerOptionType} />
        <TableBody table={table} />
      </TableProvider>
      <TableFooter
        totalPageNum={totalPageNum}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

export default App;
