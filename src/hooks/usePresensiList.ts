import { useContext, useEffect, useState } from "react";
import { Presence } from "../interfaces/IResponse";
import { httpInstance } from "../utils/HttpClient";
import { AuthContext } from "../context/AuthContext";
import { AxiosError } from "axios";

export default function usePresensiList() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [presensi, setPresensi] = useState<Presence[]>([]);
    const { state } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState<string>("");

    let controller: { signal: AbortSignal; abort: () => void };

    useEffect(() => {
        controller = new AbortController()
        setLoading(true);
        const signal = controller.signal;
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

            .finally(() => setLoading(false))

        return () => controller.abort();
    }, [])

    return { loading, error, presensi, errorMessage };
}