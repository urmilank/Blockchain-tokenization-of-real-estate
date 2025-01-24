require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545", // Default Ganache RPC
      accounts: [
        "0x20b367981d08a4c15e725dd8125e76803974cfdb791d6704d0f7475dbea3a683",
      ], // Replace with your Ganache account private key
    },
  },
};
