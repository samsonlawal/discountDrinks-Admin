import { AxiosResponse } from "axios";

export type TLoginService = {
  payload: {
    email?: string;
    password?: string;
  };
};

export interface AuthInterface {
  login: ({ payload }: TLoginService) => Promise<AxiosResponse<any, any>>;
}
