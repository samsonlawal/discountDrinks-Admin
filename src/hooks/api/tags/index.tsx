import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { AxiosError } from "axios";
import { TagsInterface } from "@/services/tags/types";
import { IFetchTagQuery } from "@/types";

// Hook for fetching tags
export const useGetTags = ({ Service }: { Service: TagsInterface }) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<any[]>([]);

  const fetchTags = async (query?: IFetchTagQuery) => {
    setLoading(true);
    try {
      const res = await Service.getTags(query);
      setTags(res?.data?.data || []);
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch tags",
        description: error?.response?.data?.description || "",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, tags, fetchTags };
};

// Hook for fetching a single tag by ID
export const useGetTagById = ({ Service }: { Service: TagsInterface }) => {
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState<any>(null);

  const fetchTag = async (id: string) => {
    setLoading(true);
    try {
      const res = await Service.getTagById(id);
      setTag(res?.data?.data || null);
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch tag",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, tag, fetchTag };
};

// Hook for creating a tag
export const useCreateTag = ({ Service }: { Service: TagsInterface }) => {
  const [loading, setLoading] = useState(false);

  const createTag = async ({
    data,
    successCallback,
  }: {
    data: { name: string; type?: number; status?: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await Service.createTag(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Tag created successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to create tag",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createTag };
};

// Hook for updating a tag
export const useUpdateTag = ({ Service }: { Service: TagsInterface }) => {
  const [loading, setLoading] = useState(false);

  const updateTag = async ({
    data,
    successCallback,
  }: {
    data: { id: string; name?: string; type?: number; status?: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await Service.updateTag(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Tag updated successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to update tag",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateTag };
};

// Hook for deleting a tag
export const useDeleteTag = ({ Service }: { Service: TagsInterface }) => {
  const [loading, setLoading] = useState(false);

  const deleteTag = async ({
    data,
    successCallback,
  }: {
    data: { id: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await Service.deleteTag(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Tag deleted successfully!",
        description: res?.data?.description || "",
      });
      return true;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to delete tag",
        description: error?.response?.data?.description || "",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteTag };
};
