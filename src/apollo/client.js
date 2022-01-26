import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'

const vortexSubgraphEndpoint = 'https://api.studio.thegraph.com/query/9771/testcommunity/v0.0.8'

export const vortexData = new ApolloClient({
  link: new HttpLink({ uri: vortexSubgraphEndpoint }),
  cache: new InMemoryCache(),
})
