import { useReducer } from "react";
import {
  TEST
} from "./actions";

export default function reducers(state, action) {
  switch (action.type) {
    case TEST:
        return {
            ...state
        }

    default:
      return state;
  }
};