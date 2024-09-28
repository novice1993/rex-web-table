import { ReactNode } from "react";

const DefaultTableContainer = ({ children }: { children: ReactNode }) => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed",
      }}
    >
      {children}
    </table>
  );
};

export default DefaultTableContainer;
