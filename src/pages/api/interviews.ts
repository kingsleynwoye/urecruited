import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Define the static preparation data
const prepData = {
  languages: ["C", "C++", "JavaScript"],
  developments: ["Full-stack development", "Frontend development"],
  computings: ["Cloud computing"],
  managements: ["SQL", "NoSQL"],
  engineerings: ["Data pipelines", "Data analysis"],
  operations: ["Monitoring", "Incident response"],
};

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

async function generateChatCompletion(message: string) {
  return await client.chat.completions.create({
    model: "gpt-4", // Use the model you want to use
    messages: [{ role: "user", content: message }],
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure the request body contains jobPosition
  if (!req.body?.jobPosition) {
    return res.status(400).json({ error: "Job description is required" });
  }

  const { jobPosition } = req.body;

  try {
    // Use static data instead of querying OpenAI
    // Optionally, you can still use OpenAI for more dynamic data
    // const response = await generateChatCompletion(
    //   `Generate interview preparation content for the following job: ${jobPosition}`
    // );

    // Extract the response content
    // const openAIData = response.choices[0].message.content;

    // Send the preparation data as JSON response
    res.status(200).json({ preparationData: prepData });
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    res.status(500).json({ error: "Failed to fetch data from OpenAI" });
  }
}
