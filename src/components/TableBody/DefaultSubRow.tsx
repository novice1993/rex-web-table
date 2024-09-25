import { useRef } from "react";
import { useTableContext } from "../../provider/TableProvider";

const DefaultSubRow = ({
  rowIndex,
  contents,
}: {
  rowIndex: number;
  contents: Array<object>;
}) => {
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
      <tr key={key.current} onClick={handleClickSubRow}>
        {values.map((value, cellIndex) => {
          return (
            <td
              key={value}
              onClick={(e) =>
                handleClickSubRowCell(e, cellIndex, rowIndex, itemIndex)
              }
              style={{ padding: "8px", border: "1px solid #ddd" }}
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
