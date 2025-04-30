import { BrowserProvider, Contract, parseEther, formatEther } from "ethers";
import FreelanceAbi from "./FreelanceEscrow.json";

const contractAddress = "0x313Fd08403296185cF18B2970a836409Ca3C29B2";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const getProviderAndContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new Contract(contractAddress, FreelanceAbi.abi, signer);
  return contract;
};

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("Install MetaMask");
  await window.ethereum.request({ method: "eth_requestAccounts" });
};

export const getClientDetails = async (): Promise<string> => {
  const contract = await getProviderAndContract();
  return await contract.client();
};

export const getFreelancerDetails = async (): Promise<string> => {
  const contract = await getProviderAndContract();
  return await contract.freelancer();
};

export const getContractAmount = async (): Promise<string> => {
  const contract = await getProviderAndContract();
  const amount = await contract.amount();
  return formatEther(amount); // Convert to ETH
};

export const fundContract = async (amountInEth: string) => {
  const contract = await getProviderAndContract();
  const tx = await contract.fundContract({ value: parseEther(amountInEth) });
  await tx.wait();
};

export const releasePayment = async () => {
  const contract = await getProviderAndContract();
  try {
    const tx = await contract.releasePayment();
    console.log("Transaction sent: ", tx);
    const receipt = await tx.wait(); // Wait for the transaction to be mined
    console.log("Transaction mined: ", receipt);
    alert("Payment released!");
  } catch (error) {
    console.error("Error releasing payment: ", error);
  }
};
