"use client";
import * as React from "react";
import axios, { AxiosError } from "axios";
import env from "@/config/env";
// import { useAuthContext } from '@/context/AuthContext';

function isUnAuthorizedError(error: Error | AxiosError | any) {
  return error?.config && error?.response && error?.response?.status === 403;
}

let tokenExpiresRetires = 0;

function useAxiosDefaults({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken?: string;
}) {
  //------------------------------------
  //Axios defauls
  //------------------------------------
  axios.defaults.headers.post["Content-Type"] = "application/json";
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
  axios.defaults.withCredentials = true;
  console.log("refreshToken", refreshToken);

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      const originalRequest = error.config;

      if (isUnAuthorizedError(error) && tokenExpiresRetires < 3) {
        console.log("tokenExpiresRetires", tokenExpiresRetires);
        tokenExpiresRetires++;
        console.log("refreshToken", refreshToken);
        // GET NEW ACCESS TOKEN
        axios
          .post(env.api.auth + "/refresh", {
            refreshToken,
          })
          .then((response) => {
            console.log("response", response);
          })
          .catch(() => {
            return Promise.reject(error);
          });

        // RETRY ORIGINAL REQUEST
        return axios(originalRequest);
      }

      return Promise.reject(error);
    },
  );

  React.useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }, [accessToken]);
}

export default useAxiosDefaults;
