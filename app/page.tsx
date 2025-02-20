"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';
import NgrokKeyInput from '../components/NgrokKeyInput';
import { div } from 'framer-motion/client';

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
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="max-w-2xl w-full">
        <NgrokKeyInput setApiKey={setApiKey} />
        
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-Poppins">FETCH NGROK TCP</h1>
            <p className="text-gray-600 text-sm font-Poppins">Get your TCP URL ready for use</p>
          </div>
  
          <div className="flex justify-center">
            <button
              onClick={fetchTcpUrl}
              disabled={loading}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                loading 
                  ? 'bg-blue-300 hover:bg-blue-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                'Fetch TCP URL'
              )}
            </button>
          </div>
  
          {error && (
            <div className="mt-4 text-center">
              <p className="text-red-500 text-sm font-medium">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  
    {isModalOpen && tcpUrl && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">TCP URL Details</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-lg font-medium text-gray-900 break-all">{tcpUrl}</p>
          </div>
  
          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-600"
            >
              Copy
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium transition-all duration-300 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default HomePage;