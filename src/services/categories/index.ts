import axios from "axios";
import env from "@/config/env";

import {
  CategoriesInterface,
  TCreateCategoryPayload,
  TUpdateCategoryPayload,
  TDeleteCategoryPayload,
} from "./types";
import { IFetchDesignCategoryQuery } from "@/types";

class Service implements CategoriesInterface {
  getCategories(query?: IFetchDesignCategoryQuery) {
    const { name, page, limit } = query || {};
    const params = new URLSearchParams();

    if (name) params.append("name", name);
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());

    const queryString = params.toString();
    const url = queryString
      ? `${env.api.categories}?${queryString}`
      : env.api.categories;

    return axios.get(url);
  }

  getCategoryById(id: string) {
    return axios.get(`${env.api.categories}/${id}`);
  }

  createCategory(payload: TCreateCategoryPayload) {
    return axios.post(env.api.categories, payload);
  }

  updateCategory(payload: TUpdateCategoryPayload) {
    const { id, ...updateData } = payload;
    return axios.put(`${env.api.categories}/${id}`, updateData);
  }

  deleteCategory(payload: TDeleteCategoryPayload) {
    const { id } = payload;
    return axios.delete(`${env.api.categories}/${id}`);
  }
}

const CategoriesService = new Service();
export default CategoriesService;
