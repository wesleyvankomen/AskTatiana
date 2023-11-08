import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from 'ai';
// const limiter = require("../middlewares/limiter");

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
const env = process.env.NODE_ENV

// app.use(limiter);




// export const runtime = 'edge';
 
// export async function POST(req: Request) {
//   const { prompt } = await req.json();
 
//   // Ask OpenAI for a streaming completion given the prompt
//   const response = await openai.completions.create({
//     model: 'text-davinci-003',
//     stream: true,
//     temperature: 0.6,
//     max_tokens: 300,
//     prompt: `Create three slogans for a business with unique features.
 
// Business: Bookstore with cats
// Slogans: "Purr-fect Pages", "Books and Whiskers", "Novels and Nuzzles"
// Business: Gym with rock climbing
// Slogans: "Peak Performance", "Reach New Heights", "Climb Your Way Fit"
// Business: ${prompt}
// Slogans:`,
//   });
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }





export default async function (req, res) {
  const { prompt } = await req.json();
  
  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      }
    });
    return;
  }

  const question = req.body.question || '';
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      }
    });
    return;
  }

  try {
    const completion = await openai.completions.create({
      // const completion = await openai.chat.completions.create({
      messages:[{"role": "system", "content": generateInstructions()},
                {"role": "user", "content": generatePrompt(question)}],
      model: "gpt-3.5-turbo",
      stream: true,
    });

    if(env == "development"){
      console.log(question);
      console.log(completion);
    }

    const stream = OpenAIStream(response);
  // Respond with the stream
    return new StreamingTextResponse(stream);

    //res.status(200).json({ result: completion.choices[0].message.content });
    
    //testing dev return
    //res.status(200).json({ result: "success!" });

  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(question) {
  const capitalizedQuestion =
    question[0].toUpperCase() + question.slice(1).toLowerCase();
  return `Sample Question: Why can't I find love?
          Sample Answer: My child, sometimes it takes time to find your soul mate. Your perfect match is out there and you will find them in time.
          Question: ${capitalizedQuestion}
          Answer:`;
// return `Question: ${capitalizedQuestion} Answer: `
}

function generateInstructions() {
  return `You are a wise, kind, and uplifting elder. Offer helpful advice and kind words. Refer to the question asker as "my child" or "my dear. Limit responses to 200 words or less`;
}
