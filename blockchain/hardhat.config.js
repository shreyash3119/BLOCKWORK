require('@nomiclabs/hardhat-ethers');  // Import the necessary Hardhat plugin
require('dotenv').config();  // This loads the .env file

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",  // Version matching FreelanceEscrow.sol
      },
      {
        version: "0.8.28",  // Version matching Lock.sol
      },
    ],
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL,  // Loads the Sepolia URL from the .env file
      accounts: [process.env.PRIVATE_KEY],  // Loads the wallet private key
    },
  },
};
