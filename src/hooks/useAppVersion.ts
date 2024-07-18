import { useCallback, useEffect, useState } from "react";
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";

export type AppVersion = {
  app_version: string;
  server_variable: {
    app_version: string;
    app_name: string;
    app_description: string;
    allow_registration: string;
  };
};

export default function useAppVersion() {
  const [appVersion, setAppVersion] = useState<AppVersion | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchAppVersion = useCallback(async () => {
    try {

      const response = await httpInstance().get<AppVersion>("/app_version");
      setAppVersion(response.data);

    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.message);
      }
      setError(true)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAppVersion();
  }, [fetchAppVersion]);

  return { appVersion, loading, error, errorMessage };

}