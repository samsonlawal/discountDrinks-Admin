"use client";
import React from "react";
import DashboardLayout from "@/components/layouts/dashboard";
import DataTable from "@/components/molecules/DataTable";
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

type Product = {
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
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
      <div className="absolute left-3 top-[calc(50%-0.5rem)]">
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
        className="px-[calc(3rem-1px)] py-1.5 outline-none text-[#868FA0] focus:outline-none shadow-[0_1px_1px_0px_rgba(0,0,0,0.10),0_0_0_1px_rgba(70,79,96,0.16)] w-70 rounded-[3px]"
        value={value}
        onChange={(value: string | number) => onChange?.(value)}
      />
      <div className="absolute right-6 top-[calc(50%-0.5rem)]">
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

const MoreButton = ({ id }: { id: string }) => {
  // const { onDelete, onToggleBanUser } = useUser({ Service: UserService });

  // const handleDelete = async () => await onDelete({ id });
  // const handleUseToggleBan = async () =>
  //   await onToggleBanUser({ id: `${id}/ban` });
  return (
    <div>
      <FlyOut>
        <FlyOutLabel
          label=""
          iconName="more"
          className="w-8 h-8 px-[6px] py-2 grid place-items-center rounded-lg bg-[#F6F7F9]"
        />

        <FlyOutContent className="origin-bottom-right p-2 w-[146px] h-max">
          <FlyOutItemLink
            id="menu-item-view"
            className="space-x-2 hover:bg-light-grey-2 rounded-[4px]"
            link={`/dashboard/users/${id}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 6.1875C7.4467 6.1875 6.1875 7.4467 6.1875 9C6.1875 10.5533 7.4467 11.8125 9 11.8125C10.5533 11.8125 11.8125 10.5533 11.8125 9C11.8125 7.4467 10.5533 6.1875 9 6.1875ZM7.3125 9C7.3125 8.06802 8.06802 7.3125 9 7.3125C9.93198 7.3125 10.6875 8.06802 10.6875 9C10.6875 9.93198 9.93198 10.6875 9 10.6875C8.06802 10.6875 7.3125 9.93198 7.3125 9Z"
                fill="#111111"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 2.4375C5.6144 2.4375 3.33397 4.46565 2.01043 6.18515L1.98656 6.21615C1.68723 6.6049 1.41155 6.96294 1.22452 7.3863C1.02423 7.83965 0.9375 8.33377 0.9375 9C0.9375 9.66623 1.02423 10.1603 1.22452 10.6137C1.41155 11.0371 1.68723 11.3951 1.98656 11.7839L2.01043 11.8149C3.33397 13.5344 5.6144 15.5625 9 15.5625C12.3856 15.5625 14.666 13.5344 15.9896 11.8149L16.0134 11.7839C16.3128 11.3951 16.5885 11.0371 16.7755 10.6137C16.9758 10.1603 17.0625 9.66623 17.0625 9C17.0625 8.33377 16.9758 7.83965 16.7755 7.3863C16.5885 6.96293 16.3128 6.60489 16.0134 6.21613L15.9896 6.18515C14.666 4.46565 12.3856 2.4375 9 2.4375ZM2.90191 6.87135C4.12398 5.28369 6.11277 3.5625 9 3.5625C11.8872 3.5625 13.876 5.28369 15.0981 6.87135C15.427 7.29869 15.6197 7.55404 15.7464 7.84091C15.8649 8.10901 15.9375 8.4367 15.9375 9C15.9375 9.5633 15.8649 9.89099 15.7464 10.1591C15.6197 10.446 15.427 10.7013 15.0981 11.1287C13.876 12.7163 11.8872 14.4375 9 14.4375C6.11277 14.4375 4.12398 12.7163 2.90191 11.1287C2.57298 10.7013 2.3803 10.446 2.25357 10.1591C2.13513 9.89099 2.0625 9.5633 2.0625 9C2.0625 8.4367 2.13513 8.10901 2.25357 7.84091C2.3803 7.55404 2.57298 7.29869 2.90191 6.87135Z"
                fill="#111111"
              />
            </svg>
            <div>View</div>
          </FlyOutItemLink>
          <DeleteDialog
            dialogName="user"
            buttonClassName="w-full"
            // action={handleDelete}
            actionName="delete"
            actionButtonLabel={"Delete"}
            trigger={
              <FlyOutItem
                id="menu-item-delete"
                className="space-x-2 hover:bg-light-grey-2 rounded-[4px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.73196 1.68751H10.268C10.4303 1.68741 10.5717 1.68732 10.7052 1.70864C11.2327 1.79287 11.6892 2.12186 11.9359 2.59563C11.9983 2.71555 12.0429 2.84971 12.0942 3.00371L12.1779 3.25488C12.1921 3.2974 12.1961 3.30943 12.1995 3.31891C12.3309 3.682 12.6714 3.92745 13.0574 3.93723C13.0675 3.93748 13.08 3.93753 13.125 3.93753H15.375C15.6857 3.93753 15.9375 4.18937 15.9375 4.50003C15.9375 4.81069 15.6857 5.06253 15.375 5.06253H2.62494C2.31428 5.06253 2.06244 4.81069 2.06244 4.50003C2.06244 4.18937 2.31428 3.93753 2.62494 3.93753H4.875C4.92004 3.93753 4.93247 3.93749 4.94261 3.93723C5.3286 3.92745 5.66912 3.68202 5.80046 3.31893C5.80391 3.30938 5.80788 3.29761 5.82212 3.25488L5.90583 3.00372C5.95705 2.84973 6.00168 2.71555 6.06413 2.59563C6.31084 2.12186 6.76729 1.79287 7.29476 1.70864C7.42827 1.68732 7.56967 1.68741 7.73196 1.68751ZM6.75605 3.93753C6.79468 3.86176 6.82892 3.78303 6.85837 3.70161C6.86731 3.67689 6.87609 3.65057 6.88735 3.61675L6.96221 3.39219C7.03058 3.18706 7.04633 3.14522 7.06195 3.11523C7.14418 2.95731 7.29633 2.84764 7.47216 2.81957C7.50555 2.81423 7.55021 2.81253 7.76645 2.81253H10.2336C10.4498 2.81253 10.4945 2.81423 10.5278 2.81957C10.7037 2.84764 10.8558 2.95731 10.9381 3.11523C10.9537 3.14522 10.9694 3.18705 11.0378 3.39219L11.1126 3.61662L11.1416 3.70163C11.1711 3.78304 11.2053 3.86177 11.244 3.93753H6.75605Z"
                    fill="#111111"
                  />
                  <path
                    d="M4.43626 6.33761C4.41559 6.02764 4.14756 5.79311 3.83759 5.81377C3.52761 5.83444 3.29308 6.10247 3.31375 6.41245L3.66133 11.6262C3.72546 12.5883 3.77725 13.3654 3.89873 13.9752C4.02503 14.6092 4.23984 15.1387 4.68354 15.5538C5.12724 15.9689 5.6699 16.1481 6.31089 16.2319C6.92741 16.3126 7.70622 16.3125 8.67039 16.3125H9.32956C10.2937 16.3125 11.0726 16.3126 11.6891 16.2319C12.3301 16.1481 12.8728 15.9689 13.3165 15.5538C13.7602 15.1387 13.975 14.6092 14.1013 13.9752C14.2228 13.3654 14.2745 12.5883 14.3387 11.6263L14.6863 6.41245C14.7069 6.10247 14.4724 5.83444 14.1624 5.81377C13.8524 5.79311 13.5844 6.02764 13.5637 6.33761L13.2188 11.5119C13.1514 12.5228 13.1034 13.2262 12.998 13.7554C12.8957 14.2688 12.7529 14.5405 12.5479 14.7323C12.3428 14.9242 12.0622 15.0485 11.5432 15.1164C11.0081 15.1864 10.3031 15.1875 9.29001 15.1875H8.70999C7.69686 15.1875 6.99185 15.1864 6.4568 15.1164C5.9378 15.0485 5.65718 14.9242 5.45212 14.7323C5.24706 14.5405 5.10431 14.2687 5.00205 13.7554C4.89663 13.2262 4.8486 12.5228 4.78121 11.5119L4.43626 6.33761Z"
                    fill="#111111"
                  />
                  <path
                    d="M7.06904 7.69032C7.37816 7.65941 7.6538 7.88494 7.68472 8.19406L8.05972 11.9441C8.09063 12.2532 7.8651 12.5288 7.55598 12.5597C7.24686 12.5906 6.97121 12.3651 6.9403 12.056L6.5653 8.306C6.53439 7.99688 6.75992 7.72123 7.06904 7.69032Z"
                    fill="#111111"
                  />
                  <path
                    d="M10.931 7.69032C11.2401 7.72123 11.4656 7.99688 11.4347 8.306L11.0597 12.056C11.0288 12.3651 10.7532 12.5906 10.444 12.5597C10.1349 12.5288 9.90939 12.2532 9.9403 11.9441L10.3153 8.19406C10.3462 7.88494 10.6219 7.65941 10.931 7.69032Z"
                    fill="#111111"
                  />
                </svg>
                <div>Delete</div>
              </FlyOutItem>
            }
            mode={""}
            id={""}
            action={function (): Promise<void> {
              throw new Error("Function not implemented.");
            }}
            open={false}
            onOpenChange={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </FlyOutContent>
      </FlyOut>
    </div>
  );
};

const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        className="w-3.5 h-3.5 rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        className="w-3.5 h-3.5 rounded border-gray-300"
      />
    ),
  },
  {
    id: "number",
    header: () => <span className="-ml-6">#</span>,
    cell: ({ row }) => (
      <span className="text-gray-600 -ml-6">{row.index + 1}</span>
    ),
    size: 30,
  },
  {
    accessorKey: "name",
    header: "PRODUCT",
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
  },
  {
    accessorKey: "price",
    header: "PRICE",
  },
  {
    accessorKey: "stock",
    header: "STOCK",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`px-2 py-0.5 rounded-md text-xs font-medium ${
            status === "In Stock"
              ? "bg-green-100 text-green-800"
              : status === "Low Stock"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "ACTION",
    accessorKey: "actions",

    cell: ({ row }) => (
      // <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
      //   <img src="/icons/dots.svg" className="w-5 h-5" alt="" />
      // </button>
      <RowActions category={row?.original} refresh={refresh} />
    ),
  },
];

const productData: Product[] = [
  {
    name: "Premium Vodka",
    category: "Spirits",
    price: "$45.00",
    stock: 125,
    status: "In Stock",
  },
  {
    name: "Craft Beer Pack",
    category: "Beer",
    price: "$15.00",
    stock: 89,
    status: "In Stock",
  },
  {
    name: "Red Wine Bottle",
    category: "Wine",
    price: "$28.00",
    stock: 45,
    status: "Low Stock",
  },
  {
    name: "Whiskey Premium",
    category: "Spirits",
    price: "$65.00",
    stock: 0,
    status: "Out of Stock",
  },
  {
    name: "Champagne",
    category: "Wine",
    price: "$85.00",
    stock: 32,
    status: "In Stock",
  },
];

interface IActiveTab extends ITabItem {}

const tabsItems = (): IActiveTab[] => {
  return [
    { id: "0", title: "All" },
    { id: "1", title: "Spirits" },
    { id: "2", title: "Wine" },
    { id: "3", title: "Beer" },
  ];
};

interface IQueryObject {
  search: string;
  page: number;
  activeTab: IActiveTab;
}

function ProductsPage() {
  const tabsData = tabsItems();

  const [queryObject, setqueryObject] = React.useState<IQueryObject>({
    search: "",
    page: 1,
    activeTab: tabsData[0],
  });
  const activeTab = queryObject?.activeTab;

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  // Filter products based on search and active tab
  const filteredProducts = productData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(queryObject.search.toLowerCase()) ||
      product.category.toLowerCase().includes(queryObject.search.toLowerCase());

    const matchesTab =
      activeTab.title === "All" || product.category === activeTab.title;

    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout leftTitle="Products">
      <div className="px-6 min-h-full">
        <div className="bg-white overflow-hidden">
          <div className={"mt-[20px] px-1 pt-2 pb-1 flex justify-between "}>
            <Search
              value={queryObject?.search}
              onChange={(value: string) =>
                setqueryObject((x) => ({ ...x, search: value }))
              }
            />
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="px-4 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Add Product
            </button>
          </div>

          <div
            className={
              "my-[4px]  relative border-t-[#EAEBF0] border-t-[1px] pt-[10px]"
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
            <DataTable columns={columns} data={filteredProducts} />
          </div>
        </div>
      </div>

      {/* Full-screen Add Product Dialog */}
      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </DashboardLayout>
  );
}

export default ProductsPage;
