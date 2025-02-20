import { useState } from 'react';

interface UseNgrokApiKeyProps {
  onSuccess: (apiKey: string) => void;
}

const useNgrokApiKey = ({ onSuccess }: UseNgrokApiKeyProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
       const contentType = response.headers.get('content-type');
       if (contentType && contentType.includes('application/json')) {
         const { error } = await response.json();
         throw new Error(error || 'Invalid API Key');
       } else {
         throw new Error('Unexpected response format');
       }
     }
     onSuccess(apiKey);
   } catch (err) {
     const errorMessage = (err instanceof Error) ? err.message : 'Failed to validate API Key.';
     console.error('API Key validation failed:', err);
     setError(errorMessage);
   } finally {
     setLoading(false);
   }
  };

  return { validateApiKey, loading, error };
};

export default useNgrokApiKey;