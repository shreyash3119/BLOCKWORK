import React, { useState, ChangeEvent, FormEvent } from "react";

// Define the type for props
type FreelancerFormProps = {
  onClose: () => void;
};

const FreelancerForm: React.FC<FreelancerFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    hourlyRate: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    try {
      const response = await fetch("http://localhost:5000/api/freelancers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data saved to backend");
        onClose(); // Close form after successful submission
      } else {
        console.error("Failed to save form data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="modal">
      <h2>Freelancer Profile Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="hourlyRate"
          placeholder="Hourly Rate"
          value={formData.hourlyRate}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FreelancerForm;
