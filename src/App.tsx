import useTableManager from "./hook/useTableManager";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import AddSubRow from "./components/SubRowComponents/AddSubRow";
import { data, headerOptionType } from "./dummyData";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Example>[] = [
  {
    accessorKey: "No",
    header: "No",
    enableSorting: false,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    enableSorting: false,
    cell: () => {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input type="checkbox" />
        </div>
      );
    },
  },
  {
    accessorKey: "add",
    header: "add",
    enableSorting: false,
  },
];

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

function App() {
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
