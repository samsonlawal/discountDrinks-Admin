import axios from "axios";
import env from "@/config/env";

import { AuthInterface, TLoginService } from "./types";

class Service implements AuthInterface {
  login({ payload }: TLoginService) {
    return axios.post(env.api.auth + "/login", payload);
  }

  logout() {
    return axios.post(env.api.auth + "/logout", {
      withCredentials: true,
    });
  }
}

const AuthService = new Service();
export default AuthService;
