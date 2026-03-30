"use client";
import DashboardLayout from "@/components/layouts/dashboard";
import { StatCard, Card } from "@/components/molecules/Card";
import HomeTable from "./HomeTable";
import { ColumnDef } from "@tanstack/react-table";
import { useGetUsers } from "@/hooks/api/users";
import { useGetProducts } from "@/hooks/api/products";
import { useGetOrders } from "@/hooks/api/orders";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

type Order = {
  id: string;
  customer: string;
  amount: string;
  status: string;
  orderId: string;
};

const orderColumns: ColumnDef<Order>[] = [
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
        className="translate-y-[2px] z-100"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 30,
  },
  {
    accessorKey: "orderId",
    header: "#",
    size: 100,
    cell: ({ row }) => (
      <span className="text-xs font-medium text-gray-700">#{row.getValue("orderId")}</span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount");
      return <span>£{Number(amount).toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case "completed":
            return "bg-green-100 border border-green-800 text-green-800";
          case "pending":
            return "bg-yellow-100 border border-yellow-600 text-yellow-600";
          case "processing":
            return "bg-blue-100 border border-blue-800 text-blue-800";
          case "cancelled":
            return "bg-red-100 border border-red-800 text-red-800";
          default:
            return "bg-gray-100 border border-gray-800 text-gray-800";
        }
      };
      return (
        <span
          className={`px-2 py-0.5 rounded-sm text-xs font-medium capitalize w-fit ${getStatusColor(status)}`}
        >
          {status}
        </span>
      );
    },
  },
];

function DashboardHome() {
  const { users, fetchUsers } = useGetUsers();
  const { products, fetchProducts } = useGetProducts();
  const { orders: recentOrders, fetchOrders } = useGetOrders();

  React.useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders({ limit: 50 });
  }, []);

  const totalSales = recentOrders.reduce((sum: number, order: any) => {
    return sum + (Number(order.amount) || 0);
  }, 0);

  const totalOrders = recentOrders.length;

  // Mock data - replace with real API data
  const stats = [
    {
      title: "Total Sales",
      value: `£${totalSales.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: "/icons/receipt.svg",
      trend: {
        // value: `From ${totalOrders} orders`,
        value: "",
        isPositive: true,
      },
      bgColor: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: "/icons/receipt.svg",
      trend: {
        // value: `${totalOrders} total orders`,
        value: "",
        isPositive: true,
      },
      bgColor: "bg-blue-500",
    },
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: "/icons/users.svg",
      trend: {
        // value: `${users.length} total users`,
        value: "",
        isPositive: true,
      },
      bgColor: "bg-purple-500",
    },
    {
      title: "Total Products",
      value: products.length.toString(),
      icon: "/icons/tag.svg",
      trend: {
        // value: `${products.length} total products`,
        value: "",
        isPositive: true,
      },
      bgColor: "bg-orange-500",
    },
  ];

  const topProducts = [
    { name: "Premium Vodka", sales: 145, revenue: "£2,175" },
    { name: "Craft Beer Pack", sales: 132, revenue: "£1,980" },
    { name: "Red Wine Bottle", sales: 98, revenue: "£1,470" },
    { name: "Whiskey Premium", sales: 87, revenue: "£2,610" },
    { name: "Champagne", sales: 76, revenue: "£3,040" },
  ];

  return (
    <DashboardLayout leftTitle="Dashboard">
      <div className="p-6  min-h-full">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              // trend={stat.trend}
              bgColor={stat.bgColor}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Orders
              </h2>
              <a
                href="/dashboard/orders"
                className="text-[14px] text-black border border-gray-100 hover:text-white hover:bg-black bg-gray-100 transition duration-100 ease-in-out px-3 py-1 rounded-md cursor-pointer"
              >
                View all
              </a>
            </div>
            <HomeTable columns={orderColumns} data={recentOrders.slice(0, 6)} />
          </div>

          {/* Top Products */}
          <Card className="">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-100/50">
              <h2 className="text-lg font-medium text-gray-900">
                Top Products
              </h2>
            </div>
            <div className="space-y-4 p-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.sales} sales
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {product.revenue}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardHome;
