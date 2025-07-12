import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: process.env.GEMINI_API_KEY ? "https://generativelanguage.googleapis.com/v1beta/openai" : undefined
});

export async function transcribeAudio(audioFile: File): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY) {
      throw new Error('No API key configured. Please set GEMINI_API_KEY or OPENAI_API_KEY in your environment variables.');
    }

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "en",
    });

    return transcription.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio. Please check your API configuration and try again.');
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
    if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY) {
      throw new Error('No API key configured. Please set GEMINI_API_KEY or OPENAI_API_KEY in your environment variables.');
    }

    const completion = await openai.chat.completions.create({
      model: process.env.GEMINI_API_KEY ? "gemma-3-4b-it" : "gpt-3.5-turbo",
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
      throw new Error('No response from Google Gemini');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Summary generation error:', error);
    throw new Error('Failed to generate summary. Please check your API configuration and try again.');
  }
}

export async function processChat(userMessage: string) {
  try {
    if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY) {
      return "I'm not properly configured yet. Please set up your API keys (GEMINI_API_KEY or OPENAI_API_KEY) in your environment variables to enable AI responses.";
    }

    const completion = await openai.chat.completions.create({
      model: process.env.GEMINI_API_KEY ? "gemma-3-4b-it" : "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are Daisy, a friendly AI meeting assistant. You help users with:
          
          - Transcribing meeting audio files
          - Generating meeting summaries and action items
          - Extracting key decisions and insights
          - Integrating with tools like Google Calendar, Slack, Notion
          - Scheduling and managing meetings
          - Answering questions about meeting productivity
          
          Always be helpful, concise, and professional. Use emojis sparingly but appropriately. 
          If users ask about capabilities you don't have, politely redirect them to what you can help with.`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from Google Gemini');
    }

    return content;
  } catch (error) {
    console.error('Chat processing error:', error);
    return "I'm having trouble processing your request right now. This might be due to API configuration issues. Please check that your API keys are set up correctly.";
  }
}