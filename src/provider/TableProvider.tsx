import React, {
  ComponentType,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
} from "react";
import DefaultTableContainer from "../components/TableContainer/DefaultTableContainer";
import { Row } from "@tanstack/react-table";

interface TableContextProps {
  SubRowComponent?: ComponentType<{ contents: Array<object> }>;
  useParentRowUi?: boolean;
  rowClickEvent?: (row: Row<unknown>) => void;
  subRowClickEvent?: () => void;
  subRowCellClickEvent?: ({
    cellIndex,
    rowIndex,
    itemIndex,
    e,
  }: {
    cellIndex: number;
    rowIndex?: number;
    itemIndex?: number;
    e?: React.MouseEvent<HTMLTableCellElement>;
  }) => void;
}

interface TableProviderProps {
  TableContainer?: ComponentType<{ children: ReactNode }>;
  SubRowComponent?: ComponentType<{ contents: Array<object> }>;
  useParentRowUi?: boolean;
  rowClickEvent?: (row: Row<unknown>) => void;
  subRowClickEvent?: () => void;
  subRowCellClickEvent?: ({
    cellIndex,
    rowIndex,
    e,
  }: {
    cellIndex: number;
    rowIndex?: number;
    e?: React.MouseEvent<HTMLTableCellElement>;
  }) => void;
}

const TableContext = createContext<TableContextProps | null>(null);

export const TableProvider = (props: PropsWithChildren<TableProviderProps>) => {
  const {
    TableContainer = DefaultTableContainer,
    SubRowComponent,
    useParentRowUi,
    rowClickEvent,
    subRowClickEvent,
    subRowCellClickEvent,
  } = props;

  return (
    <TableContext.Provider
      value={{
        SubRowComponent,
        useParentRowUi,
        rowClickEvent,
        subRowClickEvent,
        subRowCellClickEvent,
      }}
    >
      <TableContainer>{props.children}</TableContainer>
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);

  if (!context) {
    console.error("useTableContext  must be used within a TableProvider");
  }

  return context as TableContextProps;
};
