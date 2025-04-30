// SPDX-License-Identifier: MIT
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // 🔹 Replace this with your actual freelancer wallet address or ENS
  let freelancerWalletAddress = "0x650E53A25e4D947334a84BA8ba78B2ce97f03504";

  // 🔸 Resolve ENS name if necessary
  if (freelancerWalletAddress.endsWith(".eth")) {
    console.log(`Resolving ENS name: ${freelancerWalletAddress}`);
    freelancerWalletAddress = await ethers.provider.resolveName(freelancerWalletAddress);

    if (!freelancerWalletAddress) {
      throw new Error("❌ Failed to resolve ENS name.");
    }
  } else if (!ethers.utils.isAddress(freelancerWalletAddress)) {
    throw new Error("❌ Invalid Ethereum address.");
  }

  console.log(`✅ Freelancer address resolved: ${freelancerWalletAddress}`);

  // 🔹 Deploy contract
  const ContractFactory = await ethers.getContractFactory("FreelanceEscrow");
  const contract = await ContractFactory.deploy(freelancerWalletAddress);

  console.log("📦 Deploying contract...");
  await contract.deployed();

  console.log(`✅ Contract deployed at: ${contract.address}`);

  // 🔸 Save contract address to file for frontend
  fs.writeFileSync("deployedAddress.txt", contract.address);
  console.log("📝 Contract address written to deployedAddress.txt");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Deployment failed:", err);
    process.exit(1);
  });
