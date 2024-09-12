import { useRef } from "react";
import { useTableContext } from "../../provider/TableProvider";
import { Row } from "@tanstack/react-table";

interface SubRowContentType {
  id: string | number;
}

const TableSubRow = <T,>({ row }: { row: Row<T> }) => {
  const subTableId = useRef(0);
  const { subRowContent, SubRowComponent } = useTableContext();

  if (SubRowComponent) {
    return (
      <>
        {subRowContent.map((content) => {
          const typedContent = content as SubRowContentType;

          if (typedContent.id === row.id) {
            subTableId.current += 1;
            return (
              <SubRowComponent
                key={subTableId.current}
                content={typedContent}
              />
            );
          }
        })}
      </>
    );
  }
};

export default TableSubRow;
