import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Table } from "@tanstack/react-table";

interface TableSubRowProviderProps<T> {
  subRowContent: Array<unknown>;
  setSubRowContent: Dispatch<SetStateAction<Array<unknown>>>;
  table: Table<T>;
  SubRowComponent: ({
    subRowContent,
  }: {
    subRowContent: unknown;
  }) => JSX.Element;
}

const TableSubRowContext =
  createContext<TableSubRowProviderProps<unknown> | null>(null);

export const TableSubRowProvider = <T,>({
  children,
  table,
  SubRowComponent,
}: {
  children: ReactNode;
  table: Table<T>;
  SubRowComponent: ({
    subRowContent,
  }: {
    subRowContent: unknown;
  }) => JSX.Element;
}) => {
  const [subRowContent, setSubRowContent] = useState<Array<unknown>>([]);

  return (
    <TableSubRowContext.Provider
      value={{
        subRowContent,
        setSubRowContent,
        table: table as Table<unknown>,
        SubRowComponent,
      }}
    >
      {children}
    </TableSubRowContext.Provider>
  );
};

export const useTableSubRowContext = <T,>() => {
  const context = useContext(TableSubRowContext);

  if (!context) {
    console.error(
      "useTableSubRowContext must be used within a TableSubRowProvider"
    );
  }

  return context as TableSubRowProviderProps<T>;
};
