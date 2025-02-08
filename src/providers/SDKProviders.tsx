import { EVM, Solana, config, createConfig } from "@lifi/sdk";
import type { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { getWalletClient, switchChain } from "@wagmi/core";
import { useConfig } from "wagmi";

createConfig({
  integrator: "Your dApp/company name",
});

export const SDKProviders = () => {
  const wagmiConfig = useConfig();
  const { wallet } = useWallet();

  useEffect(() => {
    // Configure SDK Providers
    config.setProviders([
      EVM({
        getWalletClient: () => getWalletClient(wagmiConfig),
        switchChain: async (chainId) => {
          const chain = await switchChain(wagmiConfig, { chainId });
          return getWalletClient(wagmiConfig, { chainId: chain.id });
        },
      }),
      Solana({
        async getWalletAdapter() {
          return wallet?.adapter as SignerWalletAdapter;
        },
      }),
    ]);
  }, [wagmiConfig, wallet?.adapter]);

  return null;
};
