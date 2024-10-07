import { CSSProperties, useRef } from "react";
import { useTableContext } from "../../provider/TableProvider";
import "./style.css";

interface DefaultSubRowProps {
  rowIndex: number;
  contents: Array<object>;
  style?: CSSProperties;
  className?: string;
  subRowStyle?: CSSProperties;
  subRowClassName?: string;
  subRowHoverColor?: string;
}

const DefaultSubRow = (props: DefaultSubRowProps) => {
  const {
    rowIndex,
    contents,
    style,
    className,
    subRowStyle,
    subRowClassName,
    subRowHoverColor,
  } = props;
  const key = useRef(0);
  const { subRowClickEvent, subRowCellClickEvent } = useTableContext();

  const handleClickSubRow = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (subRowClickEvent) {
      e.stopPropagation();
      subRowClickEvent();
    }
  };

  const handleClickSubRowCell = (
    e: React.MouseEvent<HTMLTableCellElement>,
    cellIndex: number,
    rowIndex: number,
    itemIndex: number
  ) => {
    if (subRowCellClickEvent) {
      subRowCellClickEvent({ cellIndex, rowIndex, itemIndex, e });
    }
  };

  return contents.map((content, itemIndex) => {
    const values = Object.values(content as object);
    key.current += 1;

    return (
      <tr
        key={key.current}
        className="subRow"
        style={
          {
            cursor: "default",
            backgroundColor: subRowStyle?.backgroundColor
              ? subRowStyle.backgroundColor
              : style?.backgroundColor,
            "--subRow-hover-color": `${subRowHoverColor}`,
          } as CSSProperties
        }
        onClick={handleClickSubRow}
      >
        {values.map((value, cellIndex) => {
          return (
            <td
              key={value}
              style={{
                ...style,
                ...subRowStyle,
                backgroundColor: "transparent",
              }}
              className={subRowClassName ? subRowClassName : className}
              onClick={(e) =>
                handleClickSubRowCell(e, cellIndex, rowIndex, itemIndex)
              }
            >
              {value}
            </td>
          );
        })}
      </tr>
    );
  });
};

export default DefaultSubRow;
