import React, { useEffect, useState } from "react";
import {
  connectWallet,
  fundContract,
  releasePayment,
  getClientDetails,
  getFreelancerDetails,
  getContractAmount,
} from "../web3/freelance";

const ContractPage: React.FC = () => {
  const [client, setClient] = useState<string | null>(null);
  const [freelancer, setFreelancer] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [fundAmount, setFundAmount] = useState<string>("");

  useEffect(() => {
    connectWallet()
      .then(() => loadContractDetails())
      .catch((error) => console.error("MetaMask connection error:", error));
  }, []);

  const loadContractDetails = async () => {
    try {
      const clientAddress = await getClientDetails();
      const freelancerAddress = await getFreelancerDetails();
      const contractAmount = await getContractAmount();
      setClient(clientAddress);
      setFreelancer(freelancerAddress);
      setAmount(contractAmount);
    } catch (error) {
      console.error("Error loading contract details", error);
    }
  };

  const handleFund = async () => {
    try {
      if (!fundAmount || isNaN(parseFloat(fundAmount)) || parseFloat(fundAmount) <= 0) {
        alert("Please enter a valid amount to fund.");
        return;
      }

      await fundContract(fundAmount);
      alert("Contract funded!");
      loadContractDetails();
    } catch (error) {
      console.error("Fund error:", error);
    }
  };

  const handleRelease = async () => {
    try {
      await releasePayment();
      alert("Payment released!");
      loadContractDetails();
    } catch (error) {
      console.error("Release error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Smart Contract Details</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="font-semibold text-gray-700">Client:</p>
          <p className="text-gray-500">{client}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-gray-700">Freelancer:</p>
          <p className="text-gray-500">{freelancer}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-gray-700">Amount in Contract:</p>
          <p className="text-gray-500">{amount} ETH</p>
        </div>
      </div>

      <div className="mt-6">
        <input
          type="text"
          value={fundAmount}
          onChange={(e) => setFundAmount(e.target.value)}
          placeholder="Amount to fund (ETH)"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-4 flex justify-between gap-4">
        <button
          onClick={handleFund}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Fund Contract
        </button>
        <button
          onClick={handleRelease}
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Release Payment
        </button>
      </div>
    </div>
  );
};

export default ContractPage;
