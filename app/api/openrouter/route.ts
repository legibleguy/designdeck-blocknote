export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    console.log('Received request body:', body);

    const { tag } = body;

    if (!tag || !tag.title) {
      console.error('Invalid request body:', body);
      return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
    }

    const descriptionPart = tag.description ? `Description: ${tag.description}` : "No description provided.";

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          {
            role: 'user',
            content: `Brainstorm ideas for the game mechanic titled "${tag.title}". ${descriptionPart}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from OpenRouter API');
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};