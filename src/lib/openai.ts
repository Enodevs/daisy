import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeAudio(audioFile: File): Promise<string> {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "en",
    });
    
    return transcription.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
}

export async function generateSummary(transcription: string): Promise<{
  summary: string;
  keyPoints: string[];
  decisions: string[];
  actionItems: Array<{
    title: string;
    description?: string;
    assignee?: string;
    dueDate?: string;
  }>;
}> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that analyzes meeting transcriptions. Extract:
1. A concise summary (2-3 paragraphs)
2. Key points discussed (bullet points)
3. Decisions made (bullet points)
4. Action items with assignees and due dates when mentioned

Return the response as JSON with the following structure:
{
  "summary": "string",
  "keyPoints": ["string"],
  "decisions": ["string"],
  "actionItems": [
    {
      "title": "string",
      "description": "string (optional)",
      "assignee": "string (optional)",
      "dueDate": "string (optional, ISO format)"
    }
  ]
}`
        },
        {
          role: "user",
          content: `Please analyze this meeting transcription:\n\n${transcription}`
        }
      ],
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Summary generation error:', error);
    throw new Error('Failed to generate summary');
  }
}