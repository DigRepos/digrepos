import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { userSetAction } from "../../containers/User/action"
import { User } from "../../interfaces"
import OAuthButton from "./index"

const OAuthButtonContainer: React.FC<{}> = () => {
  
  const dispatch = useDispatch<Dispatch>()

  const userSetDispatcher = useCallback(
    (user: User) => {
      dispatch(userSetAction(user))
    },
    [dispatch]
  )

  return <OAuthButton userSetDispatcher={userSetDispatcher}/>
}

export default OAuthButtonContainer
