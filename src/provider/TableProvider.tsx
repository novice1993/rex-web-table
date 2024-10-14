import {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import TableContainer from "../components/TableContainer/TableContainer";
import { RowClickEventParam, CellClickEventParam } from "../type/type";

interface TableProviderProps {
  SubRowComponent?: ComponentType<{ contents: Array<object> }>;
  subRowContents?: Array<object[]>;
  useParentRowUi?: boolean;
  rowClickEvent?: ({ rowIndex, e }: RowClickEventParam) => void;
  cellClickEvent?: ({ cellIndex, rowIndex, e }: CellClickEventParam) => void;
  subRowClickEvent?: ({ rowIndex, e }: RowClickEventParam) => void;
  subRowCellClickEvent?: ({
    cellIndex,
    rowIndex,
    e,
  }: CellClickEventParam) => void;
  borderLeftNone?: boolean;
  borderTopNone?: boolean;
}

const TableContext = createContext<TableProviderProps | null>(null);

export const TableProvider = (props: PropsWithChildren<TableProviderProps>) => {
  const {
    SubRowComponent,
    subRowContents,
    useParentRowUi,
    rowClickEvent,
    cellClickEvent,
    subRowClickEvent,
    subRowCellClickEvent,
    borderLeftNone,
    borderTopNone,
  } = props;

  return (
    <TableContext.Provider
      value={{
        SubRowComponent,
        subRowContents,
        useParentRowUi,
        rowClickEvent,
        cellClickEvent,
        subRowClickEvent,
        subRowCellClickEvent,
        borderLeftNone,
        borderTopNone,
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
