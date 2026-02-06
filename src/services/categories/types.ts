import { AxiosResponse } from "axios";
import { IDesignCategory, IFetchDesignCategoryQuery } from "@/types";

export type TCreateCategoryPayload = {
  name: string;
  description?: string;
  parent_category_id?: string;
  status?: string;
};

export type TUpdateCategoryPayload = {
  id: string;
  name?: string;
  description?: string;
  parent_category_id?: string;
  status?: string;
};

export type TDeleteCategoryPayload = {
  id: string;
};

// Wrapper types removed as requested

export interface CategoriesInterface {
  getCategories: (
    query?: IFetchDesignCategoryQuery,
  ) => Promise<AxiosResponse<any, any>>;
  getCategoryById: (id: string) => Promise<AxiosResponse<any, any>>;
  createCategory: (
    data: TCreateCategoryPayload,
  ) => Promise<AxiosResponse<any, any>>;
  updateCategory: (
    data: TUpdateCategoryPayload,
  ) => Promise<AxiosResponse<any, any>>;
  deleteCategory: (
    data: TDeleteCategoryPayload,
  ) => Promise<AxiosResponse<any, any>>;
}
