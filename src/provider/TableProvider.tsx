import {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
  MutableRefObject,
} from "react";
import TableContainer from "../components/TableContainer/TableContainer";
import { RowClickEventParam, CellClickEventParam } from "../type/type";

interface ContextValueType {
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

// 2. 가상화 활성화시 필요한 props 정의
interface VirtualizedProps {
  isVirtualized: true;
  virtualizeRef: MutableRefObject<HTMLDivElement | null>;
  virtualizeHeight: number;
  virtualizedOffset: number;
}

// 3. 가상화 비활성화시 (또는 생략시) 정의
interface NonVirtualizedProps {
  isVirtualized?: false;
}

type TableProviderProps = ContextValueType &
  (VirtualizedProps | NonVirtualizedProps);

const TableContext = createContext<ContextValueType | null>(null);

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

    isVirtualized,
  } = props;

  if (isVirtualized) {
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
          ref={props.virtualizeRef}
          style={{ width: "100%", height: "100%", overflow: "auto" }}
        >
          <div
            className="spacer-container"
            style={{
              position: "relative",
              width: "100%",
              height: props.virtualizeHeight,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${props.virtualizedOffset}px)`,
              }}
            >
              <TableContainer>{props.children}</TableContainer>
            </div>
          </div>
        </div>
      </TableContext.Provider>
    );
  }

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

  return context as ContextValueType;
};

export default TableProvider;
