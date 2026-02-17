"use client";
import React, { useEffect } from "react";
import DashboardLayout from "@/components/layouts/dashboard";
import DataTable from "@/components/molecules/DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Tabs, { ITabItem } from "@/components/molecules/Tabs";
import { DebounceInput } from "@/components/molecules/TableFilter/TableFilterSearch/DebouceInput";
import {
  FlyOut,
  FlyOutContent,
  FlyOutItem,
  FlyOutItemLink,
  FlyOutLabel,
} from "@/components/molecules/FlyOut";
import { DeleteDialog } from "@/components/Dialogs/DialogContent/DeleteDialog";
import { AddDialog } from "@/components/Dialogs/DialogContent/AddDialog";
import RowActions from "./rowActions";
import { refresh } from "next/cache";
import AddProductDialog from "./AddProductDialog";
import EditProductDialog from "./EditProductDialog";
import { useGetProducts } from "@/hooks/api/products";

type Product = {
  _id: string;
  name: string;
  category: string;
  basePrice: number;
  availableQuantity: number;
  isActive: boolean;
};

const Search = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: any) => void;
}) => {
  return (
    <div className="relative w-fit">
      <div className="absolute left-2 top-[calc(50%-0.5rem)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.6821 11.7458C9.66576 12.5361 8.38866 13.0067 7.00167 13.0067C3.68704 13.0067 1 10.3189 1 7.00335C1 3.68779 3.68704 1 7.00167 1C10.3163 1 13.0033 3.68779 13.0033 7.00335C13.0033 8.39059 12.533 9.66794 11.743 10.6845L14.7799 13.7186C15.0731 14.0115 15.0734 14.4867 14.7806 14.7799C14.4878 15.0731 14.0128 15.0734 13.7196 14.7805L10.6821 11.7458ZM11.5029 7.00335C11.5029 9.49002 9.48765 11.5059 7.00167 11.5059C4.5157 11.5059 2.50042 9.49002 2.50042 7.00335C2.50042 4.51668 4.5157 2.50084 7.00167 2.50084C9.48765 2.50084 11.5029 4.51668 11.5029 7.00335Z"
            fill="#868FA0"
          />
        </svg>
      </div>

      <DebounceInput
        type="text"
        placeholder="Search"
        className="px-[calc(3rem-1px)] py-1.5 outline-none text-[#868FA0] focus:outline-none shadow-[0_1px_1px_0px_rgba(0,0,0,0.10),0_0_0_1px_rgba(70,79,96,0.16)] w-full md:w-70 rounded-[3px]"
        value={value}
        onChange={(value: string | number) => onChange?.(value)}
      />
      <div className="absolute right-2 top-[calc(50%-0.5rem)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <rect width="16" height="16" rx="4" fill="#E9EDF5" />
          <path
            d="M10.5 2.5H9.20215L5.5 13.5H6.79785L10.5 2.5Z"
            fill="#868FA0"
          />
        </svg>
      </div>
    </div>
  );
};

const columns = (
  handleEdit: (product: Product) => void,
  refresh: () => void,
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    id: "number",
    header: () => <span className="-ml-2">#</span>,
    cell: ({ row }) => (
      <span className="text-gray-600 -ml-2">{row.index + 1}</span>
    ),
    size: 20,
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
  },
  {
    accessorKey: "basePrice",
    header: "PRICE",
    cell: ({ row }) => `$${row.getValue("basePrice")}`,
  },
  {
    accessorKey: "availableQuantity",
    header: "STOCK",
  },
  {
    accessorKey: "isActive",
    header: "STATUS",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <span
          className={`px-2 py-0.5 rounded-md text-xs font-medium ${
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "ACTION",
    accessorKey: "actions",

    cell: ({ row }) => (
      <RowActions
        product={row.original}
        refresh={refresh}
        onEdit={handleEdit}
      />
    ),
  },
];

interface IActiveTab extends ITabItem {}

const tabsItems = (): IActiveTab[] => {
  return [
    { id: "0", title: "All" },
    { id: "1", title: "Active" },
    { id: "2", title: "Inactive" },
  ];
};

interface IQueryObject {
  search: string;
  page: number;
  activeTab: IActiveTab;
}

function ProductsPage() {
  const tabsData = tabsItems();
  const { products, fetchProducts, loading } = useGetProducts();

  const [queryObject, setqueryObject] = React.useState<IQueryObject>({
    search: "",
    page: 1,
    activeTab: tabsData[0],
  });
  const activeTab = queryObject?.activeTab;

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<
    Product | undefined
  >(undefined);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleAddDialogOpenChange = (open: boolean) => {
    setIsAddDialogOpen(open);
  };

  const handleEditDialogOpenChange = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      setTimeout(() => setSelectedProduct(undefined), 300); // Clear after animation
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search and active tab
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(queryObject.search.toLowerCase()) ||
      product.category.toLowerCase().includes(queryObject.search.toLowerCase());

    const matchesTab =
      activeTab.title === "All" ||
      (activeTab.title === "Active" && product.isActive) ||
      (activeTab.title === "Inactive" && !product.isActive);

    return matchesSearch && matchesTab;
  });

  const handleProductSaved = () => {
    fetchProducts(); // Refresh products list
  };

  return (
    <DashboardLayout leftTitle="Products">
      <div className="px-2 md:px-6 min-h-full w-full">
        <div className="bg-white w-full overflow-x-hidden">
          <div
            className={
              "mt-[20px] px-1 pt-2 pb-1 flex gap-2 justify-between items-center w-full"
            }
          >
            <div className="hidden md:block w-fit md:flex-none">
              <Search
                value={queryObject?.search}
                onChange={(value: string) =>
                  setqueryObject((x) => ({ ...x, search: value }))
                }
              />
            </div>
            <div className="w-fit">
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="px-4 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>

          <div
            className={
              "my-[10px] relative border-t-[#EAEBF0] border-t-[1px] pt-[10px]"
            }
          >
            <div className="px-[20px]">
              <Tabs
                data={tabsData}
                activeTab={activeTab}
                onChangeTab={({ item }) => {
                  setqueryObject((x) => ({ ...x, activeTab: item }));
                }}
              />
            </div>
            <div className="w-full overflow-x-auto">
              <DataTable
                columns={columns(handleEdit, fetchProducts)}
                data={filteredProducts}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Add Product Dialog */}
      {/* Full-screen Add Product Dialog */}
      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={handleAddDialogOpenChange}
        onSave={handleProductSaved}
      />

      {/* Full-screen Edit Product Dialog */}
      {selectedProduct && (
        <EditProductDialog
          open={isEditDialogOpen}
          onOpenChange={handleEditDialogOpenChange}
          product={selectedProduct}
          onSave={handleProductSaved}
        />
      )}
    </DashboardLayout>
  );
}

export default ProductsPage;
