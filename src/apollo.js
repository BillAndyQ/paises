import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

Vue.use(VueApollo);

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/', 
  cache: new InMemoryCache(),
});

export const apolloProvider = new VueApollo({
  defaultClient: client,
});
