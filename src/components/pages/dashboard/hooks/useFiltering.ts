import { useState } from "react";

const useFiltering = (filter: string = "") => {
  const [globalFilter, setGlobalFilter] = useState(filter);

  return {
    globalFilter,
    onGlobalFilterChange: setGlobalFilter,
  };
};

export { useFiltering };
