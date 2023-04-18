import { useEffect, useState } from "react";
import { IPegawaiResponse } from "../interfaces/IResponse";
import { supabase } from "../utils/SupabaseClient";
import { IFetchHook } from "../interfaces/IHooks";

export default function usePegawaiList() {
    const [pegawai, setPegawai] = useState<IFetchHook<IPegawaiResponse[]> | undefined>();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    let controller: { signal: AbortSignal; abort: () => void };

    useEffect(() => {
        controller = new AbortController();
        setLoading(true);

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

        return () => controller.abort();
    }, [])

    return { pegawai, error, loading }
}