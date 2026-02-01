import { ReactNode } from "react";

export type TAppState = {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: string;
  user?: TUser | undefined;
};

export type TAuthContextProps = {
  children: ReactNode;
};

export interface Country {
  area?: number;
  capital?: string;
  countryCallingCode?: string;
  emoji?: string;
  flags?: {
    png?: string;
    svg?: string;
  };
  name?: string;
  countryCode?: string;
}

export interface IFetchUserQuery {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface User {
  email: string;
  lastLogin: string;
  createdAt: string;
}

export type TUser = {
  profile_id?: string;
  user_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  profession?: ITag;
  profession_id?: string;
  avatar?: string;
  bio?: string;
  location?: Country;
  linkedIn?: string;
  instagram?: string;
  facebook?: string;
  dribble?: string;
  github?: string;
  behance?: string;
  x?: string;
  website?: string;
  number_of_designs?: string;
  number_of_likes: string | number;
  number_of_shares: string | number;
  number_of_views: string | number;
  user: User;
};

export interface IFetchDesignQuery {
  status?: TDesignStatus;
  userId?: string;
  name?: string;
  page?: number;
  limit?: number;
}

export enum ETagType {
  PENDING = 1,
  PROCESSING = 2,
  COMPLETED = 3,
  CANCELLED = 4,
}

export interface ITag {
  id?: string;
  name?: string;
  type?: ETagType;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFetchTagQuery {
  type?: string;
  search: string;
  page?: number;
  limit?: number;
}

export interface IDesignCategory {
  id?: string;
  name?: string;
  description?: string;
  parent_category_id?: string;
  createdAt?: string;
  updatedAt?: string;
  number_of_designs?: string;
  number_of_views?: string;
}

export interface IFetchDesignCategoryQuery {
  name: string;
  page?: number;
  limit?: number;
}

export type TDesignStatus = "pending" | "approved" | "rejected";

export interface IDesign {
  name?: string;
  description?: string;
  site_icon?: string;
  site_thumbnail?: string;
  user_works_at_place?: boolean;
  link?: string;
  images?: string[];
  tags?: ITag[];
  fonts?: string[];

  categories?: IDesignCategory[];
  location?: Country;

  id?: string;
  avg_rating?: string;
  under_review?: boolean;

  number_of_likes?: string;
  number_of_views?: string | number;
  createdAt?: string;

  approvedAt?: string;
  rejectedAt?: string;

  user?: {
    profile: { username?: string };
  };
}

export type IClaim = {
  design_id: string;
  user_id: string;
  user_works_at_place: boolean;
  role: ITag;
  role_id: string;
  identification_document_url: string;
  additional_document_url: string;
  additional_info: string;
};

export type TWebsitesPageType = "published-websites" | "pending-websites";
