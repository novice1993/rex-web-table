import useTableManager from "./hook/useTableManager";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import AddSubRow from "./components/SubRowComponents/AddSubRow";
import { data, headerOptionType } from "./dummyData";
import { ColumnDef } from "@tanstack/react-table";

import { changeTableCellValue } from "./util/body.util";
import { Row } from "@tanstack/react-table";

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

function App() {
  const columns: ColumnDef<Example>[] = [
    {
      accessorKey: "No",
      header: "No",
      enableSorting: false,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      enableSorting: false,
    },
    {
      accessorKey: "add",
      header: "add",
      enableSorting: false,
      cell: ({ getValue, cell, table }) => {
        const cellValue = getValue() as string;

        const addTableSubRow = () => {
          if (cell.column.id === "add") {
            const row = cell.row;
            const cellValue = cell.getValue();

            if (cellValue === "-") {
              const updatedRow = subRowContent.filter((content: unknown) => {
                const typedContent = content as Row<unknown>;
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
          <div
            onClick={(e) => {
              e.stopPropagation();
              // console.log(getValue());
              addTableSubRow();
            }}
          >
            {cellValue}
          </div>
        );
      },
    },
  ];

  const { table, subRowContent, setSubRowContent } = useTableManager<Example>({
    data,
    columns,
  });

  return (
    <>
      <TableProvider
        table={table}
        subRowContent={subRowContent}
        setSubRowContent={setSubRowContent}
        SubRowComponent={AddSubRow}
      >
        <TableHeader table={table} headerOptionType={headerOptionType} />
        <TableBody table={table} />
      </TableProvider>
    </>
  );
}

export default App;
