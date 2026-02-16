import { ReactNode } from "react";

export type TAppState = {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: string;
  user?: TUser | undefined;
};

export type TUser = {
  id?: string;
  user_id?: string;
  email?: string;
  isActive?: boolean;
  user?: {
    email?: string;
    lastLogin?: string;
    createdAt?: string;
    userId?: string;
  };
};

export type TAuthContextProps = {
  children: ReactNode;
};
export interface IFetchUserQuery {
  search?: string;
  page?: number;
  pageSize?: number;
}

// export type TUser = {
//   profile_id?: string;
//   user_id?: string;
//   email?: string;
//   first_name?: string;
//   last_name?: string;
//   username?: string;
//   profession?: ITag;
//   profession_id?: string;
//   avatar?: string;
//   bio?: string;
//   location?: Country;
//   linkedIn?: string;
//   instagram?: string;
//   facebook?: string;
//   dribble?: string;
//   github?: string;
//   behance?: string;
//   x?: string;
//   website?: string;
//   number_of_designs?: string;
//   number_of_likes: string | number;
//   number_of_shares: string | number;
//   number_of_views: string | number;
//   user: User;
// };

export interface ITag {
  id?: string;
  tagID?: string;
  name?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFetchTagQuery {
  search?: string;
  page?: number;
  limit?: number;
}

export interface ICategory {
  id?: string;
  name?: string;
  description?: string;
  parent_category_id?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFetchCategoryQuery {
  name?: string;
  search?: string;
  page?: number;
  limit?: number;
}
