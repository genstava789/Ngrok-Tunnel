import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ error: 'Ngrok API key is required' });
  }

  try {
    const response = await fetch('https://api.ngrok.com/tunnels', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Ngrok-Version': '2',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: `Invalid Ngrok API key: ${errorText}` });
    }

    res.status(200).json({ message: 'API key is valid' });
  } catch (error) {
    console.error('Error validating Ngrok API key:', error);
    res.status(500).json({ error: 'Failed to validate Ngrok API key' });
  }
}