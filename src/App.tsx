import useTable from "./hook/useTable";
import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";

import { ColumnDef } from "@tanstack/react-table";
import { HeaderOptionType } from "./type/type";
import useSubRowContents from "./hook/useSubRowContents";
import useSubRowExpand from "./hook/useSubRowExpand";

// virtualize test
import useVirtualize from "./feature/Virtualize/useVirtualize";
import VirtualTableBody from "./feature/Virtualize/VirtualTableBody";

export interface Example {
  No: number;
  firstName: string;
  lastName: string;
}

const data: Array<Example> = [{ No: 1, firstName: "yh", lastName: "kim" }];

for (let i = 2; i < 100000; i++) {
  data.push({ No: i, firstName: "yh", lastName: "kim" });
}

const columns: ColumnDef<Example>[] = [
  {
    accessorKey: "No",
    header: "No",
    size: 10,
  },
  {
    accessorKey: "name",
    header: "Name",
    columns: [
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 140,
        cell: (value) => {
          return <div style={{ color: "red" }}>{value.getValue()}</div>;
        },
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 140,
      },
    ],
  },
];

const headerOption: HeaderOptionType[] = [
  { accessorKey: "No", layer: 1, colSpan: 1, rowSpan: 2 },
  { accessorKey: "name", layer: 1, colSpan: 2, rowSpan: 1 },
  { accessorKey: "firstName", layer: 2, colSpan: 1, rowSpan: 1 },
  { accessorKey: "lastName", layer: 2, colSpan: 1, rowSpan: 1 },
];

const subRowDummy = [
  [
    {
      No: 10,
      firstName: "park",
      lastName: "-",
    },
    {
      No: 20,
      firstName: "park",
      lastName: "-",
    },
    {
      No: 30,
      firstName: "park",
      lastName: "-",
    },
    {
      No: 40,
      firstName: "park",
      lastName: "-",
    },
  ],
  [
    {
      No: 10,
      firstName: "park",
      lastName: "-",
    },
    {
      No: 20,
      firstName: "park",
      lastName: "-",
    },
    {
      No: 30,
      firstName: "park",
      lastName: "-",
    },
    {
      No: 40,
      firstName: "park",
      lastName: "-",
    },
  ],
];

function App() {
  const { table } = useTable<Example>({ data, columns });
  const { subRowContents } = useSubRowContents(subRowDummy);
  const { expandState, changeSubRowExpandState } = useSubRowExpand();

  const handleClickRow = ({ rowIndex }: { rowIndex: number }) => {
    changeSubRowExpandState(rowIndex);
  };

  const {
    virtualizeRef,
    virtualizeItems,
    virtuallizeHeight,
    getVirtualizeOffset,
  } = useVirtualize({
    tableData: data,
  });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          border: "1px solid black",
          width: "100%",
          height: "70px",
        }}
      >
        Top Navigation
      </nav>

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "calc(100% - 70px)",
        }}
      >
        <nav
          style={{
            width: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            border: "1px solid black",
            borderTop: "none",
          }}
        >
          left side nav
        </nav>

        <div
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <TableProvider
            useParentRowUi={true}
            subRowContents={subRowContents}
            rowClickEvent={handleClickRow}
            borderLeftNone={true}
            borderTopNone={true}
            isVirtualized={true}
            virtualizeRef={virtualizeRef}
            virtualizeHeight={virtuallizeHeight}
            virtualizedOffset={getVirtualizeOffset(virtualizeItems)}
          >
            <TableHeader
              table={table}
              headerOption={headerOption}
              style={{
                fontSize: "14px",
                padding: "4px",
              }}
            />

            <VirtualTableBody
              rowSelectionType="single"
              table={table}
              virtualizeItems={virtualizeItems}
              style={{
                fontSize: "14px",
                border: "1px solid black",
                textAlign: "center",
              }}
              interactiveStyles={{
                hoverColor: "darkblue",
                clickedColor: "red",
              }}
              defaultSelectedRowIndex={0}
              subRowProps={{
                expandState,
                style: {
                  backgroundColor: "ivory",
                },
                hoverColor: "red",
              }}
            />
          </TableProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
