import { BrowserProvider, Contract, parseEther } from "ethers";
import FreelanceAbi from "./FreelanceEscrow.json";

const contractAddress = "0xE2917b9fcBaBbC0e27335eAB7ad226bdd840960d";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner(); // ✅ Await this!
  return new Contract(contractAddress, FreelanceAbi.abi, signer);
};

export const fundContract = async (amountInEth: string) => {
  const contract = await getContract();
  const tx = await contract.fundContract({ value: parseEther(amountInEth) });
  await tx.wait();
};

export const releasePayment = async () => {
  const contract = await getContract();
  const tx = await contract.releasePayment();
  await tx.wait();
};
