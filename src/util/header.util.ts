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
  // Step 1: Group by depth
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

  // Step 2: Sort within each group by index
  grouped.forEach((group) => {
    group.headers.sort((a, b) => a.index - b.index);
  });

  return grouped;
};

export const getHeader = <T>({ table, headerOption }: TableProps<T>) => {
  let result;

  const tableHeaderData = table.getHeaderGroups();

  // 1) First, organize the array
  result = tableHeaderData.flatMap((headerGroup) => {
    return headerGroup.headers;
  });

  // 2) Remove placeholders (dummy UI)
  result = result.filter((headers) => {
    return headers.isPlaceholder !== true;
  });

  // 3) Apply header options (layer, rowSpan, colSpan)
  result = result.map((headers) => {
    const accessorKey = headers.column.id;

    headerOption?.forEach((option) => {
      if (option.accessorKey === accessorKey) {
        headers.depth = option.layer;
        headers.colSpan = option.colSpan;
        headers.rowSpan = option.rowSpan;
      }
    });

    return headers;
  });

  // 4) Make header group
  result = groupByDepthAndSort(result);

  return result;
};

// Sorting related
enum SortingType {
  ASCENDING_ORDER = "asc", // Ascending order
  DESCENDING_ORDER = "desc", // Descending order
}

enum SortingDirectionUi {
  ASCENDING_UI = "▲",
  DESCENDING_UI = "▼",
}

export const handleClickHeaderForSorting = <T>(header: Header<T, unknown>) => {
  const sortingType = header.column.getIsSorted();

  // Ascending order
  if (sortingType === SortingType.DESCENDING_ORDER) {
    return header.column.toggleSorting(false);
  }

  // Descending order
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
