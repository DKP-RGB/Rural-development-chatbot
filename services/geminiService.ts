import type { GenerateContentResponse } from "@google/genai";

// Mock response to simulate Gemini API
const mockResponse: GenerateContentResponse = {
  text: `<p>Thank you for your question! While I am currently running in offline mode without a connection to the live Gemini API, I can tell you that USDA Rural Development offers a wide range of programs.</p>
         <p>For specific details, please visit the official USDA RD website or connect this application to the Gemini API.</p>
         <ul>
            <li>Housing Assistance</li>
            <li>Business & Industry Loans</li>
            <li>Community Facilities Grants</li>
         </ul>`,
  candidates: [],
  promptFeedback: undefined,
  usageMetadata: undefined,
  functionCalls: [],
};


// Simulate a network delay for a more realistic feel
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


export async function* sendMessageStream(
  message: string
): AsyncGenerator<GenerateContentResponse> {
  console.log("Using mock service. Message received:", message);
  
  // Simulate a streaming effect by sending the response in chunks
  const responseText = mockResponse.text;
  const chunkSize = 50;

  try {
    for (let i = 0; i < responseText.length; i += chunkSize) {
        const chunkContent = responseText.substring(i, i + chunkSize);
        await delay(50); // small delay between chunks
        
        // We only need to yield the text part for the mock.
        yield { text: chunkContent } as GenerateContentResponse;
    }
  } catch (error) {
    console.error("An error occurred in the mock service:", error);
    yield { text: "<p>Sorry, an unexpected error occurred in the mock service.</p>" } as GenerateContentResponse;
  }
}