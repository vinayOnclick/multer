import * as mongoose from "mongoose";
import { model } from "mongoose";

const registerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  images:{
    type:Object,
    required:true
    }
});

export default model("user", registerSchema)