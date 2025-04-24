// Import the necessary dependencies
const { ethers, upgrades } = require("hardhat");

async function main() {
  // Assign a valid Ethereum address or ENS name to freelancerWalletAddress
  // Replace with an actual Ethereum address or ENS name (e.g., "freelancer.eth")
  let freelancerWalletAddress = "0x1234567890abcdef1234567890abcdef12345678"; // Example Ethereum address
  // OR
  // let freelancerWalletAddress = "freelancer.eth"; // Example ENS name

  // Check if the provided address is an ENS name or Ethereum address.
  if (freelancerWalletAddress.endsWith(".eth")) {
    // If it's an ENS name, resolve it to an Ethereum address
    console.log(`Resolving ENS name: ${freelancerWalletAddress}`);
    freelancerWalletAddress = await ethers.provider.resolveName(freelancerWalletAddress);
    
    if (!freelancerWalletAddress) {
      console.error(`Failed to resolve ENS name: ${freelancerWalletAddress}`);
      return;
    }
  } else {
    // Ensure it's a valid Ethereum address
    if (!ethers.utils.isAddress(freelancerWalletAddress)) {
      console.error(`Invalid Ethereum address: ${freelancerWalletAddress}`);
      return;
    }
  }

  console.log(`Freelancer Wallet Address: ${freelancerWalletAddress}`);

  // Get the contract factory for your contract
  const Contract = await ethers.getContractFactory("FreelanceEscrow"); // Replace with your contract name

  // Deploy the contract (example deployment)
  const contract = await Contract.deploy(freelancerWalletAddress); // Pass the wallet address as a constructor parameter

  // Wait for the transaction to be mined
  await contract.deployed();

  console.log(`Contract deployed to: ${contract.address}`);

  // Optionally, verify the contract (if using an upgradeable contract)
  // If using OpenZeppelin upgrades
  // const contract = await upgrades.deployProxy(Contract, [constructorArgs], { initializer: 'initialize' });

  // You can also interact with the deployed contract here if needed
  // Example: Call a function on the contract after deployment
  // const result = await contract.someFunction();
  // console.log('Function result:', result);
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
