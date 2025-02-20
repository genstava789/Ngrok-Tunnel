"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';
import NgrokKeyInput from '../components/NgrokKeyInput';

const HomePage = () => {
  const [tcpUrl, setTcpUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const fetchTcpUrl = async () => {
    if (!apiKey) {
      setError('Please enter your Ngrok API Key first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ngrok', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();
      if (response.ok) {
        setTcpUrl(data.tcpUrl);
        setIsModalOpen(true);
      } else {
        setError(data.error || 'Unknown error occurred');
      }
    } catch (err) {
      console.error('Failed to fetch TCP URL:', err);
      setError('Failed to fetch TCP URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (tcpUrl) {
      navigator.clipboard.writeText(tcpUrl);
      alert('TCP URL copied to clipboard!');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-roboto">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <NgrokKeyInput setApiKey={setApiKey} />
        <div className="bg-white shadow-lg rounded-lg p-8 text-center mx-auto max-w-md mt-4">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">FETCH NGROK TCP</h1>
          <button
            onClick={fetchTcpUrl}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Loading...' : 'Fetch TCP URL'}
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
        {isModalOpen && tcpUrl && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-4xl shadow-2xl p-6 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">TCP URL Details</h2>
              <p className="text-lg mb-6">{tcpUrl}</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-primary-500 text-white rounded border border-primary-500 transition-all hover:bg-primary-600"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-primary-400 text-white rounded border border-primary-400 transition-all hover:bg-primary-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;