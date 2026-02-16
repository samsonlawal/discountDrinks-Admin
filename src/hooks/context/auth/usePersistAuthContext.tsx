"use client";
import { useEffect } from "react";
import env from "@/config/env";

import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@/utils/localStorage/AsyncStorage";

const PERSIST_AUTH_KEY = env?.auth?.PERSIST_AUTH_KEY;
const INITIAL_APP_STATE = env?.auth?.INITIAL_APP_STATE;

const usePersistAppContext = ({
  appState,
  setAppState = () => null,
}: {
  appState?: any;
  setAppState?: any;
}) => {
  useEffect(() => {
    console.log("[Auth] Reading from localStorage on mount");
    getFromLocalStorage({ cb: setAppState, key: PERSIST_AUTH_KEY });
  }, []);

  useEffect(() => {
    // Save to localStorage whenever appState changes and has an accessToken
    // Don't use object reference comparison (appState !== INITIAL_APP_STATE) as it always fails
    if (appState?.accessToken) {
      console.log("[Auth] Saving to localStorage:", appState);
      saveToLocalStorage({
        key: PERSIST_AUTH_KEY,
        value: appState,
      });
    }
  }, [appState]);

  return null;
};

export const getInitialStateFromLocalStorage = () => {
  const storage = typeof window !== "undefined" ? window.localStorage : null;

  const value = storage?.getItem(PERSIST_AUTH_KEY);
  return value ? JSON.parse(value) : INITIAL_APP_STATE;
};

export default usePersistAppContext;
