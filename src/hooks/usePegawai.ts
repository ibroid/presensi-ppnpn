import { useEffect, useState } from "react";
import { IUsePegawaiProp } from "../interfaces/IProps";
<<<<<<< HEAD
=======
import { supabase } from "../utils/SupabaseClient";
>>>>>>> main
import { IFetchHook } from "../interfaces/IHooks";
import { IPegawaiResponse } from "../interfaces/IResponse";

export function usePegawai(prop: IUsePegawaiProp) {
    const [pegawai, setPegawai] = useState<IFetchHook<IPegawaiResponse | undefined>>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    let controller: { signal: AbortSignal, abort: () => void };

    useEffect(() => {
        setLoading(true);
        controller = new AbortController();

<<<<<<< HEAD

=======
        supabase
            .from('ppnpn')
            .select('*')
            .eq('id', prop.pegawaiId)
            .abortSignal(controller.signal)
            .single()
            .then(({ count, data, error, status, statusText }) => {
                if (error) {
                    setPegawai({ count, data: undefined, message: statusText, status })
                    setError(true)
                }

                if (data) {
                    setPegawai({ count, data: data as IPegawaiResponse, message: statusText, status })
                }

                setLoading(false)
            })
>>>>>>> main

        return () => controller.abort()

    }, [prop.pegawaiId])

    return { pegawai, error, loading }

}