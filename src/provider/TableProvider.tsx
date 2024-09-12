import {
  ComponentType,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Cell, Table } from "@tanstack/react-table";
import DefaultTableContainer from "./DefaultTableContainer";

import { getCellValue } from "../util/body.util";

interface TableContextProps<T> {
  // table instance data
  table: Table<T>;

  // sub row content data
  subRowContent: Array<unknown>;
  setSubRowContent: Dispatch<SetStateAction<Array<unknown>>>;

  // sub row component
  SubRowComponent?: ({ content }: { content: unknown }) => JSX.Element;

  // function to custom cell value
  setCellValue?: (cell: Cell<T, unknown>) => ReactNode;
}

interface TableProviderProps<T> {
  children: ReactNode;
  //
  table: Table<T>;

  //
  TableContainer?: ComponentType<{ children: ReactNode }>;
  SubRowComponent?: ({ content }: { content: unknown }) => JSX.Element;

  //
  setCellValue?: (cell: Cell<T, unknown>) => ReactNode;
}

const TableContext = createContext<TableContextProps<unknown> | null>(null);

export const TableProvider = <T,>(props: TableProviderProps<T>) => {
  const {
    children,
    table,

    TableContainer = DefaultTableContainer,
    SubRowComponent,

    setCellValue = getCellValue,
  } = props;

  const [subRowContent, setSubRowContent] = useState<Array<unknown>>([]);

  return (
    <TableContext.Provider
      value={{
        //
        table: table as Table<unknown>,

        //
        subRowContent,
        setSubRowContent,

        //
        SubRowComponent,

        //
        setCellValue: setCellValue as (
          cell: Cell<unknown, unknown>
        ) => ReactNode,
      }}
    >
      <TableContainer>{children}</TableContainer>
    </TableContext.Provider>
  );
};

export const useTableContext = <T,>() => {
  const context = useContext(TableContext);

  if (!context) {
    console.error("useTableContext  must be used within a TableProvider");
  }

  return context as TableContextProps<T>;
};
