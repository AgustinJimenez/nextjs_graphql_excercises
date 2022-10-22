import {
  ApolloProvider,
  ApolloClient as BaseClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";

const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`starting request for ${operation.operationName}`);
  return forward(operation).map((data) => {
    console.log(`ending request for ${operation.operationName}`);
    return data;
  });
});
const reportErrors = (errorCallback) =>
  new ApolloLink((operation, forward) => {
    const observable = forward(operation);
    // errors will be sent to the errorCallback
    observable.subscribe({ error: errorCallback });
    return observable;
  });
const errorLink = reportErrors(console.error);

const link = ApolloLink.from([consoleLink, errorLink]);

export const ApolloClient = new BaseClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    // ssrMode: typeof window === "undefined",
    uri: "http://127.0.0.1:8080/",
    headers: {},
  }),
});
const ApolloClientProvider = ({ children }: any) => (
  <ApolloProvider client={ApolloClient}>{children}</ApolloProvider>
);

export default ApolloClientProvider;
