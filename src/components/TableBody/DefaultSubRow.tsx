import { CSSProperties, useRef } from "react";
import { useTableContext } from "../../provider/TableProvider";
import "./style.css";

interface DefaultSubRowProps {
  rowIndex: number;
  contents: Array<object>;
  style?: CSSProperties;

  subRowStyles?: {
    style?: CSSProperties;
    hoverColor?: string;
  };
}

const DefaultSubRow = (props: DefaultSubRowProps) => {
  const { rowIndex, contents, style, subRowStyles } = props;

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
            backgroundColor: subRowStyles?.style?.backgroundColor
              ? subRowStyles?.style?.backgroundColor
              : style?.backgroundColor,
            "--subRow-hover-color": `${subRowStyles?.hoverColor}`,
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
                ...subRowStyles?.style,
                backgroundColor: undefined,
              }}
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
