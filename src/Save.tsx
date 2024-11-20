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
    retrievalCount: 0,
    expiryDate: 0,
  });

  const [hash, setHash] = useState<string | null>(null);  // New state to store the hash


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
    

    const url = 'http://127.0.0.1:5000/secret';

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

        setHash(result.Hash);


      } else {
        console.error('Error:', response.statusText);
      }

      } catch (error) {
      console.error('Network error:', error);
      }
  };


  // Copy hash to clipboard
  const copyToClipboard = () => {
    if (hash) {
      navigator.clipboard.writeText(hash).then(() => {
        alert('Hash copied to clipboard!');
      }).catch((error) => {
        console.error('Failed to copy: ', error);
      });
    }
  };


  return (
    <div className="form-container">
      <h2 className="form-title">Save Your Secret</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="secretText" className="form-label">Secret Text:</label>
          <input
            type="text"
            id="secretText"
            name="secretText"
            value={formData.secretText}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="retrievalCount" className="form-label">Number of Times It Can Be Retrieved:</label>
          <input
            type="number"
            id="retrievalCount"
            name="retrievalCount"
            value={formData.retrievalCount}
            onChange={handleChange}
            min={1}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiryDate" className="form-label">Expiry Date in minutes:</label>
          <input
            type="number"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">Save Secret</button>
      </form>

      {hash && (
        <div className="hash-container">
          <h4 className="hash-display">Your Secret Hash: {hash}</h4>
          <h5>Copy it will be visible once</h5>
          <button onClick={copyToClipboard} className="copy-button">Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
};

export default Save;
