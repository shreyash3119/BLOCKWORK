import React, { useState } from "react";
import FreelancerForm from "../components/FreelancerForm"; // Adjust the import path as necessary

const ParentComponent: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <h1>Welcome to the Freelancer Portal</h1>
      <button onClick={handleOpenForm}>Open Freelancer Form</button>

      {isFormOpen && <FreelancerForm onClose={handleCloseForm} />}
    </div>
  );
};

export default ParentComponent;