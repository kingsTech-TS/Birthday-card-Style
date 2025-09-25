import mongoose, { Schema, model, models } from "mongoose"

const SlideSchema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
)

export const Slide = models.Slide || model("Slide", SlideSchema)
