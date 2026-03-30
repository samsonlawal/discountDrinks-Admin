import { useState } from "react";
import { showErrorToast } from "@/utils/toaster";
import { AxiosError } from "axios";
import OrdersService from "@/services/orders";

export const useGetOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async (query?: any) => {
    setLoading(true);
    try {
      const res = await OrdersService.fetchOrders(query || {});
      const fetchedOrders = res?.data?.data || [];
      const transformedData = fetchedOrders.map((order: any) => {
        return {
          ...order,
          id: order._id || order.id,
          customer: order.user?.firstName ? `${order.user.firstName} ${order.user.lastName}` : order.user?.email || "Guest",
          amount: order.totalAmount, // Formatted in the column definition
          status: order.status || "Pending",
          date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "",
        };
      });
      setOrders(transformedData);
      return transformedData;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch orders",
        description: error?.response?.data?.description || "",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, orders, fetchOrders };
};

export const useGetOrderById = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);

  const fetchOrder = async (id: string) => {
    setLoading(true);
    try {
      const res = await OrdersService.getOrderById({ orderId: id });
      setOrder(res?.data?.data || null);
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch order details",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, order, fetchOrder };
};

export const useUpdateOrderStatus = () => {
  const [loading, setLoading] = useState(false);

  const updateStatus = async ({ id, status }: { id: string; status: string }) => {
    setLoading(true);
    try {
      const res = await OrdersService.updateOrderStatus({ orderId: id, status });
      return res?.data?.data || res?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to update order status",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateStatus };
};
