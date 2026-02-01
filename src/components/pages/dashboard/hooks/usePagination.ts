import { useState } from "react";

const usePagination = ({ size = 20 }: { size?: number }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: size,
  });

  const { pageSize, pageIndex } = pagination;

  return {
    onPaginationChange: setPagination,
    pagination,
    limit: pageSize,
    page: pageIndex,
  };
};

export { usePagination };
