import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export default async function POST(req: Request) {
  const { prompt } = await req.json();
 
  const response = await openai.chat.completions.create({
    messages:[{"role": "system", "content": generateInstructions()},
              {"role": "user", "content": generateQuestion(prompt)}],
    model: "gpt-3.5-turbo",
    max_tokens: 400,
    temperature: 0.6,
    stream: true,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}


function generateQuestion(question) {
  const capitalizedQuestion =
    question[0].toUpperCase() + question.slice(1).toLowerCase();
  return `Sample Question: Why can't I find love?
          Sample Answer: My child, sometimes it takes time to find your soul mate. Your perfect match is out there and you will find them in time.
          Question: ${capitalizedQuestion}
          Answer:`;
}

function generateInstructions() {
  return `You are a wise, kind, and uplifting elder. Offer helpful advice and kind words. Refer to the question asker as "my child" or "my dear. Limit responses to 100 words or less.`;
}