import {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
  MutableRefObject,
} from "react";
import TableContainer from "../../components/TableContainer/TableContainer";
import { RowClickEventParam, CellClickEventParam } from "../../type/type";

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

interface VirtualTableProviderProps extends TableProviderProps {
  virtualizeRef: MutableRefObject<HTMLDivElement | null>;
  virtualizeHeight: number;
  virtualizedOffset: number;
}

const TableContext = createContext<TableProviderProps | null>(null);

export const VirtaulTableProvider = (
  props: PropsWithChildren<VirtualTableProviderProps>
) => {
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

    virtualizeRef,
    virtualizeHeight,
    virtualizedOffset,
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
      <div
        className="virtualize-container"
        ref={virtualizeRef}
        style={{ width: "100%", height: "100%", overflow: "auto" }}
      >
        <div
          className="spacer-container"
          style={{
            position: "relative",
            width: "100%",
            height: virtualizeHeight,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualizedOffset}px)`,
            }}
          >
            <TableContainer>{props.children}</TableContainer>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);

  if (!context) {
    console.error(
      "useTableContext  must be used within a VirtaulTableProvider"
    );
  }

  return context as TableProviderProps;
};

export default VirtaulTableProvider;
