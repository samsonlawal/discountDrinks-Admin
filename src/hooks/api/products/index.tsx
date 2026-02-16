import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { AxiosError } from "axios";
import ProductsService from "@/services/products";

// Hook for fetching products
export const useGetProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async (query?: any) => {
    setLoading(true);
    try {
      const res = await ProductsService.fetchProducts(query || {});
      const transformedData = (res?.data?.data || []).map((product: any) => {
        const isActive =
          product.isActive !== undefined
            ? product.isActive
            : product.status === "active" || product.status === "Active";

        return {
          ...product,
          isActive,
          status: isActive ? "Active" : "Inactive",
          createdDate: product.createdAt
            ? new Date(product.createdAt).toLocaleDateString()
            : "",
        };
      });
      setProducts(transformedData);
      return transformedData;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch products",
        description: error?.response?.data?.description || "",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, products, fetchProducts };
};

// Hook for fetching a single product by ID
export const useGetProductById = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    try {
      const res = await ProductsService.getProductById({ productId: id });
      setProduct(res?.data?.data || null);
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch product",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, product, fetchProduct };
};

// Hook for creating a product
export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);

  const createProduct = async ({
    data,
    successCallback,
  }: {
    data: any;
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await ProductsService.createProduct(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Product created successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to create product",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createProduct };
};

// Hook for updating a product
export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);

  const updateProduct = async ({
    data,
    successCallback,
  }: {
    data: { id: string; [key: string]: any };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await ProductsService.updateProduct(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Product updated successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to update product",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProduct };
};

// Hook for deleting a product
export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);

  const deleteProduct = async ({
    data,
    successCallback,
  }: {
    data: { id: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await ProductsService.deleteProduct(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Product deleted successfully!",
        description: res?.data?.description || "",
      });
      return true;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to delete product",
        description: error?.response?.data?.description || "",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteProduct };
};
