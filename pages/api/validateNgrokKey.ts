import type { NextApiRequest, NextApiResponse } from 'next';

<<<<<<< HEAD
=======
type NgrokTunnel = {
  proto: string;
  public_url: string;
};

type NgrokResponse = {
  tunnels: NgrokTunnel[];
};

>>>>>>> e54c6302027a3a2694c8911bb31f565efd06c57e
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
<<<<<<< HEAD
      return res.status(response.status).json({ error: `Invalid Ngrok API key: ${errorText}` });
    }

    res.status(200).json({ message: 'API key is valid' });
  } catch (error) {
    console.error('Error validating Ngrok API key:', error);
    res.status(500).json({ error: 'Failed to validate Ngrok API key' });
  }
}
=======
      return res.status(response.status).json({ error: `Failed to fetch Ngrok tunnels: ${errorText}` });
    }

    const data: NgrokResponse = await response.json();
    const tcpTunnel = data.tunnels.find(tunnel => tunnel.proto === 'tcp');
    const tcpUrl = tcpTunnel ? tcpTunnel.public_url.replace('tcp://', '') : null;

    if (!tcpUrl) {
      return res.status(404).json({ error: 'No TCP tunnel found' });
    }

    res.status(200).json({ tcpUrl });
  } catch (error) {
    console.error('Error Fetching Ngrok Tunnels:', error);
    res.status(500).json({ error: 'Failed to fetch Ngrok tunnels' });
  }
}
>>>>>>> e54c6302027a3a2694c8911bb31f565efd06c57e
