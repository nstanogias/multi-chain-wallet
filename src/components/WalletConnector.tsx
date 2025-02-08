import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button, IconButton } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletConnector = () => {
  const { connect, connectors } = useConnect();
  const { isConnected: isEthConnected, address: ethAddress } = useAccount();
  const { disconnect } = useDisconnect();

  const {
    publicKey,
    connected: isSolConnected,
    disconnect: solDisconnect,
  } = useWallet();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">Multi-Chain Wallet Connector</h1>

      <div className="mt-3">
        {isEthConnected ? (
          <div className="flex gap-x-4 items-center justify-between">
            <p>
              <span className="font-semibold">EVM Connected: </span>
              {`${ethAddress?.slice(0, 6)}...${ethAddress?.slice(-4)}`}
            </p>
            <IconButton
              color="primary"
              onClick={() => disconnect()}
              title="Disconnect"
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => connect({ connector: connectors[0] })}
          >
            Connect Ethereum Wallet
          </Button>
        )}
      </div>

      <div className="mt-2">
        {isSolConnected ? (
          <div className="flex gap-x-4 items-center justify-between">
            <p>
              <span className="font-semibold">SVM Connected: </span>
              {`${publicKey?.toString()?.slice(0, 6)}...${publicKey
                ?.toString()
                ?.slice(-4)}`}
            </p>
            <IconButton
              color="primary"
              onClick={() => solDisconnect()}
              title="Disconnect"
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </div>
        ) : (
          <WalletMultiButton />
        )}
      </div>
    </div>
  );
};

export default WalletConnector;
