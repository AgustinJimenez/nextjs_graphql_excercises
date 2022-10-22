import "../styles/globals.css";
import type { AppProps } from "next/app";
import ApolloClientProvider from "../src/providers/ApolloClientProvider";

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloClientProvider>
    <Component {...pageProps} />
  </ApolloClientProvider>
);

export default App;
