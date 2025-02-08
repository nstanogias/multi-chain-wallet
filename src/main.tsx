import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import Solana wallet adapter styles
import "@solana/wallet-adapter-react-ui/styles.css";
import { EVMBaseProvider } from "./providers/EthereumProvider.tsx";
import { SVMBaseProvider } from "./providers/SolanaProvider.tsx";
import { SDKProviders } from "./providers/SDKProviders.tsx";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <EVMBaseProvider>
        <SVMBaseProvider>
          <SDKProviders />
          <WalletModalProvider>
            <App />
          </WalletModalProvider>
        </SVMBaseProvider>
      </EVMBaseProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
