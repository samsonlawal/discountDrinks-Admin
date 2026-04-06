'use client';

import { type ReactNode } from 'react';
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination';

export interface ICustomPaginationProps {
   fetchedCount: number;
   totalCount: number;
   pageSize: number;
   page: number;
   onChangePage: (value: number) => void;
}

function CustomPagination({
   fetchedCount,
   pageSize = 10,
   totalCount = 0,
   page = 1,
   onChangePage,
}: ICustomPaginationProps) {
   const totalPageCount = Math.ceil(totalCount / pageSize);
   const buildLink = (newPage?: any) => {
      onChangePage(newPage);
   };

   const renderPageNumbers = () => {
      const items: ReactNode[] = [];
      const maxVisiblePages = 5;

      if (totalPageCount <= maxVisiblePages) {
         for (let i = 1; i <= totalPageCount; i++) {
            items.push(
               <PaginationItem key={i}>
                  <PaginationLink className="cursor-pointer" onClick={() => buildLink(i)} isActive={page === i}>
                     {i}
                  </PaginationLink>
               </PaginationItem>,
            );
         }
      } else {
         items.push(
            <PaginationItem key={1}>
               <PaginationLink className="cursor-pointer" onClick={() => buildLink(1)} isActive={page === 1}>
                  1
               </PaginationLink>
            </PaginationItem>,
         );

         if (page > 3) {
            items.push(
               <PaginationItem key="ellipsis-start">
                  <PaginationEllipsis />
               </PaginationItem>,
            );
         }

         const start = Math.max(2, page - 1);
         const end = Math.min(totalPageCount - 1, page + 1);

         for (let i = start; i <= end; i++) {
            items.push(
               <PaginationItem key={i}>
                  <PaginationLink className="cursor-pointer" onClick={() => buildLink(i)} isActive={page === i}>
                     {i}
                  </PaginationLink>
               </PaginationItem>,
            );
         }

         if (page < totalPageCount - 2) {
            items.push(
               <PaginationItem key="ellipsis-end">
                  <PaginationEllipsis />
               </PaginationItem>,
            );
         }

         items.push(
            <PaginationItem key={totalPageCount}>
               <PaginationLink
                  className="cursor-pointer"
                  onClick={() => buildLink(totalPageCount)}
                  isActive={page === totalPageCount}
               >
                  {totalPageCount}
               </PaginationLink>
            </PaginationItem>,
         );
      }

      return items;
   };

   const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
   const end = Math.min(page * pageSize, totalCount);

   return (
      <div className="flex flex-col md:flex-row items-center gap-3 w-full justify-between py-3 border-t border-gray-100 px-5">
         <div className="flex-1 text-gray-600 text-sm font-normal">
            Showing <span className="font-normal">{start}</span> - <span className="font-normal">{end}</span> of <span className="font-normal">{totalCount}</span> results
         </div>
         <Pagination className="flex md:justify-end justify-center flex-2">
            <PaginationContent className="gap-1">
               <PaginationItem className="cursor-pointer">
                  <PaginationPrevious
                     onClick={() => buildLink(Math.max(page - 1, 1))}
                     aria-disabled={page === 1}
                     tabIndex={page === 1 ? -1 : undefined}
                     className={page === 1 ? 'pointer-events-none opacity-50' : undefined}
                  />
               </PaginationItem>
               {renderPageNumbers()}
               <PaginationItem className="cursor-pointer">
                  <PaginationNext
                     onClick={() => buildLink(Math.min(page + 1, totalPageCount))}
                     aria-disabled={page === totalPageCount}
                     tabIndex={page === totalPageCount ? -1 : undefined}
                     className={page === totalPageCount ? 'pointer-events-none opacity-50 ' : undefined}
                  />
               </PaginationItem>
            </PaginationContent>
         </Pagination>
      </div>
   );
}
export default CustomPagination;
