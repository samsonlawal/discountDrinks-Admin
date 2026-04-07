import axios from "axios";
import env from "@/config/env";

class Service {
  fetchSubscribers(query?: any) {
    const { search, page, limit } = query || {};
    return axios.get(env.api.subscribers, {
      params: {
        ...(search ? { search } : {}),
        ...(page ? { page } : {}),
        ...(limit ? { limit } : {}),
      },
      withCredentials: true,
    });
  }

  // Add more methods as needed (e.g., delete, export)
}

const SubscribersService = new Service();
export default SubscribersService;
