import {
  ComponentType,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Table } from "@tanstack/react-table";
import DefaultTableContainer from "./DefaultTableContainer";

interface TableContextProps<T> {
  subRowContent: Array<unknown>;
  setSubRowContent: Dispatch<SetStateAction<Array<unknown>>>;
  table: Table<T>;
  SubRowComponent: ({
    subRowContent,
  }: {
    subRowContent: unknown;
  }) => JSX.Element;
}

interface TableProviderProps<T> {
  children: ReactNode;
  table: Table<T>;
  TableContainer?: ComponentType<{ children: ReactNode }>;
  SubRowComponent: ({
    subRowContent,
  }: {
    subRowContent: unknown;
  }) => JSX.Element;
}

const TableContext = createContext<TableContextProps<unknown> | null>(null);

export const TableProvider = <T,>(props: TableProviderProps<T>) => {
  const {
    children,
    table,
    TableContainer = DefaultTableContainer,
    SubRowComponent,
  } = props;

  const [subRowContent, setSubRowContent] = useState<Array<unknown>>([]);

  return (
    <TableContext.Provider
      value={{
        subRowContent,
        setSubRowContent,
        table: table as Table<unknown>,
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
