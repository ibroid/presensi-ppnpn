import { useCallback, useEffect, useReducer } from "react";
import { ActivityModel } from "../interfaces/IHooks";
import { Preferences } from "@capacitor/preferences";
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";

export type CreateActivityStateType = {
  postLoading: boolean;
  postError: boolean;
  postErrorMessage: string;
  postResponse?: any;
}

export type CreateActivityActionType = {
  type: "FETCH_ERROR" | "FETCH_SUCCESS" | "MISSING_TOKEN";
  payload?: any;
}

const reducer = (state: CreateActivityStateType, action: CreateActivityActionType) => {
  switch (action.type) {
    case "MISSING_TOKEN":
      return {
        ...state,
        postLoading: false,
        postError: true,
        postErrorMessage: "Missing Token",
      }
    case "FETCH_ERROR":
      return {
        ...state,
        postLoading: false,
        postError: true,
        postErrorMessage: action.payload,
      }
    case "FETCH_SUCCESS":
      return {
        ...state,
        postLoading: false,
        postError: false,
        postResponse: action.payload,
      }
  }
}

export default function useCreateActivity(callback?: any) {
  const [state, dispatch] = useReducer(reducer, {
    postLoading: false,
    postError: false,
    postErrorMessage: '',
  })

  const createActivity = useCallback(async (data: ActivityModel) => {
    const { value } = await Preferences.get({ key: 'token' })

    if (!value) {
      dispatch({ type: "MISSING_TOKEN" })
      return;
    }

    try {
      const response = await httpInstance(value).post('/activity', data)
      dispatch({ type: "FETCH_SUCCESS", payload: response.data })
    } catch (error: any) {
      if (error instanceof AxiosError && error.isAxiosError) {
        dispatch({ type: "FETCH_ERROR", payload: error.response?.data.message ?? error.response?.data.error.message })
      } else {
        dispatch({ type: "FETCH_ERROR", payload: error.message })
      }
    }

    callback && callback()
  }, [callback])

  return { ...state, createActivity }
}