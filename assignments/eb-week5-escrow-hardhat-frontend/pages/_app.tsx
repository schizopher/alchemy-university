import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import React from "react";
import { AppProps } from "next/app";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/MainLayout";

const { chains, provider } = configureChains([localhost], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Escrow DApp",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { WagmiConfig, RainbowKitProvider };

function App({ Component, pageProps }: AppProps) {
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      if (!isReconnected) router.reload();
    },
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        initialChain={localhost}
        chains={chains}
      >
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
