import useTable from "./hook/useTable";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import TableFooter from "./components/TableFooter";
import AddSubRow from "./components/SubRowComponents/AddSubRow";
import { headerOptionType } from "./dummyData";
import { ColumnDef, Row } from "@tanstack/react-table";

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

const dummyData: Array<Example> = [
  { No: 1, firstName: "kim", add: "+" },
  { No: 2, firstName: "kim", add: "+" },
  { No: 3, firstName: "kim", add: "+" },
  { No: 4, firstName: "kim", add: "+" },
  { No: 5, firstName: "kim", add: "+" },
  { No: 6, firstName: "kim", add: "+" },
];

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
    data: dummyData,
    columns,
    isPagination: true,
  });

  const rowClickEvent = (row: Row<unknown>) => {
    row.toggleExpanded();
  };

  return (
    <>
      <TableProvider SubRowComponent={AddSubRow} rowClickEvent={rowClickEvent}>
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
