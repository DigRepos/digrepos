import * as React from "react"
import { NextPage } from "next"
import Head from "next/head"
import SigninButton from "../components/OAuthButton"

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Digrepos</title>
      </Head>
      <SigninButton />
    </>
  )
}

export default LoginPage
