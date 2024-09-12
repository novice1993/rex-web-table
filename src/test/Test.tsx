import { ColumnDef } from "@tanstack/react-table";
import useTableManager from "../hook/useTableManager";

import TableHeader from "../components/TableHeader";
import TableBody from "../components/TableBody";

import { HeaderOptionType } from "../type/type";

interface TableDataType {
  no: number;
  firstName: string;
  lastName: string;
}

const tableData: TableDataType[] = [
  { no: 1, firstName: "John", lastName: "Doe" },
  { no: 2, firstName: "Jane", lastName: "Smith" },
  { no: 3, firstName: "Michael", lastName: "Johnson" },
  { no: 4, firstName: "Emily", lastName: "Davis" },
  { no: 5, firstName: "David", lastName: "Brown" },
];

const tableColumns: ColumnDef<TableDataType>[] = [
  {
    header: "No",
    accessorKey: "no",
    enableSorting: false,
  },
  {
    header: "Name",
    columns: [
      {
        header: "First Name",
        accessorKey: "firstName",
        enableSorting: false,
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
        enableSorting: false,
      },
    ],
  },
];

import { TableProvider } from "../provider/TableProvider";

// 여기 만들어야 함
const headerOptionType: HeaderOptionType[] = [
  { accessorKey: "no", layer: 1, rowSpan: 2, colSpan: 1 },
  { accessorKey: "Name", layer: 1, rowSpan: 1, colSpan: 2 },
  {
    accessorKey: "firstName",
    layer: 2,
    rowSpan: 1,
    colSpan: 1,
  },
  {
    accessorKey: "lastName",
    layer: 2,
    rowSpan: 1,
    colSpan: 1,
  },
];

const Test = () => {
  const { table } = useTableManager<TableDataType>({
    data: tableData,
    columns: tableColumns,
    isPagination: false,
    isSorting: false,
  });

  return (
    <TableProvider table={table}>
      <TableHeader table={table} headerOptionType={headerOptionType} />
      <TableBody table={table} />
    </TableProvider>
  );
};

export default Test;
