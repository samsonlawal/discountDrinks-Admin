import axios from "axios";
import env from "@/config/env";

import {
  TagsInterface,
  TCreateTagPayload,
  TUpdateTagPayload,
  TDeleteTagPayload,
} from "./types";
import { IFetchTagQuery } from "@/types";

class Service implements TagsInterface {
  getTags(query?: IFetchTagQuery) {
    const { search, type, page, limit } = query || {};
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (type) params.append("type", type.toString());
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());

    const queryString = params.toString();
    const url = queryString ? `${env.api.tags}?${queryString}` : env.api.tags;

    return axios.get(url);
  }

  createTag(payload: TCreateTagPayload) {
    return axios.post(env.api.tags, payload);
  }

  updateTag(payload: TUpdateTagPayload) {
    const { id, ...updateData } = payload;
    return axios.put(`${env.api.tags}/${id}`, updateData);
  }

  deleteTag(payload: TDeleteTagPayload) {
    const { id } = payload;
    return axios.delete(`${env.api.tags}/${id}`);
  }

  getTagById(id: string) {
    return axios.get(`${env.api.tags}/${id}`);
  }
}

const TagsService = new Service();
export default TagsService;
