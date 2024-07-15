<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";
import { IFetchHook } from "../interfaces/IHooks";
import { IPresensiResponse } from "../interfaces/IResponse";
import { IUsePresensiList } from "../interfaces/IProps";
import { supabase } from "../utils/SupabaseClient";

export default function usePresensiList(prop: IUsePresensiList) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [presensi, setPresensi] = useState<IFetchHook<IPresensiResponse[]> | undefined>();
>>>>>>> main

    let controller: { signal: AbortSignal; abort: () => void };

    useEffect(() => {
        controller = new AbortController()
        setLoading(true);
<<<<<<< HEAD
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
=======

        supabase.from('presensi').select('*').match({
            ppnpn_id: prop.pegawaiId,
            tanggal: prop.date
        }).then(({ data, error, count, status, statusText }) => {

            if (error) {
                setPresensi({
                    count: 0,
                    status,
                    message: statusText,
                    data: []
                })
                setError(true);
            }

            if (data) {
                setPresensi({
                    count,
                    status,
                    message: statusText,
                    data: data as IPresensiResponse[]
                })
            }

            setLoading(false);
        })


        return () => controller.abort();
    }, [prop.pegawaiId, prop.timestamp])

    return { loading, error, presensi };
>>>>>>> main
}