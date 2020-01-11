import ApolloClient from 'apollo-client'
import  { InMemoryCache } from "apollo-cache-inmemory"
import fetch from "cross-fetch"
import { createHttpLink } from "apollo-link-http"

const cache = new InMemoryCache()
const link = createHttpLink({
  uri: "https://api.github.com/graphql",
  fetch
})

const client = new ApolloClient({
  link: link,
  cache: cache,
})

export default client