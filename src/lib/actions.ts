'use server';

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email') as string;
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const listId = process.env.BREVO_LIST_ID?.trim();

  if (!email) {
    return { error: 'Email is required' };
  }

  if (!apiKey || !listId) {
    console.error('Brevo API key or List ID not configured');
    return { error: 'Subscription service not configured.' };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(listId)],
        updateEnabled: true,
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('Brevo API error:', response.status, errorData);
      
      // Detailed error for debugging
      const errorMessage = errorData.message || errorData.code || `Error Code ${response.status}`;
      
      // Handle known errors
      if (errorData.code === 'duplicate_parameter' || errorMessage.toLowerCase().includes('already exists')) {
          return { success: true, message: 'Already subscribed' };
      }
      
      if (response.status === 401) {
        return { error: 'Configuration error: Invalid API key (401).' };
      }

      if (response.status === 404) {
        return { error: 'Resource not found. Check your List ID (404).' };
      }
      
      return { error: `${errorMessage} (Status: ${response.status})` };
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return { error: 'Connection error. Please check your internet or retry.' };
  }
}
