export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    console.log('Received request body:', body);

    const { tag, documentContent } = body;

    if (!tag || !tag.title || !documentContent) {
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
        model: 'google/gemini-2.5-pro-exp-03-25:free',
        messages: [
          {
            role: 'user', 
            content: `Integrate the following game mechanic into the existing game design document. Return the response as HTML but never include "\`\`\`html" and "\`\`\`" at the beginning and end of your response. Your response should be just the output document and no additional text like "Okay, here is...". You shouldn't replace the content of the existing document but rather add an idea - unless the specified mechanic is already discussed in the document. In that case you are allowed to modify paragraphs. Maintain the original tone, format, and style of the text
.\n\nGame Mechanic Title: ${tag.title}\n${descriptionPart}\n\nExisting Document Content:\n${documentContent}\n\nPlease return the response in Markdown format.`,
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