import { useAccount as useWagmiAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { ChainType } from "@lifi/sdk";
import { useConfig as useBigmiConfig } from "@bigmi/react";

export const useAccount = (chainType?: ChainType) => {
  // EVM
  const { isConnected: isEthConnected, address: ethAddress } =
    useWagmiAccount();

  // SVM
  const { publicKey, connected: isSolConnected } = useWallet();

  // UTXO
  const bigmiConfig = useBigmiConfig();
  const { isConnected: utxoConnected, address: utxoAddress } = useWagmiAccount({
    config: bigmiConfig,
  });

  const solAddress = publicKey?.toString() || null;

  const chainMap = {
    [ChainType.EVM]: {
      isConnected: isEthConnected,
      accountAddress: ethAddress || null,
    },
    [ChainType.UTXO]: {
      isConnected: utxoConnected,
      accountAddress: utxoAddress || null,
    },
    [ChainType.SVM]: {
      isConnected: isSolConnected,
      accountAddress: solAddress || null,
    },
  };

  const defaultAccount = { isConnected: false, accountAddress: null };

  if (!chainType) {
    return defaultAccount;
  }

  return chainMap[chainType];
};
