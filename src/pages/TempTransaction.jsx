import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractArtifact from "../../artifacts/contracts/HandleTransaction.sol/RealEstateTransaction.json";
import contractConfig from "../config/contractConfig";

export default function TempTransaction() {
  const [properties, setProperties] = useState([]);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  // Replace with your actual deployed contract address
  const CONTRACT_ADDRESS = contractConfig.transactionAddress;

  // Connect wallet and fetch properties
  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);

          // Create provider and contract instance
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contractInstance = new ethers.Contract(
            CONTRACT_ADDRESS,
            contractArtifact.abi,
            signer
          );
          setContract(contractInstance);

          // Fetch properties
          await fetchProperties(contractInstance);
        } catch (error) {
          console.error("Failed to connect wallet", error);
        }
      } else {
        alert("Please install MetaMask!");
      }
    };

    connectWallet();
  }, []);

  // Fetch properties from the contract
  const fetchProperties = async (contractInstance) => {
    try {
      const propertyCount = await contractInstance.getPropertyCount();
      const propertyList = [];

      for (let i = 0; i < propertyCount; i++) {
        const property = await contractInstance.getPropertyDetails(i);
        propertyList.push({
          id: i,
          name: property.propertyName,
          address: property.propertyAddress,
          seller: property.seller,
          price: ethers.utils.formatEther(property.price),
          sold: property.sold,
        });
      }

      setProperties(propertyList);
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };

  // Buy property function
  const handleBuyProperty = async (propertyId, price) => {
    if (!contract || !account) {
      alert("Please connect wallet first");
      return;
    }

    try {
      const transaction = await contract.buyProperty(propertyId, {
        value: ethers.utils.parseEther(price),
      });
      await transaction.wait();

      // Refresh properties after purchase
      await fetchProperties(contract);
      alert("Property purchased successfully!");
    } catch (error) {
      console.error("Purchase failed", error);
      alert("Purchase failed: " + error.message);
    }
  };

  // Truncate Ethereum address for display
  const truncateAddress = (address) => {
    return address
      ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      : "";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Real Estate Properties</h1>

      {!account ? (
        <div className="alert alert-warning shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Please connect your wallet</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{property.name}</h2>
                <p>Address {property.address}</p>
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">Seller:</span>{" "}
                    {truncateAddress(property.seller)}
                  </p>
                  <p>
                    <span className="font-bold">Price:</span> {property.price}{" "}
                    ETH
                  </p>
                  <p>
                    <span className="font-bold">Status:</span>
                    <span
                      className={
                        property.sold ? "text-red-500" : "text-green-500"
                      }
                    >
                      {property.sold ? "Sold" : "Available"}
                    </span>
                  </p>

                  <div className="card-actions justify-end">
                    <button
                      onClick={() =>
                        handleBuyProperty(property.id, property.price)
                      }
                      disabled={property.sold}
                      className="btn btn-primary w-full"
                    >
                      {property.sold ? "Sold Out" : "Buy Property"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
