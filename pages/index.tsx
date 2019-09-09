import * as React from "react"
import Layout from "../components/Layout"
import Dashboard from "../containers/Dashboard"
import { NextPage } from "next"
import { Provider } from "react-redux"
import { store } from "../containers/store"

const IndexPage: NextPage = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Dashboard />
      </Layout>
    </Provider>
  )
}

export default IndexPage
