"use client";
import React, {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
  JSX,
} from "react";
import usePersistAppContext, {
  getInitialStateFromLocalStorage,
} from "@/hooks/context/auth/usePersistAuthContext";

import useAxiosDefaults from "@/hooks/initializers/useAxiosDefaults";
import env from "@/config/env";

import { TAuthContextProps, TAppState } from "@/types";

type UpdateAppStateFunction = Dispatch<SetStateAction<TAppState>>;

const AuthContext = createContext<TAppState>(env.auth.INITIAL_APP_STATE);
const AuthUpdateContext = createContext<UpdateAppStateFunction>(() => {});

// TO FETCH CURRENT AUTH_CONTEXT STATE
export function useAuthContext() {
  return useContext(AuthContext);
}

// TO UPDATE AUTH_CONTEXT STATE
export function useUpdateAuthContext() {
  return useContext(AuthUpdateContext);
}

const InitializeAxiosDefaults = () => {
  const { accessToken = "", refreshToken = "" } = useAuthContext();

  useAxiosDefaults({ accessToken });
  return null;
};

export function AuthContextWrapper({
  children,
}: TAuthContextProps): JSX.Element {
  const [appState, setAppState] = useState<TAppState>(
    getInitialStateFromLocalStorage,
  );

  usePersistAppContext({ appState, setAppState });

  function updateAppState(
    value: TAppState | ((prevState: TAppState) => TAppState),
  ): void {
    setAppState({ ...appState, ...value });
  }

  return (
    <AuthContext.Provider value={appState}>
      <AuthUpdateContext.Provider value={updateAppState}>
        <InitializeAxiosDefaults />
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
}
