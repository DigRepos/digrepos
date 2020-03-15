import * as React from "react"
import { NextPage } from "next"
import firebase from "firebase"
import firebaseApp from "../shared/firebaseApp"
import Head from "next/head"

const LoginPage: NextPage = () => {
  
  const signInButtonClicked = () => {
    const provider = new firebase.auth.GithubAuthProvider()
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <>
      <Head>
        <title>Digrepos</title>
      </Head>
      <button onClick={signInButtonClicked}>{"ログイン"}</button>
    </>
  )
}

export default LoginPage
