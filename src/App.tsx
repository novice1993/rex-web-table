import useTable from "./hook/useTable";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import TableFooter from "./components/TableFooter";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderOptionType } from "./type/type";
import useSubRowContents from "./hook/useSubRowContents";
import useSubRowExpand from "./hook/useSubRowExpand";
import { useState } from "react";

export interface Example {
  No: number;
  firstName: string;
  lastName: string;
}

const data: Array<Example> = [
  { No: 1, firstName: "yh", lastName: "kim" },
  { No: 2, firstName: "yh", lastName: "kim" },
  { No: 3, firstName: "yh", lastName: "kim" },
  { No: 4, firstName: "yh", lastName: "kim" },
  { No: 5, firstName: "yh", lastName: "kim" },
  { No: 6, firstName: "yh", lastName: "kim" },
  { No: 7, firstName: "yh", lastName: "kim" },
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
  const [testPage, setTestPage] = useState(false);

  const { table, totalPageNum, pagination, setPagination } = useTable<Example>({
    data,
    columns,
    isPagination: true,
  });
  const { subRowContents } = useSubRowContents(subRowDummy);
  const { expandState, changeSubRowExpandState } = useSubRowExpand();

  const handleClickRow = ({ rowIndex }: { rowIndex: number }) => {
    changeSubRowExpandState(rowIndex);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <button onClick={() => setTestPage(!testPage)}>change page</button>

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
          <div style={{ height: "calc(100% - 35px)", overflowY: "auto" }}>
            <TableProvider
              useParentRowUi={true}
              subRowContents={subRowContents}
              rowClickEvent={handleClickRow}
              borderLeftNone={true}
              borderTopNone={true}
            >
              <TableHeader
                table={table}
                headerOption={headerOption}
                style={{
                  fontSize: "14px",
                  padding: "4px",
                  border: "1px solid black",
                  backgroundColor: "darkgray",
                }}
              />
              <TableBody
                table={table}
                style={{
                  fontSize: "14px",
                  border: "1px solid black",
                  textAlign: "center",
                }}
                interactiveStyles={{
                  hoverColor: "white",
                  clickedColor: "black",
                }}
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

          <TableFooter
            pagination={pagination}
            setPagination={setPagination}
            totalPageNum={totalPageNum}
            styles={{
              containerStyle: {
                padding: "2px 3px",
                border: "1px solid darkgray",
                borderLeft: "none",
              },
              pageSizeSelectStyle: {
                border: "none",
              },
              pageNumButtonStyle: {
                border: "none",
                backgroundColor: "transparent",
                disabledArrowColor: "darkgray",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
