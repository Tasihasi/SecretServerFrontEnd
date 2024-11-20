import React, { useState } from 'react';

interface SaveFormData {
  secretText: string;
  retrievalCount: number;
  expiryDate: string;
}

const Save: React.FC = () => {
  // State to store the form data
  const [formData, setFormData] = useState<SaveFormData>({
    secretText: '',
    retrievalCount: 1,
    expiryDate: '',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Example: Show data in the console, you can modify this to submit data to the backend
    console.log('Form Submitted:', formData);
    // Add logic to submit the form data to the server here
  };

  return (
    <div>
      <h2>Save Your Secret</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="secretText">Secret Text:</label>
          <input
            type="text"
            id="secretText"
            name="secretText"
            value={formData.secretText}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="retrievalCount">Number of Times It Can Be Retrieved:</label>
          <input
            type="number"
            id="retrievalCount"
            name="retrievalCount"
            value={formData.retrievalCount}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        <div>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Save Secret</button>
      </form>
    </div>
  );
};

export default Save;
