import {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import TableContainer from "../components/TableContainer/TableContainer";
import { CellClickEventParam } from "../type/type";

interface TableProviderProps {
  SubRowComponent?: ComponentType<{ contents: Array<object> }>;
  useParentRowUi?: boolean;
  rowClickEvent?: () => void;
  cellClickEvent?: ({ cellIndex, rowIndex, e }: CellClickEventParam) => void;
  subRowClickEvent?: () => void;
  subRowCellClickEvent?: ({
    cellIndex,
    rowIndex,
    e,
  }: CellClickEventParam) => void;
}

const TableContext = createContext<TableProviderProps | null>(null);

export const TableProvider = (props: PropsWithChildren<TableProviderProps>) => {
  const {
    SubRowComponent,
    useParentRowUi,
    rowClickEvent,
    cellClickEvent,
    subRowClickEvent,
    subRowCellClickEvent,
  } = props;

  return (
    <TableContext.Provider
      value={{
        SubRowComponent,
        useParentRowUi,
        rowClickEvent,
        cellClickEvent,
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

  return context as TableProviderProps;
};
