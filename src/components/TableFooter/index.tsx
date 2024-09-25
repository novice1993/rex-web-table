import {
  TablePageSizeSelect,
  TablePageSizeSelectProps,
} from "./TablePageSizeSelect";
import { TablePagination, TablePaginationProps } from "./TablePagination";

type TableFooterProps = TablePaginationProps & TablePageSizeSelectProps;

const TableFooter = (props: TableFooterProps) => {
  const { pageSizeList, totalPageNum, pagination, setPagination } = props;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <TablePageSizeSelect
        pageSizeList={pageSizeList}
        pagination={pagination}
        setPagination={setPagination}
      />
      <TablePagination
        totalPageNum={totalPageNum}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};
export default TableFooter;
