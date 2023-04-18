import { useEffect, useState } from "react";
import { IFetchHook } from "../interfaces/IHooks";
import { IPresensiResponse } from "../interfaces/IResponse";
import { IUsePresensiList } from "../interfaces/IProps";
import { supabase } from "../utils/SupabaseClient";

export default function usePresensiList(prop: IUsePresensiList) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [presensi, setPresensi] = useState<IFetchHook<IPresensiResponse[]> | undefined>();

    let controller: { signal: AbortSignal; abort: () => void };

    useEffect(() => {
        controller = new AbortController()
        setLoading(true);

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
}