import { Preferences } from "@capacitor/preferences";
import { useCallback, useEffect, useReducer } from "react";
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";
import { Monitor } from "../interfaces/IResponse";

export type MonitoringStateType = {
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
  data: Monitor;
}

export type MonitoringActionType = {
  type: "FETCH_ERROR" | "FETCH_SUCCESS" | "MISSING_TOKEN";
  payload?: MonitoringStateType | any | string;
}

function reducer(state: MonitoringStateType, action: MonitoringActionType): MonitoringStateType {
  switch (action.type) {
    case "FETCH_ERROR":
      return {
        data: {
          ...state.data,
          list: []
        },
        isLoading: false,
        error: true,
        errorMessage: action.payload
      }

    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.payload
      }

    case "MISSING_TOKEN":
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: "Token Not Provided"
      }
  }
}

const initialValue: MonitoringStateType = {
  data: {
    total_belum: 0,
    total_sudah: 0,
    list: []
  },
  isLoading: true,
  error: false,
  errorMessage: ""
}



export default function useMonitoringList() {

  const [state, disapach] = useReducer(reducer, initialValue)

  const fetchMonitor = useCallback(async () => {
    const { value } = await Preferences.get({ key: 'token' })

    if (!value) {
      disapach({ type: "MISSING_TOKEN" })
      return;
    }

    try {
      const res = await httpInstance(value).get<Monitor>('/monitor')
      disapach({ type: "FETCH_SUCCESS", payload: res.data })
    } catch (err: any) {
      if (err instanceof AxiosError && err.isAxiosError) {
        disapach({ type: "FETCH_ERROR", payload: "Terjadi Kesalahan. " + err.response?.data.message ?? err.response?.data.error.message })
      } else {
        disapach({ type: "FETCH_ERROR", payload: "Terjadi Kesalahan. " + err.message })
      }
    }
  }, [])

  useEffect(() => {
    fetchMonitor()
  }, [fetchMonitor])

  return { ...state, fetchMonitor }
}