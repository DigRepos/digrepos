import * as React from "react"
import { NextPage } from "next"
import Head from "next/head"
import OAuthButton from "../components/OAuthButton/container"
import { Provider } from "react-redux"
import { store } from "../containers/store"

const LoginPage: NextPage = () => {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Digrepos</title>
        </Head>
        <OAuthButton />
      </Provider>
    </>
  )
}

export default LoginPage
