import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { AxiosError } from "axios";
import { IFetchBrandQuery, IBrand } from "@/types";
import BrandsService from "@/services/brands";

// Hook for fetching brands
export const useGetBrands = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<any[]>([]);

  const fetchBrands = async (queries?: IFetchBrandQuery) => {
    setLoading(true);
    try {
      const res = await BrandsService.fetchBrands(queries);
      const rawData = res?.data?.data || [];
      const mappedData = rawData.map((brand: any) => ({
        ...brand,
        status:
          brand.status?.toLowerCase() || (brand.isActive ? "active" : "inactive"),
      }));
      setBrands(mappedData);
      return mappedData;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch brands",
        description: error?.response?.data?.description || "",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, brands, fetchBrands };
};

// Hook for fetching a single brand by ID
export const useGetBrandById = () => {
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState<any>(null);

  const fetchBrand = async (id: string) => {
    setLoading(true);
    try {
      const res = await BrandsService.getBrandById({ brandId: id });
      const rawData = res?.data?.data;
      const mappedData = rawData
        ? {
            ...rawData,
            status:
              rawData.status?.toLowerCase() ||
              (rawData.isActive ? "active" : "inactive"),
          }
        : null;
      setBrand(mappedData);
      return mappedData;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch brand",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, brand, fetchBrand };
};

// Hook for creating a brand
export const useCreateBrand = () => {
  const [loading, setLoading] = useState(false);

  const createBrand = async ({
    data,
    successCallback,
  }: {
    data: IBrand;
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await BrandsService.createBrand(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Brand created successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to create brand",
        description: error?.response?.data?.description || "",
      });
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createBrand };
};

// Hook for updating a brand
export const useUpdateBrand = () => {
  const [loading, setLoading] = useState(false);

  const updateBrand = async ({
    data,
    successCallback,
  }: {
    data: IBrand;
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await BrandsService.updateBrand(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Brand updated successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to update brand",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateBrand };
};

// Hook for deleting a brand
export const useDeleteBrand = () => {
  const [loading, setLoading] = useState(false);

  const deleteBrand = async ({
    data,
    successCallback,
  }: {
    data: { id: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await BrandsService.deleteBrand(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Brand deleted successfully!",
        description: res?.data?.description || "",
      });
      return true;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to delete brand",
        description: error?.response?.data?.description || "",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteBrand };
};
