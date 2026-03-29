"use client";
import * as React from "react";
import axios from "axios";
import env from "@/config/env";


let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;

function useAxiosDefaults({ accessToken }: { accessToken?: string }) {
  React.useEffect(() => {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.withCredentials = true;

    if (accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }

    // Remove any previous interceptors before adding new ones
    if (requestInterceptorId !== null) {
      axios.interceptors.request.eject(requestInterceptorId);
    }
    if (responseInterceptorId !== null) {
      axios.interceptors.response.eject(responseInterceptorId);
    }

    // Request interceptor to ensure token is sent with every request
    requestInterceptorId = axios.interceptors.request.use(
      (config) => {
        const persistData = localStorage.getItem(env.auth.PERSIST_AUTH_KEY);
        if (persistData) {
          try {
            const parsed = JSON.parse(persistData);
            if (parsed.accessToken) {
              config.headers.Authorization = `Bearer ${parsed.accessToken}`;
            }
          } catch (e) {
            console.error("Error parsing auth state from localStorage:", e);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle authentication errors
    responseInterceptorId = axios.interceptors.response.use(
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
