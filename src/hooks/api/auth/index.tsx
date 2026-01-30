import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
// import { useUpdateAuthContext } from "@/context/AuthContext";

import env from "@/config/env";
import { AxiosError } from "axios";
import { AuthInterface } from "@/services/auth/types";

const INITIAL_APP_STATE = env.auth.INITIAL_APP_STATE;

export const useLoginUser = ({ Service }: { Service: AuthInterface }) => {
  const [loading, setLoading] = useState(false);
  // const updateAppState = useUpdateAuthContext();

  const onLogin = async ({
    payload,
    successCallback,
  }: {
    payload: { email: string; password: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await Service.login({ payload });
      // updateAppState({
      //   accessToken: res?.data?.data?.accessToken,
      //   refreshToken: res?.data?.data?.refreshToken,
      //   user: { id: res?.data?.data?.userId },
      // });

      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "🚀 Login success!",
        description: res?.data?.description || "",
      });
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "An error occured!",
        description: error?.response?.data?.description || "",
      });
      setLoading(false);
    } finally {
    }
  };

  return { loading, onLogin };
};

// export function useLogout() {
//   const updateAppState = useUpdateAuthContext();

//   const onLogout = () => {
//     updateAppState(INITIAL_APP_STATE);
//   };

//   return { onLogout };
// }
