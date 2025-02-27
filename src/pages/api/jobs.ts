// import type { NextApiRequest, NextApiResponse } from "next";
// import connectToDatabase from "../../lib/mongodb";
// import Job, { IJob } from "../../models/job";

// type ResponseData = IJob[] | IJob | { error: string } | { message: string };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   await connectToDatabase();

//   if (req.method === "GET") {
//     try {
//       const jobs = await Job.find({});
//       res.status(200).json(jobs);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch jobs" });
//     }
//   } else if (req.method === "POST") {
//     const { position, company, name, jobDescription } = req.body;

//     if (!position || !company || !name || !jobDescription) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     try {
//       const newJob = new Job({
//         position,
//         company,
//         name,
//         jobDescription,
//       });

//       await newJob.save();

//       res.status(201).json(newJob);
//       // res.status(201).json({ message: "Job created successfully!" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to create job" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

// import type { NextApiRequest, NextApiResponse } from "next";
// import connectToDatabase from "../../lib/mongodb";
// import Job, { IJob } from "../../models/job";
// import OpenAI from "openai";

// // Initialize OpenAI client
// const client = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });

// const generateJobDetails = async (
//   position: string
// ): Promise<string | undefined> => {
//   try {
//     const response = await client.chat.completions.create({
//       model: "gpt-4", // Ensure you have access to this model
//       messages: [
//         {
//           role: "user",
//           content: `Generate detailed interview data for the position: ${position}`,
//         },
//       ],
//     });
//     return response.choices[0].message.content || undefined;
//   } catch (error) {
//     console.error("Error fetching data from OpenAI:", error);
//     return undefined; // Handle the error gracefully and return undefined
//   }
// };

// type ResponseData =
//   | IJob[]
//   | IJob
//   | { error: string }
//   | { message: string; details: string };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   await connectToDatabase();

//   if (req.method === "GET") {
//     try {
//       const jobs = await Job.find({});
//       res.status(200).json(jobs);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch jobs" });
//     }
//   } else if (req.method === "POST") {
//     const { position, company, name, jobDescription } = req.body;

//     if (!position || !company || !name || !jobDescription) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     try {
//       // Generate additional job details with OpenAI
//       const generatedDetails = await generateJobDetails(position);

//       // Create new job with generated details
//       const newJob = new Job({
//         position,
//         company,
//         name,
//         jobDescription,
//         details: generatedDetails || "", // Ensure details is not undefined
//       });

//       await newJob.save();

//       res.status(201).json(newJob);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to create job" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

// import type { NextApiRequest, NextApiResponse } from "next";
// import connectToDatabase from "../../lib/mongodb";
// import Job, { IJob } from "../../models/job";
// import OpenAI from "openai";

// // Initialize OpenAI client
// const client = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });

// const generateJobDetails = async (
//   position: string
// ): Promise<string | undefined> => {
//   try {
//     const response = await client.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "user",
//           content: `Generate detailed interview data for the position: ${position}`,
//         },
//       ],
//     });
//     return response.choices[0].message.content || undefined;
//   } catch (error) {
//     console.error("Error fetching data from OpenAI:", error);
//     return undefined;
//   }
// };

// // Function to generate embeddings for the job description to find relevant AI responses
// const generateEmbeddings = async (
//   text: string
// ): Promise<number[] | undefined> => {
//   try {
//     const response = await client.embeddings.create({
//       model: "text-embedding-ada-002",
//       input: text,
//     });
//     return response.data[0].embedding;
//   } catch (error) {
//     console.error("Error generating embeddings:", error);
//     return undefined;
//   }
// };

// type ResponseData =
//   | IJob[]
//   | IJob
//   | { error: string }
//   | { message: string; details: string };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   await connectToDatabase();

//   if (req.method === "GET") {
//     try {
//       const jobs = await Job.find({});
//       res.status(200).json(jobs);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch jobs" });
//     }
//   } else if (req.method === "POST") {
//     const { position, company, name, jobDescription } = req.body;

//     if (!position || !company || !name || !jobDescription) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     try {
//       // Generate additional job details with GPT-4
//       const generatedDetails = await generateJobDetails(position);

//       // Generate embeddings for job description
//       const embeddings = await generateEmbeddings(jobDescription);

//       // Create new job with generated details and embeddings
//       const newJob = new Job({
//         position,
//         company,
//         name,
//         jobDescription,
//         details: generatedDetails || "",
//         embeddings: embeddings || [], // Add embeddings as an array
//       });

//       console.log("newJob", newJob);

//       await newJob.save();

//       res.status(201).json(newJob);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to create job" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/mongodb";
import Job, { IJob } from "../../models/job";
import OpenAI from "openai";

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const generateJobDetails = async (position: string): Promise<string> => {
  // Return a string instead of string | undefined
  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo", // Use a model you have access to
      messages: [
        {
          role: "user",
          content: `Generate detailed interview data for the position: ${position}`,
        },
      ],
    });

    const generatedContent = response.choices[0].message?.content;
    if (generatedContent) {
      return generatedContent;
    } else {
      throw new Error("No content generated");
    }
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    return "Default job details"; // Return some default details in case of an error
  }
};

type ResponseData =
  | IJob[]
  | IJob
  | { error: string }
  | { message: string; details: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const jobs = await Job.find({});
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  } else if (req.method === "POST") {
    const { position, company, name, jobDescription } = req.body;

    if (!position || !company || !name || !jobDescription) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Generate additional job details with OpenAI
      const generatedDetails = await generateJobDetails(position);

      // Create new job with generated details
      const newJob = new Job({
        position,
        company,
        name,
        jobDescription,
        details: generatedDetails, // Ensure details is properly assigned
      });

      await newJob.save();

      res.status(201).json(newJob);
    } catch (error) {
      res.status(500).json({ error: "Failed to create job" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
