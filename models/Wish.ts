import mongoose, { Schema, Document } from "mongoose";

export interface IWish extends Document {
  name: string;
  message: string;
  color: string;
  likes: number;
  createdAt: Date;
}

const WishSchema = new Schema<IWish>(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    color: { type: String, default: "#f5f5f5" },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Wish || mongoose.model<IWish>("Wish", WishSchema);
