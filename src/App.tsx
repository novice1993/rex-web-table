import useTable from "./hook/useTable";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import AddSubRow from "./components/SubRowComponents/AddSubRow";
import { data, headerOptionType } from "./dummyData";
import { ColumnDef } from "@tanstack/react-table";

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

const columns: ColumnDef<Example>[] = [
  {
    accessorKey: "No",
    header: "No",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "add",
    header: "add",
  },
];

function App() {
  const { table, subRowContent, setSubRowContent } = useTable<Example>({
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
