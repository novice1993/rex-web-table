import { ComponentType, createContext, PropsWithChildren, ReactNode, useContext } from "react";
import DefaultTableContainer from "../components/TableContainer/DefaultTableContainer";

interface TableContextProps {
  SubRowComponent?: () => JSX.Element;
}

interface TableProviderProps {
  TableContainer?: ComponentType<{ children: ReactNode }>;
  SubRowComponent?: () => JSX.Element;
}

const TableContext = createContext<TableContextProps | null>(null);

export const TableProvider = (props: PropsWithChildren<TableProviderProps>) => {
  const { TableContainer = DefaultTableContainer, SubRowComponent } = props;

  return (
    <TableContext.Provider
      value={{
        SubRowComponent,
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
