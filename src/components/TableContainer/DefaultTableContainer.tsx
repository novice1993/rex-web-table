import { ReactNode } from "react";
import { Table } from "@mantine/core";

const DefaultTableContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Table withTableBorder withColumnBorders withRowBorders stickyHeader highlightOnHover>
      {children}
    </Table>
  );
};

export default DefaultTableContainer;
