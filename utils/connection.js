//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose";
// const shortid = require("shortid");

// CONNECTING TO MONGOOSE (Get Database Url from .env)
// const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_URL = `mongodb://127.0.0.1:27017/vawlence`;

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL)
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");

  // COMRADE SCHEMA
  const ComradeSchema = new mongoose.Schema({
    tag: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    gpa: {
      type: Number,
      default: Math.round((Math.random() * 4 + 2) * 100) / 100,
      required: false,
    },
    certificate: {
      type: String,
      required: false,
    },
    date: {
      type: Number,
      default: Date.now(),
      required: false,
    },
  });

  const Comrade =
    mongoose.models.Comrade || mongoose.model("Comrade", ComradeSchema);

  return { conn, Comrade };
};
