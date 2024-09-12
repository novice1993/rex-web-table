import {
  ComponentType,
  createContext,
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";
import { Cell, Table } from "@tanstack/react-table";
import DefaultTableContainer from "./DefaultTableContainer";

import { getCellValue } from "../util/body.util";

interface TableContextProps<T> {
  // table instance data
  table: Table<T>;

  // sub row content data & component
  subRowContent?: Array<unknown>;
  setSubRowContent?: Dispatch<SetStateAction<Array<unknown>>>;
  SubRowComponent?: ({ content }: { content: unknown }) => JSX.Element;

  // function to custom cell value
  setCellValue?: (cell: Cell<T, unknown>) => ReactNode;

  // event handler when click table cell
  onCellClick?: ({
    cell,
    event,
  }: {
    cell?: Cell<T, unknown>;
    event?: MouseEvent<HTMLTableCellElement>;
  }) => void;
}

interface TableProviderProps<T> {
  children: ReactNode;
  //
  table: Table<T>;

  //
  TableContainer?: ComponentType<{ children: ReactNode }>;

  //
  subRowContent?: Array<unknown>;
  setSubRowContent?: Dispatch<SetStateAction<Array<unknown>>>;
  SubRowComponent?: ({ content }: { content: unknown }) => JSX.Element;

  //
  setCellValue?: (cell: Cell<T, unknown>) => ReactNode;

  // event handler when click table cell
  onCellClick?: ({
    cell,
  }: {
    cell?: Cell<T, unknown>;
    event?: MouseEvent<HTMLTableCellElement>;
  }) => void;
}

const TableContext = createContext<TableContextProps<unknown> | null>(null);

export const TableProvider = <T,>(props: TableProviderProps<T>) => {
  const {
    children,
    table,

    TableContainer = DefaultTableContainer,
    SubRowComponent,

    setCellValue = getCellValue,
    onCellClick,

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

        //
        setCellValue: setCellValue as (
          cell: Cell<unknown, unknown>
        ) => ReactNode,

        //
        onCellClick: onCellClick as ({
          cell,
        }: {
          cell?: Cell<unknown, unknown>;
        }) => void,
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
