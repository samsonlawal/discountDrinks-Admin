import axios from "axios";
import env from "@/config/env";

class Service {
  fetchOrders(query?: any) {
    return axios.get(env.api.orders, {
      params: query,
      withCredentials: true,
    });
  }

  getOrderById({ orderId }: { orderId: string }) {
    return axios.get(`${env.api.orders}/${orderId}`, {
      withCredentials: true,
    });
  }
}

const OrdersService = new Service();
export default OrdersService;
