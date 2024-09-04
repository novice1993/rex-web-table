import { useCallback } from "react";
import { Header } from "@tanstack/react-table";
import { TableProps } from "../type/type";

const TableHeader = <T,>({ table }: TableProps<T>) => {
  const tableHeaderData = table.getHeaderGroups();

  // header content에 할당할 수 있는 데이터
  // 1. 정적인 데이터 (string type 등)
  // 2. 동적인 데이터 (함수를 부여하여 hedaer content를 동적으로 제어할 수 있음)
  const getHeaderContent = useCallback(<T,>(header: Header<T, unknown>) => {
    const headerContent = header.column.columnDef.header;

    if (typeof headerContent === "function") {
      return headerContent(header.getContext());
    } else {
      return headerContent;
    }
  }, []);

  return (
    <thead>
      {tableHeaderData.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id}>
              {header.isPlaceholder ? null : getHeaderContent(header)}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
