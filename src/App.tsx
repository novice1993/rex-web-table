import useTable from "./hook/useTable";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import TableFooter from "./components/TableFooter";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderOptionType } from "./type/type";
import useSubRowContents from "./hook/useSubRowContents";
import useSubRowExpand from "./hook/useSubRowExpand";

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

const dummyData: Array<Example> = [
  { No: 1, firstName: "kim", add: "-" },
  { No: 2, firstName: "kim", add: "-" },
  { No: 3, firstName: "kim", add: "-" },
  { No: 4, firstName: "kim", add: "-" },
  { No: 5, firstName: "kim", add: "-" },
  { No: 6, firstName: "kim", add: "-" },
  { No: 7, firstName: "kim", add: "-" },
  { No: 8, firstName: "kim", add: "-" },
  { No: 9, firstName: "kim", add: "-" },
];

const columns: ColumnDef<Example>[] = [
  {
    accessorKey: "No",
    header: "No",
    size: 10,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
    columns: [
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 120,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 120,
      },
    ],
  },
  {
    accessorKey: "add",
    header: "add",
    size: 100,
  },
];

const headerOption: HeaderOptionType[] = [
  { accessorKey: "No", layer: 1, colSpan: 1, rowSpan: 2 },
  { accessorKey: "name", layer: 1, colSpan: 2, rowSpan: 1 },
  { accessorKey: "firstName", layer: 2, colSpan: 1, rowSpan: 1 },
  { accessorKey: "lastName", layer: 2, colSpan: 1, rowSpan: 1 },
  { accessorKey: "add", layer: 1, colSpan: 1, rowSpan: 2 },
];

const subRowDummy = [
  [
    {
      No: 10,
      firstName: "park",
      lastName: "h",
      add: "-",
    },
    {
      No: 20,
      firstName: "park",
      add: "-",
    },
    {
      No: 30,
      firstName: "park",
      add: "-",
    },
    {
      No: 40,
      firstName: "park",
      add: "-",
    },
  ],
  [
    {
      No: 10,
      firstName: "park",
      add: "-",
    },
    {
      No: 20,
      firstName: "park",
      add: "-",
    },
    {
      No: 30,
      firstName: "park",
      add: "-",
    },
    {
      No: 40,
      firstName: "park",
      add: "-",
    },
  ],
];

function App() {
  const { table, totalPageNum, pagination, setPagination } = useTable<Example>({
    data: dummyData,
    columns,
    isPagination: true,
  });
  const { subRowContents } = useSubRowContents(subRowDummy);
  const { expandState, changeSubRowExpandState } = useSubRowExpand();

  const handleClickRow = ({ rowIndex }: { rowIndex: number }) => {
    changeSubRowExpandState(rowIndex);
  };

  return (
    <>
      <TableProvider
        useParentRowUi={true}
        subRowContents={subRowContents}
        rowClickEvent={handleClickRow}
      >
        <TableHeader
          table={table}
          headerOption={headerOption}
          style={{
            textAlign: "center",
            padding: "4px",
            border: "1px solid black",
            fontSize: "11px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <TableBody
          table={table}
          style={{
            border: "1px solid black",
            textAlign: "center",
          }}
          subRowProps={{
            expandState,
            style: {
              backgroundColor: "ivory",
            },
          }}
        />
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
