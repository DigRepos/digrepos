import * as React from "react"
import { NextPage } from "next"
import firebase from "firebase/app"
import Head from "next/head"

const LoginPage: NextPage = () => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const signInButtonClicked = () => {
    if (app.auth().currentUser) return
    const provider = new firebase.auth.GithubAuthProvider()
    firebase
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
