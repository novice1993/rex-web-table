import { useTableContext } from "../../provider/TableProvider";

const TableSubRow = () => {
  const { SubRowComponent } = useTableContext();

  if (SubRowComponent) {
    return <SubRowComponent />;
  }
};

export default TableSubRow;
