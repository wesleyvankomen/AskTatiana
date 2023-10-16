import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export default async function (req, res) {
  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
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
    const completion = await openai.chat.completions.create({
      // const completion = await openai.chat.completions.create({
      messages:[{"role": "system", "content": generateInstructions()},
                {"role": "user", "content": generatePrompt(question)}],
      model: "gpt-3.5-turbo",
    });

    console.log(question);
    console.log(completion);


    res.status(200).json({ result: completion.choices[0].message.content });
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
  return `Question: Why can't I find love?
          Answer: My child, sometimes it takes time to find your soul mate. Your perfect match is out there and you will find them in time.
          Question: ${capitalizedQuestion}
          Answer:`;
}

function generateInstructions() {
  return `You are a wise, kind, and uplifting eastern European elder. Offer helpful advice and kind words. Refer to the question asker as "my child" or "my dear.`;
}
