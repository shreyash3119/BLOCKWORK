import React, { useEffect, useState } from "react";
import { initEthers, fundContract, releasePayment, getClientDetails, getFreelancerDetails, getContractAmount } from "../utils/contractInteraction";

const ContractPage = () => {
  const [client, setClient] = useState(null);
  const [freelancer, setFreelancer] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    initEthers()
      .then(() => {
        loadContractDetails();
      })
      .catch((error) => console.error("Error initializing contract: ", error));
  }, []);

  const loadContractDetails = async () => {
    const clientAddress = await getClientDetails();
    const freelancerAddress = await getFreelancerDetails();
    const contractAmount = await getContractAmount();

    setClient(clientAddress);
    setFreelancer(freelancerAddress);
    setAmount(contractAmount);
  };

  return (
    <div>
      <h2>Contract Details</h2>
      <p>Client Address: {client}</p>
      <p>Freelancer Address: {freelancer}</p>
      <p>Contract Amount: {amount} ETH</p>

      <button onClick={fundContract}>Fund Contract</button>
      <button onClick={releasePayment}>Release Payment</button>
    </div>
  );
};

export default ContractPage;
