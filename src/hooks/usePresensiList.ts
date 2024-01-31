import { useEffect, useState } from "react";
import { IFetchHook } from "../interfaces/IHooks";
import { IPresensiResponse } from "../interfaces/IResponse";
import { IUsePresensiList } from "../interfaces/IProps";

export default function usePresensiList(prop: IUsePresensiList) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [presensi, setPresensi] = useState<IFetchHook<IPresensiResponse[]> | undefined>();

    let controller: { signal: AbortSignal; abort: () => void };

    useEffect(() => {
        controller = new AbortController()
        setLoading(true);


        return () => controller.abort();
    }, [prop.pegawaiId, prop.timestamp])

    return { loading, error, presensi };
}