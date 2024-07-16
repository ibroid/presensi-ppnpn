import { useContext, useEffect, useRef, useState } from "react";
import { Presence } from "../interfaces/IResponse";
import { httpInstance } from "../utils/HttpClient";
import { AuthContext } from "../context/AuthContext";
import { AxiosError } from "axios";

export default function usePresensiList() {
    const { state } = useContext(AuthContext);
    const controllerRef = useRef<{ signal: AbortSignal; abort: () => void } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [presensi, setPresensi] = useState<Presence[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        controllerRef.current = new AbortController();
        setLoading(true);
        const signal = controllerRef.current.signal;
        httpInstance(state.token).get<Presence[]>("/presence", { signal })
            .then((res) => {
                setPresensi(res.data);
            })
            .catch((err: any) => {
                if (err instanceof AxiosError && err.isAxiosError) {
                    setErrorMessage(err.response?.data.message ?? err.response?.data.error.message);
                } else {
                    setErrorMessage(err.message);
                }
                setError(true);
            })
            .finally(() => setLoading(false));

        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
        };
    }, [state.token]);

    return { loading, error, presensi, errorMessage };
}
