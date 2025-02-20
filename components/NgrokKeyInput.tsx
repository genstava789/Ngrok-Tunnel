import { useState, useEffect } from 'react';

interface NgrokKeyInputProps {
  setApiKey: React.Dispatch<React.SetStateAction<string | null>>;
}

const NgrokKeyInput: React.FC<NgrokKeyInputProps> = ({ setApiKey }) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyStored, setKeyStored] = useState<boolean>(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('ngrok-api-key');
    if (storedKey) {
      setInputValue(storedKey);
      setKeyStored(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const validateApiKey = async (apiKey: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/validateNgrokKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Invalid API Key');
      }
      setApiKey(apiKey);
      localStorage.setItem('ngrok-api-key', apiKey);
      setKeyStored(true);
      alert('API Key validated and saved successfully!');
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'Failed to validate API Key.';
      console.error('API Key validation failed:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    validateApiKey(inputValue);
  };

  const handleDeleteApiKey = () => {
    localStorage.removeItem('ngrok-api-key');
    setInputValue('');
    setApiKey(null);
    setKeyStored(false);
    alert('API Key deleted successfully!');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Enter Ngrok API Key</h2>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Ngrok API Key"
          className="border p-2 rounded-lg flex-grow w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow disabled:opacity-50"
          disabled={loading || keyStored}
        />
        <div className="flex space-x-2 w-full sm:w-auto">
          <button
            onClick={handleSaveApiKey}
            className={`px-4 py-2 w-full sm:w-auto text-sm font-semibold text-white rounded-md transition-all focus:outline-none hover:shadow-lg ${
              loading || keyStored ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
            disabled={loading || keyStored}
          >
            {loading ? 'Validating...' : 'Save'}
          </button>
          {keyStored && (
            <button
              onClick={handleDeleteApiKey}
              className="px-4 py-2 w-full sm:w-auto text-sm font-semibold text-white bg-red-500 rounded-md transition-all focus:outline-none hover:bg-red-600 hover:shadow-lg"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default NgrokKeyInput;