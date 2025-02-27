// // import mongoose, { Schema, Document } from "mongoose";

// // export interface IJob extends Document {
// //   name: string;
// //   company: string;
// //   position: string;
// //   jobDescription: string;
// // }

// // const JobSchema: Schema = new Schema({
// //   name: { type: String, required: true },
// //   company: { type: String, required: true },
// //   position: { type: String, required: true },
// //   jobDescription: { type: String, required: true },
// // });

// // export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);

// import mongoose, { Schema, Document } from "mongoose";

// // Update the IJob interface to include the details field
// export interface IJob extends Document {
//   name: string;
//   company: string;
//   position: string;
//   jobDescription: string;
//   details?: string; // Add details as an optional field
// }

// // Update JobSchema to include the details field
// const JobSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   company: { type: String, required: true },
//   position: { type: String, required: true },
//   jobDescription: { type: String, required: true },
//   details: { type: String, required: true }, // Make details optional
// });

// export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);

import mongoose, { Schema, Document } from "mongoose";

// Update the IJob interface to include the details and embeddings fields
export interface IJob extends Document {
  name: string;
  company: string;
  position: string;
  jobDescription: string;
  details: string; // Make details a required field
  embeddings?: number[]; // Add embeddings as an optional field
}

// Update JobSchema to include the details and embeddings fields
const JobSchema: Schema = new Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  jobDescription: { type: String, required: true },
  details: { type: String, required: true }, // Make details required
  embeddings: { type: [Number], required: true }, // Store embeddings as an array of numbers
});

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
