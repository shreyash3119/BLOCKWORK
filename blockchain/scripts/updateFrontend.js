const fs = require("fs");
const path = require("path");

const FRONTEND_ABI_DIR = "..Frontend/src/web3"; // adjust to your frontend path

function updateFrontend(contractName, contractAddress) {
  const artifactPath = path.join(__dirname, `../artifacts/contracts/${contractName}.sol/${contractName}.json`);
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  const abi = artifact.abi;

  if (!fs.existsSync(FRONTEND_ABI_DIR)) {
    fs.mkdirSync(FRONTEND_ABI_DIR, { recursive: true });
  }

  fs.writeFileSync(
    `${FRONTEND_ABI_DIR}/${contractName}.json`,
    JSON.stringify({ abi, address: contractAddress }, null, 2)
  );

  console.log(`✅ ABI & address of ${contractName} copied to frontend.`);
}

module.exports = { updateFrontend };
