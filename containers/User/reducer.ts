import { User } from "../../interfaces"
import { SET_USER } from "../actionTypes"
import { schemaDefinitionNotAloneMessage } from "graphql/validation/rules/LoneSchemaDefinition"

const initialState: User = {
  userName: "",
  accessToken: ""
}

export function userReducer(
  state: User = initialState,
  action: { type: string; payload: User }
) {
  switch (action.type) {
    case SET_USER:
      return state
    default:
      return initialState
  }
}
