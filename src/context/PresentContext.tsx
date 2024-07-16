import { createContext, Dispatch, useReducer } from "react";
import { Presence } from "../interfaces/IResponse";
import { Position } from "@capacitor/geolocation";

type PresentContextType = {
  state: {
    session: number;
    location?: Position;
    todayPresence: Presence[]
  },
  dispatch?: Dispatch<ReducerActionType<any>>
}

type ReducerActionType<T> = {
  type: "SET_LOCATION" | "SET_TODAY_PRESENT" | "SET_SESSION";
  payload: T;
}

export const PresentContext = createContext<PresentContextType>({
  state: {
    session: 0,
    location: undefined,
    todayPresence: [],
  },
  dispatch: undefined
});

function reducer(state: PresentContextType["state"], action: ReducerActionType<any>) {
  switch (action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload
      }

    case "SET_TODAY_PRESENT":
      return {
        ...state,
        todayPresence: action.payload
      }

    case "SET_SESSION":
      return {
        ...state,
        session: action.payload
      }
  }
}

export function PresentProvider({ children }: { children: React.ReactNode }) {

  const [state, dispatch] = useReducer(reducer, {
    location: null,
    session: 0,
    todayPresence: [],
  });

  return (
    <PresentContext.Provider value={{ state, dispatch }} >
      {children}
    </PresentContext.Provider>
  );
}