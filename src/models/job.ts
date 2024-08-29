import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  name: string;
  company: string;
  position: string;
  jobDescription: string;
}

const JobSchema: Schema = new Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  jobDescription: { type: String, required: true },
});

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
