import { Table } from "@mantine/core";
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
    index: number
  ) => {
    if (subRowCellClickEvent) {
      subRowCellClickEvent({ cellIndex: index, rowIndex, e });
    }
  };

  return contents.map((content) => {
    const values = Object.values(content as object);
    key.current += 1;

    return (
      <Table.Tr key={key.current} onClick={handleClickSubRow}>
        {values.map((value, index) => {
          return (
            <Table.Td
              key={value}
              onClick={(e) => handleClickSubRowCell(e, index)}
            >
              {value}
            </Table.Td>
          );
        })}
      </Table.Tr>
    );
  });
};

export default DefaultSubRow;
