import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";

interface Example {
  firstName: string;
  lastName: string;
  age: number;
}

const data: Example[] = [
  { firstName: "John", lastName: "Doe", age: 28 },
  { firstName: "Jane", lastName: "Doe", age: 26 },
  { firstName: "John", lastName: "Doe", age: 28 },
  { firstName: "Jane", lastName: "Doe", age: 26 },
  { firstName: "John", lastName: "Doe", age: 28 },
  { firstName: "Jane", lastName: "Doe", age: 26 },
  { firstName: "John", lastName: "Doe", age: 28 },
  { firstName: "Jane", lastName: "Doe", age: 26 },
  { firstName: "John", lastName: "Doe", age: 28 },
  { firstName: "Jane", lastName: "Doe", age: 26 },
  { firstName: "John", lastName: "Doe", age: 28 },
  { firstName: "Jane", lastName: "Doe", age: 26 },
  { firstName: "John", lastName: "Doe", age: 28 },
  { firstName: "Jane", lastName: "Doe", age: 26 },
  { firstName: "John", lastName: "Doe", age: 28 },
  { firstName: "Jane", lastName: "Doe", age: 26 },
  { firstName: "John", lastName: "Doe", age: 28 },
  { firstName: "Jane", lastName: "Doe", age: 26 },
  { firstName: "John", lastName: "Doe", age: 28 },
  { firstName: "Jane", lastName: "Doe", age: 26 },
];

const columns: ColumnDef<Example>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];

function App() {
  const table = useReactTable<Example>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <TableHeader table={table} />
      <TableBody table={table} />
    </div>
  );
}

export default App;
