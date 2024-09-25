import useTable from "./hook/useTable";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import TableFooter from "./components/TableFooter";
import AddSubRow from "./components/SubRowComponents/AddSubRow";
import { headerOptionType } from "./dummyData";
import { ColumnDef } from "@tanstack/react-table";

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

  const { table, totalPageNum, pagination, setPagination } = useTable<Example>({
    data,
    columns,
    isPagination: true,
  });

  return (
    <>
      <TableProvider SubRowComponent={AddSubRow}>
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
