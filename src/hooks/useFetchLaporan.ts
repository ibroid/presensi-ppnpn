import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { httpInstance } from "../utils/HttpClient";
import { Preferences } from "@capacitor/preferences";
import { AxiosError } from "axios";
import { LaporanResponse } from "../interfaces/IResponse";

export type FetchLaporanParamType = {
  bulan?: number,
  tahun?: number,
  employee_id?: number
}

export type FetchLaporanStateType = {
  loading: boolean,
  error: boolean,
  errorMessage: string,
  data?: LaporanResponse[]
}

export type FetchLaporanActionType = {
  type: "FETCH_ERROR" | "FETCH_SUCCESS" | "FETCHING",
  payload: {
    errorMessage?: string
    data?: LaporanResponse[]
  }
}

function reducer(state: FetchLaporanStateType, action: FetchLaporanActionType): FetchLaporanStateType {
  switch (action.type) {
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: `Terjadi kesalahan. ${action.payload.errorMessage ?? ""}`
      }
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data
      }
    case "FETCHING":
      return {
        ...state,
        loading: true,
        data: []
      }
  }
}

const initialState: FetchLaporanStateType = {
  loading: false,
  error: false,
  errorMessage: "",
  data: []
}

export default function useFetchLaporan(manual?: boolean) {

  const [state, dispatch] = useReducer(reducer, initialState);
  const controller = useRef<AbortController | null>(null);

  const getCurrentMonth = useMemo(() => {
    const date = new Date();
    const month = date.getMonth() + 1;
    return month;
  }, []);

  const getCurrentYear = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    return year;
  }, []);

  const fetchLaporan = useCallback(async ({ bulan, tahun, employee_id }: FetchLaporanParamType) => {
    dispatch({ type: "FETCHING", payload: {} });

    const { value } = await Preferences.get({ key: 'token' });
    if (!value) {
      return;
    }

    try {
      let body = employee_id ? {
        bulan,
        tahun,
        employee_id
      } : {
        bulan,
        tahun
      }

      const res = await httpInstance(value).post('/laporan/periode', body, {
        signal: controller.current?.signal
      });
      dispatch({ type: "FETCH_SUCCESS", payload: { data: res.data } });
    } catch (err: any) {
      if (err instanceof AxiosError && err.isAxiosError) {
        dispatch({ type: "FETCH_ERROR", payload: { errorMessage: err.response?.data.message ?? err.response?.data.error.message } });
      } else {
        dispatch({ type: "FETCH_ERROR", payload: { errorMessage: err.message } });
      }
    }
  }, []);

  const cancelFetchLaporan = () => {
    controller.current?.abort();
  }

  useEffect(() => {
    controller.current = new AbortController();

    if (!manual) {
      fetchLaporan({ bulan: getCurrentMonth, tahun: getCurrentYear });
    }

    return () => {
      cancelFetchLaporan()
    }
  }, [fetchLaporan, getCurrentMonth, getCurrentYear, manual]);

  return { fetchLaporan, ...state, cancelFetchLaporan };
}