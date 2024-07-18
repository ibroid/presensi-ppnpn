import { useCallback, useEffect, useReducer, useRef } from "react";
import { Activity } from "../interfaces/IResponse"
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";
import { Preferences } from "@capacitor/preferences";
export type TodayActivityType<T> = {
  activities?: T[] | Activity[];
  loading: boolean;
  error: boolean;
  errorMessage: string | T;
}

export type TodayActivityAction<T> = {
  type: "FETCH_ERROR" | "FETCH_SUCCESS",
  payload: T
}

function reducer<T>(state: TodayActivityType<Activity>, action: TodayActivityAction<T>) {
  switch (action.type) {
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload
      }
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        activities: action.payload
      }
  }
}

const initialState: TodayActivityType<Activity> = {
  activities: [],
  loading: true,
  error: false,
  errorMessage: ""
}


export default function useTodayActivityListHook() {
  let AbortControllerRef = useRef<AbortController | null>(null);

  const fetchActivity = useCallback(async () => {
    const { value } = await Preferences.get({ key: 'token' })
    if (!value) {
      dispatch({ type: "FETCH_ERROR", payload: "Token Not Provided" });

      return;
    }

    try {
      const response = await httpInstance(value).get("/activity", { signal: AbortControllerRef.current?.signal })

      dispatch({ type: "FETCH_SUCCESS", payload: response.data })

    } catch (error: any) {
      let errorMessage: string = "Terjadi Kesalahan. ";
      if (error instanceof AxiosError && error.isAxiosError) {
        errorMessage += error.response?.data.message ?? error.response?.data.error.message;
      } else {
        errorMessage += error.message;
      }

      dispatch({
        type: "FETCH_ERROR",
        payload: errorMessage
      })
    }


  }, [])

  const [prestate, dispatch] = useReducer(reducer<any>, initialState)

  const cancelFetchActivity = () => {
    AbortControllerRef.current?.abort();
    AbortControllerRef.current = null;
  }

  useEffect(() => {
    if (AbortControllerRef.current === null) {
      AbortControllerRef.current = new AbortController();
    }

    fetchActivity()

  }, [fetchActivity])

  return { ...prestate, cancelFetchActivity, fetchActivity };
}