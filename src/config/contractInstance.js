import { ethers } from "ethers";
import contractArtifact from "../../artifacts/contracts/HandleTransaction.sol/RealEstateTransaction.json";
import contractConfig from "./contractConfig";

const CONTRACT_ADDRESS = contractConfig.transactionAddress;

// Initialize provider and contract instance
let provider;
let signer;
let contractInstance;

if (window.ethereum) {
  try {
    // Create an ethers provider using MetaMask
    provider = new ethers.providers.Web3Provider(window.ethereum);

    // Prompt user to connect MetaMask
    await provider.send("eth_requestAccounts", []);

    // Get the signer (current connected account)
    signer = provider.getSigner();

    // Create contract instance with signer
    contractInstance = new ethers.Contract(
      CONTRACT_ADDRESS,
      contractArtifact.abi,
      signer
    );
  } catch (error) {
    console.error("Error initializing transaction contract instance: ", error);
  }
} else {
  console.error("MetaMask is not installed!");
}

export { provider, signer, contractInstance };
