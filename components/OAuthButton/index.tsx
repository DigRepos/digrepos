import * as React from "react"
import { useRouter } from "next/router"
import firebase from "firebase"
import firebaseApp from "../../shared/firebaseApp"
import { User } from "../../interfaces"

type Props = {
  userSetDispatcher: (user: User) => void
}

const OAuthButton: React.FC<Props> = props => {
  const router = useRouter()

  const buttonClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const provider = new firebase.auth.GithubAuthProvider()
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const { credential, additionalUserInfo } = result
        // credentialの型情報に'accessToken'プロパティが含まれず、
        // コンパイルが通らないので応急措置のany
        const c = credential as any
        props.userSetDispatcher({
          userName: !additionalUserInfo
            ? ""
            : additionalUserInfo.username || "",
          accessToken: !c ? "" : c.accessToken || ""
        })
        router.push("/")
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <button onClick={e => buttonClicked(e)}>{"Sign in"}</button>
    </>
  )
}

export default OAuthButton
