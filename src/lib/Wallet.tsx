// src/lib/wallet.ts

interface EIP6963ProviderDetail {
  info: {
    uuid: string;
    name: string;
    icon: string;
    rdns: string;
  };
  provider: EthereumProvider;
}

interface EthereumProvider {
  isMetaMask?: boolean;
  isPhantom?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (eventName: string, handler: (params: unknown) => void) => void;
  removeListener?: (
    eventName: string,
    handler: (params: unknown) => void
  ) => void;
  providers?: EthereumProvider[]; // Legacy multi-provider support
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    // EIP-6963 event listener support
    addEventListener(
      type: "eip6963:announceProvider",
      listener: (event: CustomEvent<EIP6963ProviderDetail>) => void
    ): void;
  }
}

export const connectToWallet = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null;

  // 1. Snapshot the EIP-6963 providers (Modern Standard)
  // We use a promise to wait briefly for providers to announce themselves if they haven't yet
  const getProviders = () =>
    new Promise<EIP6963ProviderDetail[]>((resolve) => {
      const providers: EIP6963ProviderDetail[] = [];
      
      const onAnnounce = (event: CustomEvent<EIP6963ProviderDetail>) => {
        if (!providers.some((p) => p.info.uuid === event.detail.info.uuid)) {
          providers.push(event.detail);
        }
      };

      window.addEventListener("eip6963:announceProvider", onAnnounce as EventListener);
      window.dispatchEvent(new Event("eip6963:requestProvider"));

      // Wait 50ms for extensions to respond (usually instant)
      setTimeout(() => {
        window.removeEventListener("eip6963:announceProvider", onAnnounce as EventListener);
        resolve(providers);
      }, 100);
    });

  const providers = await getProviders();
  let selectedProvider: EthereumProvider | undefined;

  // 2. Select the best provider
  if (providers.length > 0) {
    // Prefer MetaMask to avoid Phantom EVM conflicts if both are present
    const metaMask = providers.find((p) => p.info.name.toLowerCase().includes("metamask"));
    selectedProvider = metaMask?.provider || providers[0].provider;
  } else {
    // Fallback to legacy window.ethereum
    selectedProvider = window.ethereum;
    
    // Handle legacy 'providers' array (e.g., Coinbase Wallet + MetaMask old conflict)
    if (selectedProvider?.providers) {
      selectedProvider = selectedProvider.providers.find(p => p.isMetaMask) || selectedProvider.providers[0];
    }
  }

  if (!selectedProvider) {
    alert("No Ethereum wallet found. Please install MetaMask.");
    window.open("https://metamask.io/download/", "_blank");
    return null;
  }

  try {
    // 3. Request Connection
    // using 'any' cast to avoid strict typing issues with varying provider implementations
    const accounts = (await selectedProvider.request({
      method: "eth_requestAccounts",
    })) as string[];

    if (accounts && Array.isArray(accounts) && accounts.length > 0) {
      return accounts[0];
    }
  } catch (error: any) {
    console.error("Wallet connection failed:", error);
    if (error?.message?.includes("Unexpected error") || error?.code === -32603) {
      alert("Wallet connection error. If you have Phantom and MetaMask installed, please try disabling one or ensure the correct one is unlocked.");
    }
  }

  return null;
};

// Helper to format address (e.g., 0x1234...abcd)
export const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};