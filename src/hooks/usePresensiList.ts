import { useCallback, useEffect, useRef, useState } from "react";
import { Presence } from "../interfaces/IResponse";
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";
import { Preferences } from "@capacitor/preferences";

export default function usePresensiList() {
    let controllerRef: any = useRef<AbortController | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [presensi, setPresensi] = useState<Presence[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const fetchPresensi = useCallback(async () => {
        const { value } = await Preferences.get({ key: "token" });
        if (!value) {
            setErrorMessage("Token Not Provided");
            setError(true);
        }

        try {
            const res = await httpInstance(value).get<Presence[]>("/presence",
                { signal: controllerRef.current?.signal }
            );

            setPresensi(res.data);

        } catch (err: Error | any) {
            console.log(err)
            if (err instanceof AxiosError && err.isAxiosError) {
                setErrorMessage(err.response?.data.message ?? err.response?.data.error.message);
            } else {
                setErrorMessage(err.message);
            }
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [])

    const abortFethchPresensi = () => {
        if (controllerRef.current !== null) {
            controllerRef.current.abort();
        }
    }


    useEffect(() => {
        if (controllerRef.current === null) {
            controllerRef.current = new AbortController();
        }

        fetchPresensi();

    }, [fetchPresensi]);

    return { loading, error, presensi, errorMessage, fetchPresensi, abortFethchPresensi };
}

