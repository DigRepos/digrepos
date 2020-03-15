import { Action } from "../types";
import { SET_USER } from "../actionTypes";
import { User } from "../../interfaces";

export function userSetAction(user: User): Action {
  return {
    type: SET_USER,
    payload: user
  }
}