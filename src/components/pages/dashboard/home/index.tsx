"use client";
import DashboardLayout from "@/components/layouts/dashboard";
import { StatCard, Card } from "@/components/molecules/Card";
import HomeTable from "./HomeTable";
import { ColumnDef } from "@tanstack/react-table";
import { useGetUsers } from "@/hooks/api/users";
import { useGetProducts } from "@/hooks/api/products";
import { useGetOrders } from "@/hooks/api/orders";
import { useGetSubscribers } from "@/hooks/api/subscribers";
import { Checkbox } from "@/components/ui/checkbox";
import { PoundSterling, Users, Mail } from "lucide-react";
import React from "react";

type Order = {
  id: string;
  customer: string;
  amount: string;
  status: string;
  orderId: string;
  paymentStatus: string;
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
    accessorKey: "paymentStatus",
    header: "Payment",
    size: 120,

    cell: ({ row }) => {
      const pStatus = (row.getValue("paymentStatus") as string || "").toLowerCase();
      const getPStatusColor = (status: string) => {
        switch (status) {
          case "paid":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
          case "failed":
            return "bg-rose-100 text-rose-700 border-rose-200";
          case "refunded":
            return "bg-blue-100 text-blue-700 border-blue-200";
          default:
            return "bg-amber-100 text-amber-700 border-amber-200";
        }
      };
      return (
        <span
          className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border w-fit ${getPStatusColor(pStatus)}`}
        >
          {pStatus || "Pending"}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 80,
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
          case "pending":
            return "bg-amber-100 text-amber-700 border-amber-200";
          case "processing":
            return "bg-blue-100 text-blue-700 border-blue-200";
          case "dispatched":
            return "bg-violet-100 text-violet-700 border-violet-200";
          case "shipped":
            return "bg-indigo-100 text-indigo-700 border-indigo-200";
          case "delivered":
          case "completed":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
          case "cancelled":
            return "bg-rose-100 text-rose-700 border-rose-200";
          default:
            return "bg-gray-100 text-gray-700 border-gray-200";
        }
      };
      return (
        <span
          className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border w-fit ${getStatusColor(status)}`}
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
  const { totalSubscribers, fetchStats } = useGetSubscribers();

  React.useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders({ limit: 50 });
    fetchStats();
  }, []);

  const paidOrders = recentOrders.filter(
    (order: any) => order.paymentStatus?.toLowerCase() === "paid",
  );

  const totalSales = paidOrders.reduce((sum: number, order: any) => {
    return sum + (Number(order.amount) || 0);
  }, 0);

  const totalOrders = recentOrders.length;
  const successfulOrdersCount = paidOrders.length;

  // Mock data - replace with real API data
  const stats = [
    {
      title: "Total Sales",
      value: `£${totalSales.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <PoundSterling className="w-5 h-5" />,
      trend: {
        value: "",
        isPositive: true,
      },
      bgColor: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: (
        <span>
          {successfulOrdersCount}
          <span className="text-gray-400 text-[16px] font-medium">/{totalOrders}</span>
        </span>
      ),
      icon: "/icons/receipt.svg",
      trend: {
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
        value: "",
        isPositive: true,
      },
      bgColor: "bg-orange-500",
    },
    {
      title: "Total Subscribers",
      value: totalSubscribers.toString(),
      icon: <Mail className="w-5 h-5 text-white" />,
      trend: {
        value: "",
        isPositive: true,
      },
      bgColor: "bg-emerald-500",
    },
  ];

  const topProducts = React.useMemo(() => {
    const productAggregation: { [key: string]: { name: string; sales: number; revenue: number } } = {};

    paidOrders.forEach((order: any) => {
      (order.items || []).forEach((item: any) => {
        const name = item.name || "Unknown Product";
        const quantity = Number(item.quantity) || 0;
        const price = Number(item.priceAtPurchase || item.price || 0);

        if (!productAggregation[name]) {
          productAggregation[name] = { name, sales: 0, revenue: 0 };
        }

        productAggregation[name].sales += quantity;
        productAggregation[name].revenue += quantity * price;
      });
    });

    return Object.values(productAggregation)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5)
      .map(item => ({
        name: item.name,
        sales: item.sales,
        revenue: `£${item.revenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      }));
  }, [paidOrders]);

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
              trend={stat.trend}
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
            <HomeTable columns={orderColumns} data={recentOrders.slice(0, 5)} />
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
                <div key={index} className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate" title={product.name}>
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.sales} sales
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 shrink-0">
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
