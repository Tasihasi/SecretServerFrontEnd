import  {useState} from 'react';
import './App.css';
import Save from  './Save';
import Retrive from './Retrive';

function App() {
  // State to track which form is currently visible
  const [isSaveForm, setIsSaveForm] = useState(true);

  // Toggle function to switch between forms
  const toggleForm = () => {
    setIsSaveForm(!isSaveForm);
  };

  return (
    <div>
      {/* Button to toggle between forms */}
      <button onClick={toggleForm}>
        {isSaveForm ? 'Switch to Retrieve' : 'Switch to Save'}
      </button>

      {/* Conditional rendering based on the state */}
      {isSaveForm ? (
        <div>
          <Save />
        </div>
      ) : (
        <div>
          <Retrive />
        </div>
      )}
    </div>
  );
}

export default App
