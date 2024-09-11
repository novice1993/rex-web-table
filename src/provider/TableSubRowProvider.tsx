import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Cell } from "@tanstack/react-table";

interface TableSubRowProviderProps<T> {
  subRowContent: Array<Cell<T, unknown>>;
  setSubRowContent: Dispatch<SetStateAction<Array<Cell<T, unknown>>>>;
}

const TableSubRowContext =
  createContext<TableSubRowProviderProps<unknown> | null>(null);

export const TableSubRowProvider = ({ children }: { children: ReactNode }) => {
  const [subRowContent, setSubRowContent] = useState<
    Array<Cell<unknown, unknown>>
  >([]);

  return (
    <TableSubRowContext.Provider value={{ subRowContent, setSubRowContent }}>
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
