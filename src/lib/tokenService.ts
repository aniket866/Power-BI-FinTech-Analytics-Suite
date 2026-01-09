import { ethers } from "ethers";
import { ERC20_ABI, ERC20_BYTECODE } from "./contracts/erc20Artifact";

export interface TokenDetails {
  name: string;
  symbol: string;
  supply: string;
  decimals: string;
}

const getProvider = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No crypto wallet found. Please install MetaMask.");
  }

  // @ts-ignore
  const ethereum = window.ethereum;

  // Handle EIP-6963 (Multiple Wallets) to prioritize MetaMask
  if (ethereum.providers?.length) {
    // @ts-ignore
    const metaMaskProvider = ethereum.providers.find((p) => p.isMetaMask);
    if (metaMaskProvider) {
      return new ethers.BrowserProvider(metaMaskProvider);
    }
  }

  return new ethers.BrowserProvider(ethereum);
};

export const deployTokenContract = async (details: TokenDetails) => {
  try {
    const provider = await getProvider();
    
    // Request Account Access
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    
    // 1. Check Balance (Prevent opaque gas errors)
    const balance = await provider.getBalance(await signer.getAddress());
    if (balance === BigInt(0)) {
      throw new Error("Insufficient funds. You have 0 ETH/MATIC/BNB.");
    }

    const factory = new ethers.ContractFactory(ERC20_ABI, ERC20_BYTECODE, signer);
    
    const decimals = parseInt(details.decimals) || 18;
    const supplyWei = ethers.parseUnits(details.supply, decimals);

    // 2. FORCE GAS LIMIT: Fixes 'missing revert data' on Phantom/Simulations
    const deployTx = await factory.getDeployTransaction(details.name, details.symbol, supplyWei);
    
    // We manually estimate gas, but provide a fallback if it fails
    let estimatedGas;
    try {
        estimatedGas = await signer.estimateGas(deployTx);
    } catch (e) {
        console.warn("Gas estimation failed, using fallback gas limit.");
        estimatedGas = BigInt(3000000); // Safe default for ERC20 deployment
    }

    // Deploy with explicit gas limit to bypass simulation errors
    const contract = await factory.deploy(details.name, details.symbol, supplyWei, {
        gasLimit: (estimatedGas * BigInt(120)) / BigInt(100) // +20% buffer
    });

    await contract.waitForDeployment();
    
    const address = await contract.getAddress();
    const txHash = contract.deploymentTransaction()?.hash;

    return { success: true, address, txHash };

  } catch (error: any) {
    console.error("Deployment Error:", error);
    
    // Friendly error for Phantom conflict
    if (error?.message?.includes("Unexpected error") || error?.info?.error?.code === -32603) {
       throw new Error("Wallet conflict detected. Please disable Phantom or use MetaMask.");
    }
    
    throw new Error(error.reason || error.message || "Deployment failed");
  }
};

export const addTokenToWallet = async (address: string, symbol: string, decimals: number, image?: string) => {
  if (!window.ethereum) return;
  try {
    const provider = await getProvider();
    // @ts-ignore
    await provider.send("wallet_watchAsset", {
      type: 'ERC20',
      options: {
        address,
        symbol: symbol.slice(0, 11),
        decimals: decimals,
        image: image || '', 
      },
    });
  } catch (error) {
    console.error("Failed to add token to wallet:", error);
  }
};