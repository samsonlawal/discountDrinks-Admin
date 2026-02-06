import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { AxiosError } from "axios";
import { CategoriesInterface } from "@/services/categories/types";
import { IFetchDesignCategoryQuery } from "@/types";

// Hook for fetching categories
export const useGetCategories = ({
  Service,
}: {
  Service: CategoriesInterface;
}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async (query?: IFetchDesignCategoryQuery) => {
    setLoading(true);
    try {
      const res = await Service.getCategories(query);
      setCategories(res?.data?.data || []);
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch categories",
        description: error?.response?.data?.description || "",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, categories, fetchCategories };
};

// Hook for fetching a single category by ID
export const useGetCategoryById = ({
  Service,
}: {
  Service: CategoriesInterface;
}) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<any>(null);

  const fetchCategory = async (id: string) => {
    setLoading(true);
    try {
      const res = await Service.getCategoryById(id);
      setCategory(res?.data?.data || null);
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch category",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, category, fetchCategory };
};

// Hook for creating a category
export const useCreateCategory = ({
  Service,
}: {
  Service: CategoriesInterface;
}) => {
  const [loading, setLoading] = useState(false);

  const createCategory = async ({
    data,
    successCallback,
  }: {
    data: {
      name: string;
      description?: string;
      parent_category_id?: string;
      status?: string;
    };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await Service.createCategory(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Category created successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to create category",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createCategory };
};

// Hook for updating a category
export const useUpdateCategory = ({
  Service,
}: {
  Service: CategoriesInterface;
}) => {
  const [loading, setLoading] = useState(false);

  const updateCategory = async ({
    data,
    successCallback,
  }: {
    data: {
      id: string;
      name?: string;
      description?: string;
      parent_category_id?: string;
      status?: string;
    };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await Service.updateCategory(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Category updated successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to update category",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateCategory };
};

// Hook for deleting a category
export const useDeleteCategory = ({
  Service,
}: {
  Service: CategoriesInterface;
}) => {
  const [loading, setLoading] = useState(false);

  const deleteCategory = async ({
    data,
    successCallback,
  }: {
    data: { id: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await Service.deleteCategory(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Category deleted successfully!",
        description: res?.data?.description || "",
      });
      return true;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to delete category",
        description: error?.response?.data?.description || "",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteCategory };
};
