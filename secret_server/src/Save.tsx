import React, { useState } from 'react';

interface SaveFormData {
  secretText: string;
  retrievalCount: number;
  expiryDate: number;
}

const Save: React.FC = () => {
  // State to store the form data
  const [formData, setFormData] = useState<SaveFormData>({
    secretText: '',
    retrievalCount: 1,
    expiryDate: 0,
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Example: Show data in the console, you can modify this to submit data to the backend
    console.log('Form Submitted:', formData);
    // Add logic to submit the form data to the server here
    

    const url = 'http://127.0.0.1:5000/secret/';

    try {
      // Make a POST request to the server
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful

      if (response.ok) {
        const result = await response.json();
        console.log('Response from server:', result);

      } else {
        console.error('Error:', response.statusText);
      }

      } catch (error) {
      console.error('Network error:', error);
      }
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
          <label htmlFor="expiryDate">Expiry Date in minutes:</label>
          <input
            type="number"
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
