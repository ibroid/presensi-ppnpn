import { useContext, useEffect, useReducer, useRef } from "react";
import { Activity } from "../interfaces/IResponse"
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";
import { AuthContext } from "../context/AuthContext";
import { stat } from "fs";
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

  const [prestate, dispatch] = useReducer(reducer<any>, initialState)
  let AbortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (AbortControllerRef.current === null) {
      AbortControllerRef.current = new AbortController();
    }

    httpInstance().get("/activity", { signal: AbortControllerRef.current.signal })
      .then((res) => {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: res.data
        } as TodayActivityAction<Activity>)
      })
      .catch((err: any) => {
        let errorMessage: string = "Terjadi Kesalahan. "
        if (err instanceof AxiosError && err.isAxiosError) {
          errorMessage += err.response?.data.message ?? err.response?.data.error.message;
        } else {
          errorMessage += err.message;
        }

        dispatch({
          type: "FETCH_ERROR",
          payload: errorMessage
        })
      })

    return () => {
      if (AbortControllerRef.current) {
        AbortControllerRef.current.abort();
      }
    }

  }, [])

  return prestate;
}