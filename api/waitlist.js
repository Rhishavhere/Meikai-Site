// This endpoint will receive form submissions and save to Google Sheets
// You'll need to deploy this as a serverless function (Vercel, Netlify, etc.)

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Your Google Sheets Web App URL (you'll get this from Apps Script)
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

    if (!GOOGLE_SHEETS_URL) {
      throw new Error('Google Sheets URL not configured');
    }

    // Send data to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
      }),
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully joined the waitlist!'
    });

  } catch (error) {
    console.error('Error saving to waitlist:', error);
    return res.status(500).json({
      error: 'Failed to join waitlist. Please try again.'
    });
  }
}
