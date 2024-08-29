import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/mongodb";
import Job, { IJob } from "../../models/job";

type ResponseData = IJob[] | IJob | { error: string } | { message: string };

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
      const newJob = new Job({
        position,
        company,
        name,
        jobDescription,
      });

      await newJob.save();

      res.status(201).json(newJob);
      // res.status(201).json({ message: "Job created successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create job" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
