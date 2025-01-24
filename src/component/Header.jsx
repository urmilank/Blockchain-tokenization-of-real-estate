import { useEffect } from "react";
import getCurrentAccount from "../functions/getCurrentAccount";
import { currentAccount } from "../centralState";
import { useAtom } from "jotai";

export default function Header() {
  const [account, setAccount] = useAtom(currentAccount);

  // Fetches and sets account to global state if already logged in
  const fetchAccount = async () => {
    try {
      const acc = await getCurrentAccount();
      setAccount(acc);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  useEffect(() => {
    fetchAccount();

    // Listen for account changes
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null); // User has disconnected
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Cleanup event listener on component unmount
      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    } else {
      console.error("MetaMask is not installed.");
    }
  }, []);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <button>
            <span className="text-2xl">Aetherion Nexus</span>
          </button>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {account ? (
            <div className="flex items-center space-x-4">
              {/*To display first and last few digits of account address next to logout button*/}
              <span className="text-sm">
                {account.substring(0, 6)}...
                {account.substring(account.length - 4)}
              </span>
              <button
                onClick={() => setAccount(null)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="btn" onClick={fetchAccount}>
              <div className="flex">
                <label>Login</label>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
