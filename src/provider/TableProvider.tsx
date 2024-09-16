import {
  ComponentType,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
} from "react";
import DefaultTableContainer from "../components/TableContainer/DefaultTableContainer";

interface TableContextProps {
  SubRowComponent?: ComponentType<{ contents: Array<object> }>;
  useParentRowUi?: boolean;
}

interface TableProviderProps {
  TableContainer?: ComponentType<{ children: ReactNode }>;
  SubRowComponent?: ComponentType<{ contents: Array<object> }>;
  useParentRowUi?: boolean;
}

const TableContext = createContext<TableContextProps | null>(null);

export const TableProvider = (props: PropsWithChildren<TableProviderProps>) => {
  const {
    TableContainer = DefaultTableContainer,
    SubRowComponent,
    useParentRowUi,
  } = props;

  return (
    <TableContext.Provider value={{ SubRowComponent, useParentRowUi }}>
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
