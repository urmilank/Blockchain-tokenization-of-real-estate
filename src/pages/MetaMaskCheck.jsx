import React, { useState, useEffect } from "react";
import { AlertCircle, Wallet } from "lucide-react";
import { Link } from "react-router";
import getMetaMask from "../functions/getMetaMask";

export default function MetaMaskCheck() {
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  // Check if MetaMask is installed
  const checkMetaMaskAvailability = () => {
    if (typeof window.ethereum !== "undefined") {
      return window.ethereum.isMetaMask;
    }
    return false;
  };

  // Connect to MetaMask
  const connectToMetaMask = async () => {
    // Check if MetaMask is installed
    if (!checkMetaMaskAvailability()) {
      setError("MetaMask is not installed. Please install MetaMask.");
      return;
    }

    try {
      // Request account access
      const accounts = getMetaMask();
      setAccount(accounts);
      setIsMetaMaskConnected(true);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsMetaMaskConnected(false);
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsMetaMaskConnected(true);
        } else {
          setAccount(null);
          setIsMetaMaskConnected(false);
        }
      });

      // Cleanup listener
      return () => {
        window.ethereum.removeListener("accountsChanged", () => {});
      };
    }
  }, []);

  // Render component
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          {error ? (
            <div className="text-red-500 flex items-center justify-center gap-2">
              <AlertCircle className="w-6 h-6" />
              <p>{error}</p>
            </div>
          ) : isMetaMaskConnected ? (
            <div className="text-green-500 flex flex-col items-center gap-4">
              <Wallet className="w-12 h-12" />
              <p>Connected</p>
              <p className="text-sm text-gray-600 break-all">
                Account: {account}
              </p>
              <button className="btn btn-primary">
                <Link to="/">Continue</Link>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Wallet className="w-12 h-12 text-blue-500" />
              <button onClick={connectToMetaMask} className="btn btn-primary">
                Connect to MetaMask
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
