import { Table } from "@mantine/core";
import { TableProps } from "../type/type";
import { Header } from "@tanstack/react-table";
import { ReactNode } from "react";

interface HeaderObjectType<T> {
  depth: number;
  headers: Header<T, unknown>[]; // 정확한 타입을 지정합니다.
}

const groupByDepthAndSort = <T,>(
  array: Header<T, unknown>[]
): HeaderObjectType<T>[] => {
  // Step 1: depth에 따라 그룹화
  const grouped = array.reduce<HeaderObjectType<T>[]>((acc, obj) => {
    const existingGroup = acc.find((group) => group.depth === obj.depth);

    if (existingGroup) {
      existingGroup.headers.push(obj);
    } else {
      acc.push({
        depth: obj.depth,
        headers: [obj],
      });
    }

    return acc;
  }, []);

  // Step 2: 각 그룹 내에서 index를 기준으로 정렬
  grouped.forEach((group) => {
    group.headers.sort((a, b) => a.index - b.index);
  });

  return grouped;
};

const TableHeader = <T,>({ table, headerOptionType }: TableProps<T>) => {
  const getHeader = () => {
    let result;

    const tableHeaderData = table.getHeaderGroups();

    // 1) 일단 배열 정리
    result = tableHeaderData.flatMap((headerGroup) => {
      return headerGroup.headers;
    });

    // 2) isPlaceHolder (가짜 ui) 제거
    result = result.filter((headers) => {
      return headers.isPlaceholder !== true;
    });

    // 3) header option 적용 (layer, rowSpan, colSpan)
    result = result.map((headers) => {
      const accessorKey = headers.column.id;

      headerOptionType?.forEach((option) => {
        if (option.accessorKey === accessorKey) {
          console.log("yes", accessorKey);

          headers.depth = option.layer;
          headers.colSpan = option.colSpan;
          headers.rowSpan = option.rowSpan;
        }
      });

      return headers;
    });

    // 4) make header group
    result = groupByDepthAndSort(result);

    return result;
  };

  getHeader();

  return (
    <Table.Thead>
      {getHeader().map((headerGroup) => (
        <Table.Tr key={headerGroup.depth}>
          {headerGroup.headers.map((header) => (
            <Table.Th
              key={header.id}
              colSpan={header.colSpan}
              rowSpan={header.rowSpan}
              style={{
                textAlign: "center",
              }}
            >
              {header.column.columnDef.header as ReactNode}
            </Table.Th>
          ))}
        </Table.Tr>
      ))}
    </Table.Thead>
  );
};

export default TableHeader;
