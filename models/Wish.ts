
import mongoose, { Schema, models } from "mongoose";

const WishSchema = new Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    color: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Wish = models.Wish || mongoose.model("Wish", WishSchema);
