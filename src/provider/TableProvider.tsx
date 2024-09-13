import {
  ComponentType,
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";
import { Table } from "@tanstack/react-table";
import DefaultTableContainer from "./DefaultTableContainer";

interface TableContextProps<T> {
  // table instance data
  table: Table<T>;

  // sub row content datat
  subRowContent?: Array<unknown>;
  setSubRowContent?: Dispatch<SetStateAction<Array<unknown>>>;

  // sub row componen
  SubRowComponent?: ({ content }: { content: unknown }) => JSX.Element;
}

interface TableProviderProps<T> {
  table: Table<T>;
  //
  TableContainer?: ComponentType<{ children: ReactNode }>;

  //
  subRowContent?: Array<unknown>;
  setSubRowContent?: Dispatch<SetStateAction<Array<unknown>>>;

  //
  SubRowComponent?: ({ content }: { content: unknown }) => JSX.Element;
}

const TableContext = createContext<TableContextProps<unknown> | null>(null);

export const TableProvider = <T,>(
  props: PropsWithChildren<TableProviderProps<T>>
) => {
  const {
    children,
    table,

    TableContainer = DefaultTableContainer,
    SubRowComponent,

    subRowContent,
    setSubRowContent,
  } = props;

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
