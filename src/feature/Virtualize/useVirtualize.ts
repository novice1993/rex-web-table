import { useRef } from "react";
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";

const useVirtualize = ({ tableData }: { tableData: unknown[] }) => {
  const virtualizeRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    count: tableData.length,
    getScrollElement: () => virtualizeRef.current,
    estimateSize: () => 30,
  });

  const virtuallizeHeight = virtualizer.getTotalSize();
  const virtualizeItems = virtualizer.getVirtualItems();

  const getVirtualizeOffset = (virtualizeItems: VirtualItem[]) => {
    return virtualizeItems[0]?.start || 0;
  };

  return {
    virtualizeRef,
    virtualizeItems,
    virtuallizeHeight,
    getVirtualizeOffset,
  };
};

export default useVirtualize;
