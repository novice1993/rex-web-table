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

  // border가 있으면 제거한 새로운 스타일 객체 생성
  const { border, ...restStyle } = style || {};

  // border 속성을 개별적으로 나눔 (오버라이딩 방지)
  const borderTop = style?.borderTop || border;
  const borderRight = style?.borderRight || border;
  const borderBottom = style?.borderBottom || border;
  const borderLeft = borderLeftNone ? "none" : style?.borderLeft || border;

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
              : restStyle?.backgroundColor,
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
                ...restStyle,
                ...subRowStyles?.style,
                backgroundColor: undefined,
                height: "36px",
                borderTop, // borderTop 설정
                borderRight, // borderRight 설정
                borderBottom, // borderBottom 설정
                borderLeft, // borderLeft는 조건에 따라 설정
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
