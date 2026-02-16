"use client";
import DashboardLayout from "@/components/layouts/dashboard";
import { StatCard, Card } from "@/components/molecules/Card";
import DataTable from "@/components/molecules/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useGetUsers } from "@/hooks/api/users";
import { useGetCategories } from "@/hooks/api/categories";
import { useGetProducts } from "@/hooks/api/products";
import { useGetTags } from "@/hooks/api/tags";
import React from "react";

type Order = {
  id: string;
  customer: string;
  amount: string;
  status: string;
  date: string;
};

const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case "completed":
            return "bg-green-100 text-green-800";
          case "pending":
            return "bg-yellow-100 text-yellow-800";
          case "processing":
            return "bg-blue-100 text-blue-800";
          case "cancelled":
            return "bg-red-100 text-red-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

function DashboardHome() {
  const { users, fetchUsers } = useGetUsers();
  /* const { categories, fetchCategories } = useGetCategories(); */
  const { products, fetchProducts } = useGetProducts();
  const { tags, fetchTags } = useGetTags();

  React.useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchTags();
  }, []);

  // Real data from API
  const recentOrders: Order[] = [];

  // Calculate total sales from orders
  const totalSales = recentOrders.reduce((sum, order) => {
    const amount = parseFloat(order.amount.replace("$", "").replace(",", ""));
    return sum + amount;
  }, 0);

  const totalOrders = recentOrders.length;

  // Mock data - replace with real API data
  const stats = [
    {
      title: "Total Sales",
      value: `$${totalSales.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
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
    { name: "Premium Vodka", sales: 145, revenue: "$2,175" },
    { name: "Craft Beer Pack", sales: 132, revenue: "$1,980" },
    { name: "Red Wine Bottle", sales: 98, revenue: "$1,470" },
    { name: "Whiskey Premium", sales: 87, revenue: "$2,610" },
    { name: "Champagne", sales: 76, revenue: "$3,040" },
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
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h2>
              <a
                href="/dashboard/orders"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all
              </a>
            </div>
            <DataTable columns={orderColumns} data={recentOrders} />
          </Card>

          {/* Top Products */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Top Products
            </h2>
            <div className="space-y-4">
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
