import { ChainType, config, getChains } from "@lifi/sdk";
import { useSyncWagmiConfig } from "@lifi/wallet-management";
import { type FC, type PropsWithChildren } from "react";
import { createClient, http } from "viem";
import { mainnet } from "viem/chains";
import type { Config, CreateConnectorFn } from "wagmi";
import { WagmiProvider, createConfig } from "wagmi";
import { injected, metaMask } from "wagmi/connectors";
import { useQuery } from "@tanstack/react-query";

const connectors: CreateConnectorFn[] = [injected(), metaMask()];

// Create Wagmi config with default chain and without connectors
const wagmiConfig: Config = createConfig({
  chains: [mainnet],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

export const EVMBaseProvider: FC<PropsWithChildren> = ({ children }) => {
  // Load EVM chains from LI.FI API using getChains action from LI.FI SDK
  // const { chains } = useChains();

  const { data: chains } = useQuery({
    queryKey: ["chainsevm"] as const,
    queryFn: async () => {
      const chains = await getChains({
        chainTypes: [ChainType.EVM, ChainType.SVM, ChainType.UTXO],
      });
      // Update chain configuration for LI.FI SDK
      config.setChains(chains);
      return chains;
    },
  });

  console.log(chains);
  // Synchronize fetched chains with Wagmi config and update connectors
  useSyncWagmiConfig(wagmiConfig, connectors, chains);

  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
      {children}
    </WagmiProvider>
  );
};
