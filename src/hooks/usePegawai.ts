import { useEffect, useState } from "react";
import { IUsePegawaiProp } from "../interfaces/IProps";
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


        return () => controller.abort()

    }, [prop.pegawaiId])

    return { pegawai, error, loading }

}