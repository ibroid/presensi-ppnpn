import { useEffect, useState } from "react";
import { IPegawaiResponse } from "../interfaces/IResponse";
import { IFetchHook } from "../interfaces/IHooks";
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";

export default function usePegawaiList() {
    const [pegawais, setPegawais] = useState<IPegawaiResponse[] | []>([]);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    let controller: { signal: AbortSignal; abort: () => void };

    useEffect(() => {
        controller = new AbortController();
        setLoading(true);

        httpInstance().get<IPegawaiResponse[]>("/pegawais", { signal: controller.signal })
            .then(res => {
                setPegawais(res.data)
            })
            .catch(err => {
                setError(true);
                if (err.code === "ERR_CANCELED") {
                    return;
                }

                if (err instanceof AxiosError && err.isAxiosError) {
                    setErrorMessage(err.response?.data.message ?? err.response?.data.error.message);
                } else {
                    setErrorMessage(err.message);
                }
            })
            .finally(() => setLoading(false))



        return () => controller.abort();
    }, [])

    return { pegawais, error, loading }
}