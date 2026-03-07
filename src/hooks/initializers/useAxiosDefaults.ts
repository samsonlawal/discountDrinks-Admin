"use client";
import * as React from "react";
import axios from "axios";

let interceptorId: number | null = null;

function useAxiosDefaults({ accessToken }: { accessToken?: string }) {
  React.useEffect(() => {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.withCredentials = true;

    if (accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }

    // Remove any previous interceptor before adding a new one
    if (interceptorId !== null) {
      axios.interceptors.response.eject(interceptorId);
    }

    interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          // Silently redirect to login — do NOT reject so hooks never
          // reach their catch blocks and no error toast is shown.
          delete axios.defaults.headers.common.Authorization;
          window.location.href = "/auth/sign-in";
          return new Promise(() => {}); // permanently pending = no toast
        }
        return Promise.reject(error);
      }
    );
  }, [accessToken]);
}

export default useAxiosDefaults;
