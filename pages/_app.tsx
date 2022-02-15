import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default App;
