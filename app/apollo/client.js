import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

const link = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://bamistarim.ganzach.org.il/graphql" });

const client = new ApolloClient({
  link: link,
  cache: cache,
});

export default client;