import * as React from "react"
import { useRouter } from "next/router"
import firebase from "firebase"
import firebaseApp from "../../shared/firebaseApp"

const OAuthButton: React.FC<{}> = () => {
  const router = useRouter()

  const buttonClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const provider = new firebase.auth.GithubAuthProvider()
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const { credential, additionalUserInfo } = result
        console.log(credential)
        console.log(additionalUserInfo)
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
