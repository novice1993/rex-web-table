import { Cell } from "@tanstack/react-table";

export type CellClickEventType<T> = ({
  cell,
}: {
  cell?: Cell<T, unknown>;
}) => void;

interface TableCellUtilProps<T> {
  cell: Cell<T, unknown>;
  onCellClick?: CellClickEventType<T>;
}

export const useGetTableCellUtil = <T>({
  cell,
  onCellClick,
}: TableCellUtilProps<T>) => {
  const handleClickTableCell = (e: React.MouseEvent<HTMLTableCellElement>) => {
    if (onCellClick) {
      e.stopPropagation();

      onCellClick({ cell });
    }
  };

  return { handleClickTableCell };
};
