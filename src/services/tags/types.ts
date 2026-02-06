import { AxiosResponse } from "axios";
import { ITag, IFetchTagQuery } from "@/types";

export type TCreateTagPayload = {
  name: string;
  type?: number;
  status?: string;
};

export type TUpdateTagPayload = {
  id: string;
  name?: string;
  type?: number;
  status?: string;
};

export type TDeleteTagPayload = {
  id: string;
};

// Wrapper types removed as requested

export interface TagsInterface {
  getTags: (query?: IFetchTagQuery) => Promise<AxiosResponse<any, any>>;
  getTagById: (id: string) => Promise<AxiosResponse<any, any>>;
  createTag: (data: TCreateTagPayload) => Promise<AxiosResponse<any, any>>;
  updateTag: (data: TUpdateTagPayload) => Promise<AxiosResponse<any, any>>;
  deleteTag: (data: TDeleteTagPayload) => Promise<AxiosResponse<any, any>>;
}
