import useTable from "./hook/useTable";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import TableFooter from "./components/TableFooter";
import AddSubRow from "./components/SubRowComponents/AddSubRow";
import { headerOptionType } from "./dummyData";
import { ColumnDef, Row } from "@tanstack/react-table";

import { useLayoutEffect, useState } from "react";
import { useSubRowContent } from "./hook/useSubRowContent";

// const subRowCellClickEvent = ({
//   cellIndex,
//   rowIndex,
//   e,
// }: {
//   cellIndex: number;
//   rowIndex?: number;
//   e?: React.MouseEvent<HTMLTableCellElement>;
// }) => {
//   if (cellIndex !== 2) return;

//   if (rowIndex !== undefined) {
//     e?.stopPropagation();

//     const prevSubRowContent = getSubRowContentOfSelected(rowIndex);
//     const testState = [...prevSubRowContent];

//     if (testState.length !== 0) {
//       testState.pop();
//       setSubRowContenttOfSelected(rowIndex, testState);
//     }
//   }
// };

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

function App() {
  const { getSubRowContentOfSelected, setSubRowContenttOfSelected } =
    useSubRowContent();

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
      cell: ({ row }) => {
        const handleClickCell = (e: React.MouseEvent<HTMLTableCellElement>) => {
          e.stopPropagation();

          if (!row.getIsExpanded()) {
            row.toggleExpanded();
          }

          const subRowContent = {
            no: row.original.No,
            name: row.original.firstName,
            add: row.original.add,
          };

          const prevState = getSubRowContentOfSelected(row.index);

          if (prevState && prevState.length !== 0) {
            const newSubRowContents = [...prevState, subRowContent];
            setSubRowContenttOfSelected(row.index, newSubRowContents);
          } else {
            setSubRowContenttOfSelected(row.index, [subRowContent]);
          }
        };

        return <div onClick={handleClickCell}>test</div>;
      },
    },
  ];

  // data
  const [data, setData] = useState([]);
  const { table, totalPageNum, pagination, setPagination } = useTable<Example>({
    data: data,
    columns,
    isPagination: true,
  });

  const rowClickEvent = (row: Row<unknown>) => {
    row.toggleExpanded();
  };

  useLayoutEffect(function setTableData() {
    const apiUrl = "http://localhost:8080/table/type/1";

    const getdata = async () => {
      const result = await fetch(apiUrl, {
        method: "GET",
      });
      const data = await result.json();
      if (data) setData(data);
    };

    getdata();
  }, []);

  return (
    <>
      <TableProvider
        SubRowComponent={AddSubRow}
        useParentRowUi={true}
        rowClickEvent={rowClickEvent}
        // subRowClickEvent={subRowClickEvent}
        // subRowCellClickEvent={subRowCellClickEvent}
      >
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
