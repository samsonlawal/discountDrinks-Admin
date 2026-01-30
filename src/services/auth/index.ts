import axios from "axios";
import env from "@/config/env";

import { AuthInterface, TLoginService } from "./types";

class Service implements AuthInterface {
  login({ payload }: TLoginService) {
    return axios.post(env.api.auth + "/login", payload);
  }
}

const AuthService = new Service();
export default AuthService;
