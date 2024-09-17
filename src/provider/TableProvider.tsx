import {
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
}

interface TableProviderProps {
  TableContainer?: ComponentType<{ children: ReactNode }>;
  SubRowComponent?: ComponentType<{ contents: Array<object> }>;
  useParentRowUi?: boolean;
  rowClickEvent?: (row: Row<unknown>) => void;
  subRowClickEvent?: () => void;
}

const TableContext = createContext<TableContextProps | null>(null);

export const TableProvider = (props: PropsWithChildren<TableProviderProps>) => {
  const {
    TableContainer = DefaultTableContainer,
    SubRowComponent,
    useParentRowUi,
    rowClickEvent,
    subRowClickEvent,
  } = props;

  return (
    <TableContext.Provider
      value={{
        SubRowComponent,
        useParentRowUi,
        rowClickEvent,
        subRowClickEvent,
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
