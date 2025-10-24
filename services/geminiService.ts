import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chat: Chat | null = null;

function getChatInstance(): Chat {
  if (!chat) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are the 'RD Assistant', a helpful AI expert for the USDA Rural Development (RD) program. Your goal is to provide clear, complete, and direct answers within this chat.

- **Provide Full Summaries:** When asked about USDA RD programs, eligibility, or application processes, you MUST summarize the information from official sources and present it directly. Do not just provide links.
- **Format for Readability:** Use simple HTML for formatting. Wrap paragraphs in \`<p>\` tags. Use \`<strong>\` for bold text, and \`<ul>\` with \`<li>\` for bulleted lists. Do not use any other HTML tags.
- **No Code or Technical Jargon:** Your responses should be in plain English. Do not include any code, JSON, or complex HTML structures in your final answer.
- **Stay On Topic:** Only answer questions about USDA Rural Development.
- **Use Official Information:** Base your answers on data from the official USDA RD website (rd.usda.gov) and its subpages.`,
        tools: [{ googleSearch: {} }],
      },
    });
  }
  return chat;
}

export async function* sendMessageStream(
  message: string
): AsyncGenerator<GenerateContentResponse> {
  try {
    const chatInstance = getChatInstance();
    const result = await chatInstance.sendMessageStream({ message });

    for await (const chunk of result) {
      yield chunk;
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw new Error("Failed to get a response from the assistant. Please try again.");
  }
}