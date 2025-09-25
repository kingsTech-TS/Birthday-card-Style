import mongoose, { Schema, Document, models } from "mongoose";

export interface ISlide extends Document {
  image: string;
  title: string;
  description: string;
}

const SlideSchema = new Schema<ISlide>(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Slide || mongoose.model<ISlide>("Slide", SlideSchema);
