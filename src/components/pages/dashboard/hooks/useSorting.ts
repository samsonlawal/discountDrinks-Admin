import { useState } from 'react';

const useSorting = (defaultField = 'id', sortOrder = 'asc') => {
   const [sorting, setSorting] = useState([{ id: defaultField, desc: sortOrder === 'desc' }]);

   return {
      sorting,
      onSortingChange: setSorting,
      sortOrder: !sorting.length ? sortOrder : sorting[0].desc ? 'desc' : 'asc',
      field: sorting.length ? sorting[0].id : defaultField,
   };
};

export { useSorting };
