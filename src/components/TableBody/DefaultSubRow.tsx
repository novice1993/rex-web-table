import { Table } from "@mantine/core";
import { useRef } from "react";

const DefaultSubRow = ({
  contents,
  subRowClickEvent,
}: {
  contents: Array<object>;
  subRowClickEvent: (e: React.MouseEvent<HTMLTableRowElement>) => void;
}) => {
  const key = useRef(0);

  return contents.map((content) => {
    const values = Object.values(content as object);
    key.current += 1;

    return (
      <Table.Tr key={key.current} onClick={subRowClickEvent}>
        {values.map((value) => {
          return <Table.Td key={value}>{value}</Table.Td>;
        })}
      </Table.Tr>
    );
  });
};

export default DefaultSubRow;
