import React from "react";
import useAppVersion, { AppVersion } from "../hooks/useAppVersion";
import SplashScreen from "../components/SplashScreen";

type AuthContextProviderProps = {
  children: React.ReactNode
};


export const GlobalContext = React.createContext<AppVersion>({
  app_version: "",
  server_variable: {
    app_version: "",
    app_name: "",
    app_description: "",
    allow_registration: ""
  }
});

export const GlobalProvider = ({ children }: AuthContextProviderProps) => {

  const { appVersion, loading, error, errorMessage } = useAppVersion();

  return (
    <GlobalContext.Provider value={appVersion!}>
      {(loading || error) ? <SplashScreen errorMessage={errorMessage} error={error} /> : children}
    </GlobalContext.Provider>
  );
}