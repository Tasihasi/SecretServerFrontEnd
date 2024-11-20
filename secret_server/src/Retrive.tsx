import React, { useState } from 'react';

const Retrieve: React.FC = () => {
  // State to store the hash input and the retrieved secret or error message
  const [hash, setHash] = useState<string>('');
  const [secret, setSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle input change for hash
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHash(e.target.value);
  };

  // Handle form submission to fetch the secret by hash
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reset previous error and secret
    setSecret(null);
    setError(null);

    try {
      // Send the hash to the backend to fetch the secret
      const response = await fetch(`http://127.0.0.1:5000/secret/${hash}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setSecret(data.secret);  // Assuming the server returns { secret: string }
      } else {
        setError('Secret not found for the given hash!');
      }
    } catch (err) {
      setError('An error occurred while retrieving the secret!');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Retrieve Your Secret</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="hash">Enter Hash:</label>
          <input
            type="text"
            id="hash"
            name="hash"
            value={hash}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Retrieve Secret</button>
      </form>

      {secret && (
        <div>
          <h3>Your Secret:</h3>
          <p>{secret}</p>
        </div>
      )}

      {error && (
        <div>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Retrieve;
