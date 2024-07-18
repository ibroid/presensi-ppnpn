import { Preferences } from "@capacitor/preferences";
import { useCallback, useEffect, useReducer } from "react";
import { User } from "../context/AuthContext";
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";
import { useIonViewDidEnter } from "@ionic/react";

export type CheckAuthStateType = {
  user: User | null;
  isLoading: boolean;
  error: boolean;
  errorMessage: string | any;
  token: string | null
}

export type CheckAuthActionType = {
  type: "FETCH_ERROR" | "FETCH_SUCCESS" | "MISSING_TOKEN" | "SET_TOKEN";
  payload?: any;
}

function reducer(state: CheckAuthStateType, action: CheckAuthActionType) {
  switch (action.type) {
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload
      }

    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: false,
        user: action.payload
      }

    case "MISSING_TOKEN":
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: "Token Not Provided"
      }

    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload
      }
  }
}

export default function useCheckAuth() {

  const [state, dispatch] = useReducer(reducer, {
    user: null,
    isLoading: true,
    error: false,
    errorMessage: "",
    token: null
  } as CheckAuthStateType)

  const fetchUser = useCallback(async () => {
    const { value } = await Preferences.get({ key: 'token' })

    if (!value) {
      dispatch({ type: "MISSING_TOKEN" })
      return;
    }

    try {
      const res = await httpInstance(value).get<any>('/user')
      dispatch({ type: "FETCH_SUCCESS", payload: res.data.user })
      dispatch({ type: "SET_TOKEN", payload: value })
    } catch (err: any) {
      if (err instanceof AxiosError && err.isAxiosError) {
        dispatch({ type: "FETCH_ERROR", payload: err.response?.data.message ?? err.response?.data.error.message })
      } else {
        dispatch({ type: "FETCH_ERROR", payload: err.message })
      }
    }
  }, [])

  useEffect(() => {
    fetchUser()

  }, [fetchUser])


  return state;
}