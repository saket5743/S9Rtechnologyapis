import mongoose from "mongoose";

const developersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    yearOfExperience: {
      type: Number,
      required: true,
      default:0
    },
    title: {
      type: String,
      required: true,
    },
    developer: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Developers = mongoose.model("Developers", developersSchema);

export default Developers;
