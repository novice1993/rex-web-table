import { ReactNode } from 'react';

const TableContainer = ({ children }: { children: ReactNode }) => {
  return (
    <table
      style={{
        width: '100%',
        height: 'fit-content',
        borderCollapse: 'collapse',
        tableLayout: 'fixed'
      }}
    >
      {children}
    </table>
  );
};

export default TableContainer;
