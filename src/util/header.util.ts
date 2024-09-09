import { Header } from "@tanstack/react-table";
import { SortDirection } from "@tanstack/react-table";
import { TableProps } from "../type/type";

export interface HeaderDataType<T> {
  depth: number;
  headers: Header<T, unknown>[];
}

const groupByDepthAndSort = <T>(
  array: Header<T, unknown>[]
): HeaderDataType<T>[] => {
  // Step 1: depth에 따라 그룹화
  const grouped = array.reduce<HeaderDataType<T>[]>((acc, obj) => {
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

export const getHeader = <T>({ table, headerOptionType }: TableProps<T>) => {
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

// Sorting 관련
enum SortingType {
  ASCENDING_ORDER = "asc", // 오름차순
  DESCENDING_ORDER = "desc", // 내림차순
}

enum SortingDirectionUi {
  ASCENDING_UI = "▲",
  DESCENDING_UI = "▼",
}

export const handleClickHeaderForSorting = <T>(header: Header<T, unknown>) => {
  const sortingType = header.column.getIsSorted();

  // 오름차순
  if (sortingType === SortingType.DESCENDING_ORDER) {
    return header.column.toggleSorting(false);
  }

  // 내림차순
  if (sortingType === SortingType.ASCENDING_ORDER) {
    return header.column.toggleSorting(true);
  }
};

export const getSortingDirectionUi = (sortingType: SortDirection | false) => {
  if (sortingType === SortingType.ASCENDING_ORDER) {
    return SortingDirectionUi.ASCENDING_UI;
  } else if (sortingType === SortingType.DESCENDING_ORDER) {
    return SortingDirectionUi.DESCENDING_UI;
  }
};
