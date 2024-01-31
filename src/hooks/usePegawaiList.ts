import { useEffect, useState } from "react";
import { IPegawaiResponse } from "../interfaces/IResponse";
import { IFetchHook } from "../interfaces/IHooks";

export default function usePegawaiList() {
    const [pegawai, setPegawai] = useState<IFetchHook<IPegawaiResponse[]> | undefined>();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    let controller: { signal: AbortSignal; abort: () => void };

    useEffect(() => {
        controller = new AbortController();
        setLoading(true);



        return () => controller.abort();
    }, [])

    return { pegawai, error, loading }
}