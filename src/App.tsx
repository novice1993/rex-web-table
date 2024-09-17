import useTable from "./hook/useTable";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import TableFooter from "./components/TableFooter";
import AddSubRow from "./components/SubRowComponents/AddSubRow";
import { data, headerOptionType } from "./dummyData";
import { ColumnDef, Row } from "@tanstack/react-table";

// test
import { useSetAtom } from "jotai";
import { subRowContentsAtom } from "./atom/subRowContentsAtom";

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

function App() {
  const setSubRowContents = useSetAtom(subRowContentsAtom);

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
        const handleClickCell = () => {
          if (!row.getIsExpanded()) {
            row.toggleExpanded();
          }

          const subRowContent = {
            no: row.original.No,
            name: row.original.firstName,
            add: row.original.add,
          };

          addSubRowContent(row, subRowContent);
        };

        return <div onClick={handleClickCell}>test</div>;
      },
    },
  ];

  const addSubRowContent = <T,>(row: Row<T>, subRowContent: object) => {
    setSubRowContents((prevState) => {
      const prevSubRowData = prevState[row.index];
      const newState = [...prevState]; // 새로운 상태를 복사하여 생성

      if (prevSubRowData) {
        const newSubRowData = [...prevSubRowData, subRowContent];
        newState[row.index] = newSubRowData;
      } else {
        newState[row.index] = [subRowContent];
      }

      return newState;
    });
  };

  const { table, totalPageNum, pagination, setPagination } = useTable<Example>({
    data,
    columns,
    isPagination: true,
  });

  return (
    <>
      <TableProvider SubRowComponent={AddSubRow} useParentRowUi={true}>
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
