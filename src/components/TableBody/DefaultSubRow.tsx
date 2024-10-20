import { CSSProperties, useRef } from "react";
import { useTableContext } from "../../provider/TableProvider";
import {
  setClickedRowContent,
  setClickedCellContent,
} from "../../util/content.util";

import "./style.css";

interface DefaultSubRowProps {
  contents: Array<object>;
  style?: CSSProperties;

  subRowStyles?: {
    style?: CSSProperties;
    hoverColor?: string;
  };
}

const DefaultSubRow = (props: DefaultSubRowProps) => {
  const { contents, style, subRowStyles } = props;

  const key = useRef(0);
  const { subRowClickEvent, subRowCellClickEvent, borderLeftNone } =
    useTableContext();

  const handleClickSubRow = (
    rowIndex: number,
    e: React.MouseEvent<HTMLTableRowElement>,
    content: object
  ) => {
    setClickedRowContent(content);

    if (subRowClickEvent) {
      subRowClickEvent({ rowIndex, e });
    }
  };

  const handleClickSubRowCell = (
    e: React.MouseEvent<HTMLTableCellElement>,
    cellIndex: number,
    rowIndex: number
  ) => {
    if (subRowCellClickEvent) {
      subRowCellClickEvent({ cellIndex, rowIndex, e });
    }
  };

  return contents.map((content, rowIndex) => {
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
        onClick={(e) => handleClickSubRow(rowIndex, e, content)}
      >
        {values.map((value, cellIndex) => {
          return (
            <td
              key={value}
              style={{
                ...style,
                ...subRowStyles?.style,
                backgroundColor: undefined,
                height: "36px",
                borderLeft: borderLeftNone ? "none" : style?.border,
              }}
              onClick={(e) => {
                setClickedCellContent(value);
                handleClickSubRowCell(e, cellIndex, rowIndex);
              }}
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
