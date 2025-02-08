import { useAccount as useEthAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { ChainType } from "@lifi/sdk";

export const useAccount = (chainType?: ChainType) => {
  const { isConnected: isEthConnected, address: ethAddress } = useEthAccount();

  const { publicKey, connected: isSolConnected } = useWallet();

  const solAddress = publicKey?.toString() || null;

  return {
    isConnected: chainType === ChainType.EVM ? isEthConnected : isSolConnected,
    accountAddress: chainType === ChainType.EVM ? ethAddress : solAddress,
  };
};
