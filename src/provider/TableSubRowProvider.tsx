import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Row, Table } from "@tanstack/react-table";

interface TableSubRowProviderProps<T> {
  subRowContent: Array<Row<T>>;
  setSubRowContent: Dispatch<SetStateAction<Array<Row<T>>>>;
  table: Table<T>;
}

const TableSubRowContext =
  createContext<TableSubRowProviderProps<unknown> | null>(null);

export const TableSubRowProvider = <T,>({
  children,
  table,
}: {
  children: ReactNode;
  table: Table<T>;
}) => {
  const [subRowContent, setSubRowContent] = useState<Array<Row<unknown>>>([]);

  return (
    <TableSubRowContext.Provider
      value={{
        subRowContent,
        setSubRowContent,
        table: table as Table<unknown>,
      }}
    >
      {children}
    </TableSubRowContext.Provider>
  );
};

export const useTableSubRowContext = <T,>() => {
  const context = useContext(TableSubRowContext);

  if (!context) {
    throw new Error(
      "useTableSubRowContext must be used within a TableSubRowProvider"
    );
  }

  return context as TableSubRowProviderProps<T>;
};
