const Retell = require('retell-sdk');

/**
 * Netlify serverless function to create a Retell web call.
 *
 * This function reads your Retell API key and agent ID from environment
 * variables (RETELL_API_KEY and RETELL_AGENT_ID). It then uses the
 * retell-sdk to create a new web call and returns the access token needed
 * by the frontend to start the call. Do not expose your API key in
 * client-side code; keep it securely in environment variables on Netlify.
 */
exports.handler = async function (event, context) {
  const apiKey = process.env.RETELL_API_KEY;
  const agentId = process.env.RETELL_AGENT_ID;
  if (!apiKey || !agentId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Retell API credentials.' }),
    };
  }
  try {
    const client = new Retell({ apiKey });
    const response = await client.call.createWebCall({ agent_id: agentId });
    return {
      statusCode: 200,
      body: JSON.stringify({ access_token: response.access_token }),
    };
  } catch (error) {
    console.error('Error creating web call:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create web call' }),
    };
  }
};
