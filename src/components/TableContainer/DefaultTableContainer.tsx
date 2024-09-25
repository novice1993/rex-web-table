import { ReactNode } from "react";

const DefaultTableContainer = ({ children }: { children: ReactNode }) => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse", // 테두리 중복 방지
        tableLayout: "fixed", // 열 크기를 고정
      }}
    >
      {children}
    </table>
  );
};

export default DefaultTableContainer;
