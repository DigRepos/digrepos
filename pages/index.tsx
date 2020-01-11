import * as React from "react"
import Layout from "../components/Layout"
import Dashboard from "../containers/Dashboard"
import { NextPage } from "next"
import { Provider } from "react-redux"
import { store } from "../containers/store"
import { ApolloProvider } from "@apollo/react-hooks"
import client from "../shared/gql-client"

const IndexPage: NextPage = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Layout>
          <Dashboard />
        </Layout>
      </Provider>
    </ApolloProvider>
  )
}

export default IndexPage
