import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface TableSubRowProviderProps {
  subRowContent: Array<object>;
  setSubRowContent: Dispatch<SetStateAction<Array<object>>>;
}

const TableSubRowContext = createContext({} as TableSubRowProviderProps);

export const TableSubRowProvider = ({ children }: { children: ReactNode }) => {
  const [subRowContent, setSubRowContent] = useState<Array<object>>([]);

  return (
    <TableSubRowContext.Provider value={{ subRowContent, setSubRowContent }}>
      {children}
    </TableSubRowContext.Provider>
  );
};

export const useTableSubRowContext = () => {
  const context = useContext(TableSubRowContext);
  return context;
};
