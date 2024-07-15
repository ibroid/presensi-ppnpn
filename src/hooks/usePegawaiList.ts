import { useEffect, useState } from "react";
import { IPegawaiResponse } from "../interfaces/IResponse";
<<<<<<< HEAD
import { IFetchHook } from "../interfaces/IHooks";
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";

export default function usePegawaiList() {
    const [pegawais, setPegawais] = useState<IPegawaiResponse[] | []>([]);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
=======
import { supabase } from "../utils/SupabaseClient";
import { IFetchHook } from "../interfaces/IHooks";

export default function usePegawaiList() {
    const [pegawai, setPegawai] = useState<IFetchHook<IPegawaiResponse[]> | undefined>();
    const [error, setError] = useState<boolean>(false);
>>>>>>> main
    const [loading, setLoading] = useState<boolean>(false);
    let controller: { signal: AbortSignal; abort: () => void };

    useEffect(() => {
        controller = new AbortController();
        setLoading(true);

<<<<<<< HEAD
        httpInstance(null).get<IPegawaiResponse[]>("/pegawais", { signal: controller.signal })
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


=======
        supabase.from('ppnpn').select('*').abortSignal(controller.signal)
            .then(({ data, error, count, status, statusText }) => {
                if (data) {
                    setPegawai({
                        count,
                        status,
                        message: statusText,
                        data: data as IPegawaiResponse[]
                    })
                }

                if (error) {
                    setPegawai({
                        count,
                        status,
                        message: statusText,
                        data: []
                    })
                    setError(true)
                }

                setLoading(false);
            })
>>>>>>> main

        return () => controller.abort();
    }, [])

<<<<<<< HEAD
    return { pegawais, error, loading }
=======
    return { pegawai, error, loading }
>>>>>>> main
}