//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env)
// const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_URL = `mongodb://localhost:27017/vawlence`;


// connection function
export const connect = async () => {

  const conn = await mongoose
    .connect(DATABASE_URL)
    .catch((err) => console.log(err))
  console.log("Mongoose Connection Established")

  // COMRADE SCHEMA
  const ComradeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    degree: {
        type: String,
        required: true,
      },
      gpa: {
        type: Number,
        default: Math.random() * 4 + 2,
        required: false,
      },
    date: {
      type: Number,
      default: Date.now(),
      required: false,
    },
    
  })

  // ComradeSchema.pre(
  //   'save',
  //   async function(next) {
  //     const user = this;
  //     const hash = await bcrypt.hash(this.password, 10);
  
  //     this.password = hash;
  //     next();
  //   }
  // );

  const Comrade = mongoose.models.Comrade || mongoose.model("Comrade", ComradeSchema)

  return { conn, Comrade }
}