import { useState } from "react";
import { showErrorToast } from "@/utils/toaster";
import { AxiosError } from "axios";
import SubscribersService from "@/services/subscribers";

// Hook for fetching subscribers
export const useGetSubscribers = () => {
  const [loading, setLoading] = useState(false);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  const fetchSubscribers = async (query?: any) => {
    setLoading(true);
    try {
      const res = await SubscribersService.fetchSubscribers(query || {});
      const data = res?.data?.data || [];
      setSubscribers(data);
      
      const total = res.data?.pagination?.total || data.length || 0;
      setPagination(prev => ({
        ...prev,
        ...(res.data?.pagination || {}),
        total: total,
      }));

      return data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch subscribers",
        description: error?.response?.data?.description || "",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, subscribers, pagination, fetchSubscribers };
};
