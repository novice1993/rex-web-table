import { MouseEvent } from "react";
import useTableManager from "./hook/useTableManager";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
// import TableFooter from "./components/TableFooter";
import AddSubRow from "./components/SubRowComponents/AddSubRow";

import { data, columns, headerOptionType } from "./dummyData";
import { Cell, Row } from "@tanstack/react-table";

import { changeTableCellValue } from "./util/body.util";

// test

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

function App() {
  const { table, subRowContent, setSubRowContent } = useTableManager<Example>({
    data,
    columns,
    // isSorting: true,
  });

  const addTableSubRow = ({
    cell,
    event,
  }: {
    cell?: Cell<Example, unknown>;
    event?: MouseEvent<HTMLTableCellElement>;
  }) => {
    if (!cell) return;

    event?.stopPropagation();
    if (cell.column.id === "add") {
      const row = cell.row;
      const cellValue = cell.getValue();

      if (cellValue === "-") {
        const updatedRow = subRowContent.filter((content: unknown) => {
          const typedContent = content as Row<Example>;
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

  return (
    <>
      <TableProvider
        table={table}
        subRowContent={subRowContent}
        setSubRowContent={setSubRowContent}
        SubRowComponent={AddSubRow}
        onCellClick={addTableSubRow}
      >
        <TableHeader table={table} headerOptionType={headerOptionType} />
        <TableBody table={table} />
      </TableProvider>
    </>
  );
}

export default App;

{
  /* <TableFooter
totalPageNum={totalPageNum}
pagination={pagination}
setPagination={setPagination}
/> */
}
